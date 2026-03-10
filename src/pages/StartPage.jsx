import { FaAmazon, FaApple, FaGoogle, FaMicrosoft } from "react-icons/fa6";
import Counter from "../components/Counter";
import { services, stats, team } from "../data/siteData";

function StartPage() {
  const whatsAppLink =
    "https://wa.me/923104318090?text=Hi%20DevPert%2C%20I%20would%20like%20to%20book%20a%20free%20consultation.";

  return (
    <>
      <section className="hero-section">
        <div className="hero-overlay" />
        <div className="hero-content fade-up">
          <span className="hero-badge">Healthcare IT Platform</span>
          <h1>
            YOUR SEARCH
            <br />
             ENDS HERE LET&apos;S START BUILDING
          </h1>
          <p>
            DevPert is a full-service software
            <br />
            development company.
          </p>
          <a
            className="hero-cta"
            href={whatsAppLink}
            target="_blank"
            rel="noreferrer"
          >
            Book a Free Consultation
          </a>
        </div>
      </section>

      <section className="section">
        <h2>Our Services</h2>
        <div className="cards-grid services-grid-four stagger-grid">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <article
                key={service.title}
                className="glass-card fade-up"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <Icon className="card-icon icon-bounce" />
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
    </>
  );
}

export default StartPage;
