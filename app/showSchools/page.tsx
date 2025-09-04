//

async function fetchSchools(baseUrl: string) {
  const res = await fetch(`${baseUrl}/api/schools`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load");
  return res.json();
}

export default async function ShowSchoolsPage() {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";
  const schools = await fetchSchools(baseUrl);
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


