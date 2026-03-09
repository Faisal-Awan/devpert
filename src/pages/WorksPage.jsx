import { works } from "../data/siteData";

function WorksPage() {
  return (
    <section className="section page-hero">
      <h1>Works</h1>
      <p>Selected platforms delivered for healthcare teams and suppliers.</p>
      <div className="cards-grid">
        {works.map((project) => (
          <article key={project.title} className="glass-card slide-in">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default WorksPage;
