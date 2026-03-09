import { services } from "../data/siteData";

function ServicesPage() {
  return (
    <section className="section page-hero">
      <h1>Services</h1>
      <p>Technology services designed specifically for healthcare operations.</p>
      <div className="cards-grid">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <article key={service.title} className="glass-card slide-in">
              <Icon className="card-icon" />
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default ServicesPage;
