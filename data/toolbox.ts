export interface ToolItem {
  name: string;
  oneLiner: string;
}

export interface DrawerCategory {
  id: string;
  title: string;
  description: string;
  accent: "sunny" | "teal" | "tomato" | "paper";
  tools: ToolItem[];
}

export const TOOLBOX_DRAWERS: DrawerCategory[] = [
  {
    id: "languages",
    title: "Drawer 01: Languages",
    description: "Core programming languages I use across systems, web, and scripts.",
    accent: "sunny",
    tools: [
      { name: "TypeScript", oneLiner: "Type-safe systems and robust UI code with strict schemas." },
      { name: "JavaScript", oneLiner: "Browser and Node runtimes, event loops, and asynchronous dispatch." },
      { name: "Python", oneLiner: "Computer vision pipelines, OpenCV, and telemetry scripting." },
      { name: "C++", oneLiner: "Embedded microcontroller firmware, ROS nodes, and low-latency hardware loops." },
      { name: "C", oneLiner: "Memory-constrained hardware, pointers, and direct peripheral control." },
      { name: "Java", oneLiner: "Object-oriented architectures and algorithmic problem-solving." },
      { name: "SQL", oneLiner: "Relational queries, index optimization, and PostgreSQL schema definitions." },
    ],
  },
  {
    id: "web-backend",
    title: "Drawer 02: Web & Backend",
    description: "Full-stack frameworks, real-time layers, and production data engines.",
    accent: "teal",
    tools: [
      { name: "React", oneLiner: "Component-driven interfaces, reactive state, and performance hooks." },
      { name: "Tailwind CSS", oneLiner: "Rapid utility-first styling with strict tokens and zero runtime CSS." },
      { name: "Supabase", oneLiner: "PostgreSQL, Realtime subscriptions, and Row Level Security policies." },
      { name: "PostgreSQL", oneLiner: "ACID transactions, relational joins, and geospatial telemetry storage." },
      { name: "Realtime", oneLiner: "WebSocket channels for live driver locations, ride chat, and dispatch." },
      { name: "RLS", oneLiner: "Database-level access control enforcing security directly on tables." },
      { name: "SSR", oneLiner: "Server-side rendering for instant page paints and SEO crawlability." },
      { name: "REST", oneLiner: "Predictable HTTP APIs, clean status codes, and resilient endpoints." },
      { name: "Nitro", oneLiner: "Fast server engine for lightweight APIs and edge deployments." },
    ],
  },
  {
    id: "security-iot",
    title: "Drawer 03: Security & IoT",
    description: "Embedded electronics, packet analysis, and security auditing tools.",
    accent: "tomato",
    tools: [
      { name: "Microcontrollers", oneLiner: "ESP32, Arduino, and ARM chips driving sensors and motors." },
      { name: "Sensors", oneLiner: "Ultrasonic, infrared, LiDAR, and cameras for physical world telemetry." },
      { name: "Kali Linux", oneLiner: "Network security testing, vulnerability analysis, and pen-testing tools." },
      { name: "Cisco Packet Tracer", oneLiner: "Network topology modeling, VLAN routing, and packet flow simulation." },
    ],
  },
  {
    id: "tools",
    title: "Drawer 04: Engineering Tools",
    description: "Everyday workflow and version control utilities.",
    accent: "paper",
    tools: [
      { name: "Git", oneLiner: "Atomic commits, branching, rebasing, and clean history management." },
      { name: "GitHub", oneLiner: "Remote collaboration, CI actions, code review, and issue tracking." },
      { name: "VS Code", oneLiner: "Primary IDE tailored with strict TypeScript, linting, and shell tools." },
    ],
  },
];
