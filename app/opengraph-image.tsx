import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Akshat Gupta | Builder of Orange Taxi and more";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#FFF6E5",
          padding: "60px 70px",
          fontFamily: "sans-serif",
          border: "12px solid #1A1A1A",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px 24px",
              backgroundColor: "#FFD13B",
              borderRadius: "9999px",
              border: "3px solid #1A1A1A",
              fontSize: 22,
              fontWeight: 800,
              color: "#1A1A1A",
            }}
          >
            Built by Akshat Gupta ↗
          </div>

          <div
            style={{
              fontSize: 20,
              color: "#1A1A1A",
              fontWeight: 700,
              letterSpacing: "0.05em",
            }}
          >
            BMSCE · BENGALURU
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 900,
              color: "#1A1A1A",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            Akshat Gupta
          </div>

          <div
            style={{
              fontSize: 26,
              color: "#1A1A1A",
              lineHeight: 1.4,
              maxWidth: 980,
              opacity: 0.9,
            }}
          >
            Full-stack developer and CS undergrad (IoT, Cybersecurity &amp; Blockchain) at BMS College of Engineering, Bengaluru. Builder of Orange Taxi and autonomous rescue robotics.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <div
            style={{
              padding: "8px 18px",
              backgroundColor: "#FFFFFF",
              borderRadius: "9999px",
              border: "2px solid #1A1A1A",
              fontSize: 18,
              fontWeight: 700,
              color: "#1A1A1A",
            }}
          >
            ⚡ Orange Taxi (PWA &amp; Dispatch)
          </div>
          <div
            style={{
              padding: "8px 18px",
              backgroundColor: "#FFFFFF",
              borderRadius: "9999px",
              border: "2px solid #1A1A1A",
              fontSize: 18,
              fontWeight: 700,
              color: "#1A1A1A",
            }}
          >
            🤖 Autonomous Rescue Robot
          </div>
          <div
            style={{
              padding: "8px 18px",
              backgroundColor: "#FFFFFF",
              borderRadius: "9999px",
              border: "2px solid #1A1A1A",
              fontSize: 18,
              fontWeight: 700,
              color: "#1A1A1A",
            }}
          >
            🚂 Locomotive CV Tracking
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
