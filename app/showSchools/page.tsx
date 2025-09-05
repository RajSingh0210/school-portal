import { prisma } from "@/app/lib/prisma";

export default async function ShowSchoolsPage() {
  const schools = await prisma.school.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <section className="section">
      <h1 style={{ marginBottom: 12 }}>Schools</h1>
      <div className="grid">
        {schools.map((s: { id: number; name: string; address: string; city: string; state: string; image: string; }) => (
          <div key={s.id} className="card">
            <div style={{ position: "relative", width: "100%", height: 160 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.image} alt={s.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div className="cardBody">
              <h3 className="title">{s.name}</h3>
              <p className="muted">{s.address}</p>
              <p className="muted">{s.city}, {s.state}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


