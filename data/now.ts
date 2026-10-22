export interface NowData {
  lastUpdated: string;
  headline: string;
  building: {
    title: string;
    description: string;
    projectUrl?: string;
  }[];
  learning: {
    topic: string;
    description: string;
  }[];
  readingOrExploring: string[];
}

export const nowData: NowData = {
  lastUpdated: "October 2026",
  headline: "What I'm focused on right now, engineering-wise.",
  building: [
    {
      title: "Orange Taxi Dispatch & Payment PWA",
      description:
        "Tuning Supabase Realtime dispatch latency, rider-driver sync, and dynamic UPI QR handovers.",
      projectUrl: "https://orange-taxi.com",
    },
    {
      title: "Embedded Robotics Firmware",
      description:
        "Refining sensor bus acquisition and obstacle-avoidance state machines in C++.",
    },
  ],
  learning: [
    {
      topic: "React Native & Expo",
      description:
        "Translating PWA concepts into native cross-platform mobile patterns and offline caches.",
    },
    {
      topic: "Edge AI Quantization",
      description:
        "Running lightweight vision models on constrained microcontrollers without cloud round-trips.",
    },
  ],
  readingOrExploring: [
    "Distributed consensus in IoT sensor meshes",
    "PostgreSQL Row Level Security optimization patterns",
    "Real-time vehicle telemetry telemetry schemas",
  ],
};
