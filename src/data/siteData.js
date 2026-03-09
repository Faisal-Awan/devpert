import {
  FaCode,
  FaHospital,
  FaLaptopCode,
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
    title: "IT Consulting",
    description: "Strategic consulting for healthcare technology infrastructure.",
  },
  {
    icon: FaNotesMedical,
    title: "Medical Orders",
    description: "Automation system for managing medical orders efficiently.",
  },
  {
    icon: FaHospital,
    title: "Healthcare Software",
    description: "Custom medical software for clinics and suppliers.",
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
    role: "CEO",
    description: "Technology Strategy",
  },
  {
    icon: FaCode,
    role: "Developers",
    description: "Software Engineers",
  },
  {
    icon: FaUserDoctor,
    role: "Medical Experts",
    description: "Healthcare Consultants",
  },
];

export const works = [
  {
    title: "Digital Pharmacy Grid",
    description:
      "A real-time medicine stock and supplier sync platform for multi-branch pharmacies.",
  },
  {
    title: "OrderFlow Med",
    description:
      "Automated order lifecycle for diagnostics, clinics, and distributor networks.",
  },
  {
    title: "CareHub Dashboard",
    description:
      "Analytics dashboard for patient throughput, billing, and service quality metrics.",
  },
];

export const testimonials = [
  {
    quote:
      "DEVPERT gave us complete visibility of our order pipeline and reduced processing delay by 40%.",
    name: "Aarav S.",
    title: "Operations Head, MedSupply Chain",
  },
  {
    quote:
      "Their team translated clinical requirements into software faster than expected.",
    name: "Dr. Neha R.",
    title: "Director, Sunrise Specialty Clinic",
  },
  {
    quote:
      "From prototype to deployment, every sprint was transparent and high quality.",
    name: "Rahul M.",
    title: "CTO, HealthBridge Network",
  },
];
