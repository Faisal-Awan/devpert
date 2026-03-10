import { team } from "../data/siteData";

function TeamPage() {
  return (
    <section className="section page-hero">
      <h1>Team</h1>
      <p>Cross-functional experts in software engineering and healthcare.</p>
      <div className="cards-grid compact-grid stagger-grid">
        {team.map((member) => {
          const Icon = member.icon;
          return (
            <article key={member.role} className="glass-card fade-up">
              <Icon className="card-icon icon-bounce" />
              <h3>{member.role}</h3>
              <p>{member.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default TeamPage;
