import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { z } from "zod";
import { put } from "@vercel/blob";
import { promises as fs } from "fs";
import path from "path";

const formSchema = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  contact: z.string().min(5),
  email_id: z.string().email(),
});

export async function GET() {
  const schools = await prisma.school.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(schools);
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const values = Object.fromEntries(formData.entries());

    const parsed = formSchema.safeParse(values);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const file = formData.get("image") as File | null;
    if (!file) return NextResponse.json({ error: "Image is required" }, { status: 400 });
    let imageUrl = "";
    try {
      if (process.env.BLOB_READ_WRITE_TOKEN) {
        const blobName = `schools/${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
        const { url } = await put(blobName, file, { access: "public" });
        imageUrl = url;
      } else if (process.env.VERCEL) {
        return NextResponse.json({ error: "Uploads require BLOB_READ_WRITE_TOKEN on Vercel" }, { status: 500 });
      } else {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const uploadsDir = path.join(process.cwd(), "public", "schoolImages");
        await fs.mkdir(uploadsDir, { recursive: true });
        const fileName = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
        const filePath = path.join(uploadsDir, fileName);
        await fs.writeFile(filePath, buffer);
        imageUrl = `/schoolImages/${fileName}`;
      }
    } catch (e) {
      console.error("Image upload failed", e);
      return NextResponse.json({ error: "Image upload failed" }, { status: 500 });
    }

    const created = await prisma.school.create({
      data: {
        name: parsed.data.name,
        address: parsed.data.address,
        city: parsed.data.city,
        state: parsed.data.state,
        contact: parsed.data.contact,
        email_id: parsed.data.email_id,
        image: imageUrl,
      },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (e) {
    console.error("POST /api/schools failed", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


