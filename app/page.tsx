export default function Home() {
  return (
    <section className="section">
      <h1 style={{ marginBottom: 12 }}>Welcome</h1>
      <p className="muted" style={{ marginBottom: 16 }}>Use the links below to manage and view schools.</p>
      <div style={{ display: "flex", gap: 12 }}>
        <a className="linkBtn" href="/addSchool">Add School</a>
        <a className="linkBtn" href="/showSchools">Show Schools</a>
      </div>
    </section>
  );
}
