import { services } from "../data/siteData";

function ServicesPage() {
  return (
    <section className="section page-hero">
      <h1>Services</h1>
      <p>What we do</p>
      <div className="services-intro-spacer" />
      <div className="cards-grid services-page-grid stagger-grid">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <article
              key={service.title}
              className="glass-card service-page-card slide-in"
              style={{ animationDelay: `${index * 0.09}s` }}
            >
              <Icon className="card-icon icon-bounce" />
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
