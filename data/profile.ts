import { PRODUCTS, ProductStatus } from "./products";

export interface VerifyLink {
  label: string;
  url: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  startDate: string;
  endDate: string; // Set once here
  description: string;
  stack: string[];
  productSlug?: string;
  status: ProductStatus;
  verifyLinks: VerifyLink[];
  builderNote?: string;
  link?: string;
}

export interface BuiltProjectItem {
  id: string;
  title: string;
  description: string;
  stack: string[];
  link?: string;
  status: ProductStatus;
  verifyLinks: VerifyLink[];
  builderNote?: string;
  doodle: "taxi" | "robot" | "train";
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  grade: string;
}

export interface RecognitionItem {
  title: string;
  context: string;
  badge?: string;
  doodle?: "wheelchair";
}

export interface ContactInfo {
  email: string;
  github: {
    handle: string;
    url: string;
  };
  linkedin: {
    handle: string;
    url: string;
  };
}

export interface BuilderProfile {
  name: string;
  tagline: string;
  intro: string;
  siteUrl: string;
  portfolioUrl: string;
  currentlyBuilding: [string, string];
  experience: ExperienceItem[];
  builtProjects: BuiltProjectItem[];
  skills: SkillCategory[];
  education: EducationItem;
  recognition: RecognitionItem[];
  contact: ContactInfo;
}

// Single data value for experience end date
export const EXPERIENCE_END_DATE = "[Dec 2026 / Present]";

// Build warning check: emits warning during compilation if still placeholder
if (
  typeof process !== "undefined" &&
  (EXPERIENCE_END_DATE.includes("[") || EXPERIENCE_END_DATE.includes("PLACEHOLDER"))
) {
  if (process.env.NODE_ENV !== "test") {
    console.warn(
      `\n\x1b[33m⚠️  [builtbyakshat warning] EXPERIENCE_END_DATE is still "${EXPERIENCE_END_DATE}". Update it in data/profile.ts when confirmed.\x1b[0m\n`
    );
  }
}

export const builderProfile: BuilderProfile = {
  name: "Akshat Gupta",
  tagline: "I build things that move: cabs, robots, trains.",
  intro:
    "You tapped a 'Built by Akshat Gupta' link. Hi. Here's who made it and what else I've made.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://builtby.akshatgupta.dev",
  portfolioUrl: process.env.NEXT_PUBLIC_PORTFOLIO_URL || "[PORTFOLIO_URL]",
  currentlyBuilding: [
    "Next-gen fleet routing heuristics for EV cabs",
    "Microcontroller sensor bus driver in C++",
  ],
  experience: [
    {
      role: "Full-Stack Developer Intern",
      company: "Orange Taxi",
      startDate: "Sep 2026",
      endDate: EXPERIENCE_END_DATE,
      description:
        "Pre-launch premium electric cab service in Delhi NCR. Designed and built the complete production software as a PWA: a real-time dispatch engine on Supabase Realtime (ride requests, live driver location, in-ride chat) and an in-app UPI payment flow with dynamic QR codes for driver cash handovers.",
      stack: [
        "React",
        "TypeScript",
        "TanStack Start",
        "Supabase (PostgreSQL)",
        "Tailwind CSS",
      ],
      productSlug: "orange-taxi",
      status: PRODUCTS["orange-taxi"].status,
      link: "https://orange-taxi.com",
      builderNote: PRODUCTS["orange-taxi"].builderNote,
      verifyLinks: [
        { label: "Live Service", url: "https://orange-taxi.com" },
        {
          label: "LinkedIn Experience",
          url: "https://linkedin.com/in/akshat-gupta-957084317",
        },
      ],
    },
  ],
  builtProjects: [
    {
      id: "orange-taxi",
      title: "Orange Taxi",
      description: "Full-stack electric ride-hailing and fleet platform",
      stack: ["React", "TypeScript", "TanStack Start", "Supabase", "Tailwind CSS"],
      link: "https://orange-taxi.com",
      status: PRODUCTS["orange-taxi"].status,
      builderNote: PRODUCTS["orange-taxi"].builderNote,
      verifyLinks: [
        { label: "Live Site", url: "https://orange-taxi.com" },
        {
          label: "LinkedIn Verification",
          url: "https://linkedin.com/in/akshat-gupta-957084317",
        },
      ],
      doodle: "taxi",
    },
    {
      id: "autonomous-rescue-robot",
      title: "Autonomous Search and Rescue Robot",
      description:
        "Obstacle sensing, telemetry and path planning in GPS-denied zones",
      stack: ["ROS", "Python", "C++", "Microcontrollers", "Sensors"],
      link: "https://github.com/akshat0709/AutonomousSearchAndRescueRobot",
      status: PRODUCTS["autonomous-rescue-robot"].status,
      builderNote: PRODUCTS["autonomous-rescue-robot"].builderNote,
      verifyLinks: [
        {
          label: "GitHub Repository",
          url: "https://github.com/akshat0709/AutonomousSearchAndRescueRobot",
        },
      ],
      doodle: "robot",
    },
    {
      id: "animal-detection",
      title: "Animal Detection in Locomotive Tracks",
      description:
        "Computer vision with real-time alerts to prevent train-animal collisions",
      stack: ["Python", "OpenCV", "YOLO", "Edge AI", "IoT"],
      link: "https://github.com/akshat0709/AnimalDetection",
      status: PRODUCTS["animal-detection"].status,
      builderNote: PRODUCTS["animal-detection"].builderNote,
      verifyLinks: [
        {
          label: "GitHub Repository",
          url: "https://github.com/akshat0709/AnimalDetection",
        },
      ],
      doodle: "train",
    },
  ],
  skills: [
    {
      category: "Languages",
      skills: ["Java", "C", "C++", "Python", "JavaScript", "TypeScript", "SQL"],
    },
    {
      category: "Web and backend",
      skills: [
        "React",
        "Tailwind",
        "Supabase (PostgreSQL, Realtime, RLS)",
        "REST",
        "SSR",
      ],
    },
    {
      category: "Security and IoT",
      skills: ["Kali Linux", "Cisco Packet Tracer", "microcontrollers", "sensors"],
    },
  ],
  education: {
    institution: "BMS College of Engineering",
    degree: "B.E. CS (IoT, Cybersecurity & Blockchain)",
    period: "2024 - 2028",
    grade: "CGPA 8.97 (till 4th sem)",
  },
  recognition: [
    {
      title: "INSPIRE Award, National Science Exhibition",
      context: "Awarded for designing a Voice-Controlled Wheelchair prototype.",
      doodle: "wheelchair",
    },
    {
      title: "3rd Place, CSIR-CIMFR State Level Science Exhibition",
      context: "State-level recognition for applied engineering and applied sciences.",
    },
    {
      title: "School Rank 1, International Mathematics Olympiad",
      context: "First rank in school division for mathematical reasoning and problem-solving.",
    },
  ],
  contact: {
    email: "akshat070906@gmail.com",
    github: {
      handle: "github.com/akshat0709",
      url: "https://github.com/akshat0709",
    },
    linkedin: {
      handle: "linkedin.com/in/akshat-gupta-957084317",
      url: "https://linkedin.com/in/akshat-gupta-957084317",
    },
  },
};
