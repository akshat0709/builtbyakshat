export interface UseItem {
  name: string;
  category: "hardware" | "tools" | "stack";
  description: string;
  url?: string;
}

export const USES_DATA: UseItem[] = [
  // Editor & Tools (from verified resume)
  {
    name: "VS Code",
    category: "tools",
    description:
      "Primary code editor configured with strict TypeScript, ESLint, Tailwind CSS IntelliSense, and integrated zsh terminal.",
    url: "https://code.visualstudio.com",
  },
  {
    name: "Git & GitHub",
    category: "tools",
    description:
      "Atomic git commit workflows, feature branching, interactive rebasing, and GitHub Actions CI automation.",
    url: "https://github.com",
  },
  {
    name: "Kali Linux",
    category: "tools",
    description:
      "Security auditing, network packet analysis, vulnerability scanning, and penetration testing sandbox.",
    url: "https://www.kali.org",
  },
  {
    name: "Cisco Packet Tracer",
    category: "tools",
    description:
      "Network architecture simulation, VLAN routing, packet inspection, and subnet topology design.",
  },

  // Stack (from verified resume)
  {
    name: "Next.js 14 (App Router) & React 18",
    category: "stack",
    description:
      "Hybrid static/SSR web applications, streaming layouts, and typed server-client boundaries.",
    url: "https://nextjs.org",
  },
  {
    name: "TypeScript",
    category: "stack",
    description:
      "Strict type definitions, shared model schemas, zero unchecked anys, and end-to-end safety.",
    url: "https://www.typescriptlang.org",
  },
  {
    name: "Supabase (PostgreSQL, Realtime, RLS)",
    category: "stack",
    description:
      "Relational schemas, sub-100ms WebSocket broadcast channels for live dispatch, and Row Level Security enforcement.",
    url: "https://supabase.com",
  },
  {
    name: "Tailwind CSS",
    category: "stack",
    description:
      "Hand-crafted design tokens, 2px ink borders, hard offset shadows, and zero-runtime CSS footprint.",
    url: "https://tailwindcss.com",
  },
  {
    name: "C & C++",
    category: "stack",
    description:
      "Bare-metal microcontroller firmware loops, direct hardware register manipulation, and ROS robotic node development.",
  },
  {
    name: "Python (OpenCV & YOLO)",
    category: "stack",
    description:
      "Computer vision pipelines, video stream frame extraction, and real-time inference telemetry.",
  },

  // Hardware (Placeholders - will be automatically hidden by the filter on /uses)
  {
    name: "[PLACEHOLDER] Laptop Workstation",
    category: "hardware",
    description: "[PLACEHOLDER] Machine model, RAM, and storage specs.",
  },
  {
    name: "[PLACEHOLDER] Microcontroller Development Boards",
    category: "hardware",
    description: "[PLACEHOLDER] ESP32, Arduino Uno, and custom sensor test bench.",
  },
];
