import { FaAmazon, FaApple, FaGoogle, FaMicrosoft } from "react-icons/fa6";
import Counter from "../components/Counter";
import { services, stats, team } from "../data/siteData";

function StartPage() {
  return (
    <>
      <section className="hero-section">
        <div className="hero-overlay" />
        <div className="hero-content fade-up">
          <span className="hero-badge">Healthcare IT Platform</span>
          <h1>Smart Healthcare IT Solutions</h1>
          <p>
            Automating medical orders, pharmacy workflows, and healthcare
            platforms with precision.
          </p>
          <button type="button">Get Started</button>
        </div>
      </section>

      <section className="section">
        <h2>Our Services</h2>
        <div className="cards-grid">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article key={service.title} className="glass-card fade-up">
                <Icon className="card-icon" />
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="stats-section">
        {stats.map((item) => (
          <Counter key={item.label} target={item.value} label={item.label} />
        ))}
      </section>

      <section className="section">
        <h2>Trusted By</h2>
        <div className="client-logos">
          <FaGoogle />
          <FaMicrosoft />
          <FaAmazon />
          <FaApple />
        </div>
      </section>

      <section className="section">
        <h2>Our Team</h2>
        <div className="cards-grid compact-grid">
          {team.map((member) => {
            const Icon = member.icon;
            return (
              <article key={member.role} className="glass-card fade-up">
                <Icon className="card-icon" />
                <h3>{member.role}</h3>
                <p>{member.description}</p>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default StartPage;
