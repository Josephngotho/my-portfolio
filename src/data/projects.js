// ============================================================
// PROJECTS DATA — Edit this file to add/update projects
// ============================================================
// Instructions:
//  - Place screenshots at public/images/projects/<folder>/screenshot-1.png etc.
//  - Set liveUrl / sourceUrl to null if not available — links won't render.
//  - Set screenshots to [] if no images are available yet.
// ============================================================

export const projectCategories = [
  { id: "all", label: "All Projects" },
  { id: "management", label: "Management Systems" },
  { id: "billing", label: "Billing Systems" },
  { id: "web", label: "Web Development" },
  { id: "automation", label: "Automation" },
  { id: "other", label: "Other Software" },
];

export const projects = [
  {
    id: "school-management",
    name: "School Management System",
    category: "management",
    shortDescription:
      "A comprehensive system for managing student records, academic performance, staff, and institutional workflows.",
    screenshots: [
      "/images/projects/school-management/school.jpeg",
      "/images/projects/school-management/school2.jpeg",
      "/images/projects/school-management/school3.jpeg",
    ],
    technologies: ["React", "Firebase", "Tailwind CSS"],
    liveUrl: "https://shacainahighschool12.netlify.app/",
    sourceUrl: null,
    status: "Live",
  },
  {
    id: "hospital-management",
    name: "Hospital Management System",
    category: "management",
    shortDescription:
      "A system designed to streamline patient records, appointments, billing, and healthcare workflows for medical facilities.",
    screenshots: [
      "/images/projects/hospital-management/hospital1.jpg",
      "/images/projects/hospital-management/hospital2.jpg",
      "/images/projects/hospital-management/hospital3.jpg",
    ],
    technologies: ["React", "Supabase", "Tailwind CSS"],
    liveUrl: "https://afyahealth.netlify.app/",
    sourceUrl: null,
    status: "Live",
  },
  {
    id: "hotel-management",
    name: "Hotel Management System",
    category: "management",
    shortDescription:
      "A hotel operations platform covering room reservations, guest management, check-in/check-out, and revenue tracking.",
    screenshots: [
      "/images/projects/hotel-management/hotel1-b8b06501.jpg",
      "/images/projects/hotel-management/hotel2-186922c8.jpg",
      "/images/projects/hotel-management/hotel3-1aed6ae7.jpg",
    ],
    technologies: ["React", "Firebase", "Tailwind CSS"],
    liveUrl: "https://kibarahavens.netlify.app/",
    sourceUrl: null,
    status: "Live",
  },
  {
    id: "wifi-billing",
    name: "Wi-Fi Billing System",
    category: "billing",
    shortDescription:
      "An internet service billing platform for hotspot operators — managing subscriptions, packages, and payment tracking.",
    screenshots: [
      "/images/projects/wifi-billing/wifi1-c82152d7.jpg",
      "/images/projects/wifi-billing/wifi2-81b2acfb.jpg",
      "/images/projects/wifi-billing/wifi3-da124d9c.jpg",
    ],
    technologies: ["JavaScript", "Firebase"],
    liveUrl: "https://quicktechnetwork.netlify.app/",
    sourceUrl: null,
    status: "Live",
  },
  {
    id: "business-os",
    name: "Business OS",
    category: "management",
    shortDescription:
      "An all-in-one business operations platform for small and medium enterprises — invoicing, inventory, and reporting in one place.",
    screenshots: [
      "/images/projects/business-os/business.jpeg",
      "/images/projects/business-os/business2.jpeg",
      "/images/projects/business-os/business3.jpeg",
    ],
    technologies: ["React", "Supabase", "Prisma", "Tailwind CSS"],
    liveUrl: "https://businessos-henna.vercel.app",
    sourceUrl: null,
    status: "Live",
  },
  {
    id: "ecommerce-frontend",
    name: "Zawadi E-commerce Store",
    category: "web",
    shortDescription:
      "A modern, responsive e-commerce storefront with product listings, cart functionality, and a streamlined checkout experience.",
    screenshots: [
      "/images/projects/ecommerce-frontend/zawadi.jpeg",
      "/images/projects/ecommerce-frontend/zawadi1.jpeg",
      "/images/projects/ecommerce-frontend/zawadi2.jpeg",
    ],
    technologies: ["React", "Tailwind CSS", "JavaScript"],
    liveUrl: "https://zawadiweb.netlify.app",
    sourceUrl: null,
    status: "Live",
  },
  {
    id: "expense-tracker",
    name: "Zawadi Expense Tracker",
    category: "other",
    shortDescription:
      "A personal and business expense tracker with categorisation, budgeting, and visual spending summaries.",
    screenshots: [
      "/images/projects/expense-tracker/expense.jpeg",
      "/images/projects/expense-tracker/expense2.jpeg",
      "/images/projects/expense-tracker/expense3.jpeg",
    ],
    technologies: ["React", "Firebase", "Tailwind CSS"],
    liveUrl: "https://zawadi-expensetracking.netlify.app",
    sourceUrl: null,
    status: "Live",
  },
  {
    id: "client-portfolios",
    name: "Rose Mwemba Portfolio",
    category: "web",
    shortDescription:
      "Custom portfolio website delivered for a client — crafted with clean design, responsive layouts, and performance in mind.",
    screenshots: [
      "/images/projects/client-portfolios/client.jpeg",
      "/images/projects/client-portfolios/client2.jpeg",
      "/images/projects/client-portfolios/client3.jpeg",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "React"],
    liveUrl: "https://rosemwemba.netlify.app",
    sourceUrl: null,
    status: "Live",
  },
];
