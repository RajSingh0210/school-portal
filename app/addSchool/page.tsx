"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const schema = z.object({
  name: z.string().min(1, "Required"),
  address: z.string().min(1, "Required"),
  city: z.string().min(1, "Required"),
  state: z.string().min(1, "Required"),
  contact: z.string().min(5, "Required"),
  email_id: z.string().email("Invalid email"),
  image: z.any(),
});

type FormValues = z.infer<typeof schema>;

export default function AddSchoolPage() {
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    const formData = new FormData();
    for (const key of ["name","address","city","state","contact","email_id"]) {
      formData.append(key, (values as any)[key]);
    }
    const fileList = (values as any).image as FileList;
    if (fileList && fileList[0]) formData.append("image", fileList[0]);

    setSubmitting(true);
    try {
      const res = await fetch("/api/schools", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Failed");
      reset();
      alert("School added successfully");
    } catch (e) {
      alert("Error adding school");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section">
      <h1 style={{ marginBottom: 12 }}>Add School</h1>
      <form className="form" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <input className="input" placeholder="Name" {...register("name")} />
        {errors.name && <span className="error">{errors.name.message}</span>}

        <input className="input" placeholder="Address" {...register("address")} />
        {errors.address && <span className="error">{errors.address.message}</span>}

        <div className="row">
          <div>
            <input className="input" placeholder="City" {...register("city")} />
            {errors.city && <span className="error">{errors.city.message}</span>}
          </div>
          <div>
            <input className="input" placeholder="State" {...register("state")} />
            {errors.state && <span className="error">{errors.state.message}</span>}
          </div>
        </div>

        <div className="row">
          <div>
            <input className="input" placeholder="Contact" {...register("contact")} />
            {errors.contact && <span className="error">{errors.contact.message}</span>}
          </div>
          <div>
            <input className="input" placeholder="Email" {...register("email_id")} />
            {errors.email_id && <span className="error">{errors.email_id.message}</span>}
          </div>
        </div>

        <input className="file" type="file" accept="image/*" {...register("image")} />
        {errors.image && <span className="error">Image is required</span>}

        <button className="btn" disabled={submitting} type="submit">{submitting ? "Submitting..." : "Submit"}</button>
      </form>
    </section>
  );
}


