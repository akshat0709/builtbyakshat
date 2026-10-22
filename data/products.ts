export type ProductStatus = "live" | "pre-launch" | "prototype";

export interface BuiltWithItem {
  tech: string;
  plainEnglish: string;
}

export interface Product {
  slug: string;
  name: string;
  oneLiner: string;
  status: ProductStatus;
  role: string;
  stack: string[];
  builtWith: BuiltWithItem[];
  builderNote: string;
  productUrl?: string;
  repoUrl?: string;
  feedbackSubject: string;
  ogTagline: string;
}

export const PRODUCTS: Record<string, Product> = {
  "orange-taxi": {
    slug: "orange-taxi",
    name: "Orange Taxi",
    oneLiner: "Full-stack electric ride-hailing and fleet platform in Delhi NCR.",
    status: "pre-launch",
    role: "Full-Stack Developer Intern",
    stack: [
      "React",
      "TypeScript",
      "TanStack Start",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS",
    ],
    builtWith: [
      {
        tech: "Supabase Realtime",
        plainEnglish: "Live driver location, ride requests, and in-ride chat engine",
      },
      {
        tech: "TanStack Start & React",
        plainEnglish: "Production Progressive Web App (PWA) client",
      },
      {
        tech: "UPI Payments",
        plainEnglish: "Dynamic in-app QR code generation for driver cash handovers",
      },
      {
        tech: "PostgreSQL & RLS",
        plainEnglish: "Role-based data security for rider and fleet dispatch records",
      },
    ],
    builderNote: "[PLACEHOLDER]",
    productUrl: "https://orange-taxi.com",
    feedbackSubject: "[Orange Taxi] Feedback",
    ogTagline:
      "Electric ride-hailing platform with real-time dispatch, dynamic QR payments, and PWA client.",
  },
  "autonomous-rescue-robot": {
    slug: "autonomous-rescue-robot",
    name: "Autonomous Search and Rescue Robot",
    oneLiner:
      "Obstacle sensing, telemetry, and path planning in GPS-denied disaster environments.",
    status: "prototype",
    role: "Lead Hardware & Systems Developer",
    stack: ["ROS", "Python", "C++", "Microcontrollers", "Sensors"],
    builtWith: [
      {
        tech: "Obstacle Sensing",
        plainEnglish: "Ultrasonic and infrared telemetry for mapping GPS-denied zones",
      },
      {
        tech: "Telemetry & Path Planning",
        plainEnglish: "Real-time navigation algorithms avoiding hazardous obstacles",
      },
      {
        tech: "Embedded Microcontrollers",
        plainEnglish: "Firmware loop coordinating drive motors and sensor buses",
      },
    ],
    builderNote: "[PLACEHOLDER]",
    repoUrl: "https://github.com/akshat0709/AutonomousSearchAndRescueRobot",
    feedbackSubject: "[Autonomous Rescue Robot] Feedback",
    ogTagline:
      "Telemetry, obstacle sensing, and path planning in GPS-denied environments.",
  },
  "animal-detection": {
    slug: "animal-detection",
    name: "Animal Detection in Locomotive Tracks",
    oneLiner:
      "Computer vision with real-time alerts to prevent train-animal collisions.",
    status: "prototype",
    role: "Computer Vision Developer",
    stack: ["Python", "OpenCV", "YOLO", "Computer Vision", "Edge AI"],
    builtWith: [
      {
        tech: "YOLO & Computer Vision",
        plainEnglish: "Deep learning models detecting wildlife on railway tracks in real time",
      },
      {
        tech: "Real-Time Alert Dispatch",
        plainEnglish: "Low-latency signaling to notify operators before collision danger zones",
      },
      {
        tech: "Python & OpenCV",
        plainEnglish: "Video stream processing pipeline tuned for high-speed transit",
      },
    ],
    builderNote: "[PLACEHOLDER]",
    repoUrl: "https://github.com/akshat0709/AnimalDetection",
    feedbackSubject: "[Animal Detection] Feedback",
    ogTagline:
      "Real-time computer vision alerts to prevent animal collisions on railway tracks.",
  },
};

/**
 * Validates a raw query ref parameter against the registry.
 * Returns the matched Product or null. Never returns unvalidated input.
 */
export function getProductByRef(
  rawRef: string | null | undefined
): Product | null {
  if (!rawRef || typeof rawRef !== "string") {
    return null;
  }
  const sanitized = rawRef.trim().toLowerCase().replace(/[^a-z0-9-]/g, "");
  if (Object.prototype.hasOwnProperty.call(PRODUCTS, sanitized)) {
    return PRODUCTS[sanitized];
  }
  return null;
}
