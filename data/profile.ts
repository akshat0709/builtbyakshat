export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
  stack: string[];
  link?: string;
}

export interface BuiltProjectItem {
  id: string;
  title: string;
  description: string;
  stack: string[];
  link: string;
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
  experience: ExperienceItem[];
  builtProjects: BuiltProjectItem[];
  skills: SkillCategory[];
  education: EducationItem;
  recognition: RecognitionItem[];
  contact: ContactInfo;
}

export const builderProfile: BuilderProfile = {
  name: "Akshat Gupta",
  tagline:
    "Full-stack developer and CS undergrad (IoT, Cybersecurity & Blockchain) at BMS College of Engineering, Bengaluru. I build real systems, from a live ride-hailing platform to an autonomous rescue robot.",
  intro:
    "I design and engineer reliable full-stack applications, real-time distributed platforms, and embedded hardware systems.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://builtby.akshatgupta.dev",
  portfolioUrl: process.env.NEXT_PUBLIC_PORTFOLIO_URL || "[PORTFOLIO_URL]",
  experience: [
    {
      role: "Full-Stack Developer Intern",
      company: "Orange Taxi",
      period: "Sep 2026 - [Dec 2026 / Present]",
      description:
        "Pre-launch premium electric cab service in Delhi NCR. Designed and built the complete production software as a PWA: a real-time dispatch engine on Supabase Realtime (ride requests, live driver location, in-ride chat) and an in-app UPI payment flow with dynamic QR codes for driver cash handovers.",
      stack: [
        "React",
        "TypeScript",
        "TanStack Start",
        "Supabase (PostgreSQL)",
        "Tailwind CSS",
      ],
      link: "https://orange-taxi.com",
    },
  ],
  builtProjects: [
    {
      id: "orange-taxi",
      title: "Orange Taxi",
      description: "Full-stack electric ride-hailing and fleet platform",
      stack: ["React", "TypeScript", "TanStack Start", "Supabase", "Tailwind CSS"],
      link: "https://orange-taxi.com",
      doodle: "taxi",
    },
    {
      id: "rescue-robot",
      title: "Autonomous Search and Rescue Robot",
      description:
        "Obstacle sensing, telemetry and path planning in GPS-denied zones",
      stack: ["ROS", "Python", "C++", "Microcontrollers", "Sensors"],
      link: "[RESCUE_ROBOT_REPO_URL]",
      doodle: "robot",
    },
    {
      id: "animal-detection",
      title: "Animal Detection in Locomotive Tracks",
      description:
        "Computer vision with real-time alerts to prevent train-animal collisions",
      stack: ["Python", "OpenCV", "YOLO", "Edge AI", "IoT"],
      link: "[ANIMAL_DETECTION_REPO_URL]",
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
