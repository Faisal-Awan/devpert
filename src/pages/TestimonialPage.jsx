import { testimonials } from "../data/siteData";

function TestimonialPage() {
  return (
    <section className="section page-hero">
      <h1>Testimonial</h1>
      <p>What our partners say after deploying DEVPERT solutions.</p>
      <div className="cards-grid">
        {testimonials.map((item) => (
          <article key={item.name} className="glass-card fade-up">
            <p className="quote">"{item.quote}"</p>
            <h3>{item.name}</h3>
            <p>{item.title}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default TestimonialPage;
