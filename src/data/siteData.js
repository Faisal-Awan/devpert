import {
  FaCode,
  FaCloud,
  FaGears,
  FaHospital,
  FaLaptopCode,
  FaMobileScreenButton,
  FaNotesMedical,
  FaUserDoctor,
  FaUserTie,
} from "react-icons/fa6";

export const navItems = [
  { label: "Start", path: "/" },
  { label: "About", path: "/about" },
  { label: "Works", path: "/works" },
  { label: "Team", path: "/team" },
  { label: "Testimonial", path: "/testimonial" },
  { label: "Services", path: "/services" },
  { label: "Contact", path: "/contact" },
];

export const services = [
  {
    icon: FaLaptopCode,
    title: "Web Development",
    description:
      "Deliver high-quality web experiences with robust architecture, polished UI, and business-ready performance.",
  },
  {
    icon: FaGears,
    title: "DevOps",
    description:
      "Enhance delivery speed and product quality with CI/CD automation, infrastructure reliability, and release governance.",
  },
  {
    icon: FaMobileScreenButton,
    title: "Mobile App Development",
    description:
      "Build standout Android and iOS applications with clean UX, secure backends, and scalable mobile architecture.",
  },
  {
    icon: FaCode,
    title: "Custom Development",
    description:
      "Get software tailored to your workflows to improve productivity, reduce manual effort, and streamline operations.",
  },
  {
    icon: FaCloud,
    title: "Cloud M&M",
    description:
      "Simplify cloud migration and management with secure, cost-aware, and performance-optimized cloud operations.",
  },
  {
    icon: FaNotesMedical,
    title: "QA Testing & Automation",
    description:
      "Improve reliability with end-to-end quality assurance, test automation, and measurable release confidence.",
  },
  {
    icon: FaHospital,
    title: "Digital Transformation",
    description:
      "Digitize and automate core processes to accelerate decisions, improve visibility, and unlock business agility.",
  },
  {
    icon: FaUserDoctor,
    title: "Dynamics 365 ERP",
    description:
      "Drive efficiency and growth with tailored Microsoft Dynamics 365 ERP implementations and custom extensions.",
  },
];

export const stats = [
  { value: 120, label: "Projects" },
  { value: 80, label: "Clients" },
  { value: 15, label: "Countries" },
  { value: 10, label: "Years Experience" },
];

export const team = [
  {
    icon: FaUserTie,
    role: "Product Leadership",
    description: "Strategy, roadmap planning, and stakeholder alignment.",
  },
  {
    icon: FaCode,
    role: "Engineering",
    description: "Full-stack, mobile, cloud, and platform specialists.",
  },
  {
    icon: FaUserDoctor,
    role: "Domain Consultants",
    description: "Business analysts and industry experts for solution fit.",
  },
  {
    icon: FaCloud,
    role: "Cloud Operations",
    description: "Cloud architecture, optimization, and secure deployments.",
  },
  {
    icon: FaGears,
    role: "DevOps & Automation",
    description: "CI/CD pipelines, release engineering, and observability.",
  },
  {
    icon: FaLaptopCode,
    role: "UI/UX & Frontend",
    description: "User-first interfaces with fast, accessible web experiences.",
  },
];

export const works = [
  {
    title: "B2B Marketplace Platform",
    description:
      "A high-volume procurement and fulfillment platform with vendor onboarding, pricing intelligence, and order orchestration.",
  },
  {
    title: "Logistics Control Tower",
    description:
      "A real-time dashboard for route optimization, delivery tracking, and SLA monitoring across distributed operations.",
  },
  {
    title: "Field Service Automation",
    description:
      "An integrated mobile and web system for workforce scheduling, service reporting, and analytics-driven decisions.",
  },
];

export const testimonials = [
  {
    quote:
      "From the start, they showcased a proactive attitude, focusing on every detail and providing smart technical solutions to each challenge. They were not just service providers but true partners in our project, and I am deeply grateful for their exceptional support.",
    name: "Jennifer Lee",
    title: "CEO, B2B Marketplace",
  },
  {
    quote:
      "Incredibly talented and an absolute joy to work with, they supported us through ideation, implementation, and beyond.",
    name: "Kevin Perry",
    title: "President, Nistahh",
  },
  {
    quote:
      "Their engineering discipline and communication made the entire delivery cycle faster, smoother, and more predictable.",
    name: "Amir Khan",
    title: "Director of Technology, RetailOps Group",
  },
];
