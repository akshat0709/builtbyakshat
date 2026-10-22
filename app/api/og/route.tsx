import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { getProductByRef } from "@/data/products";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rawRef = searchParams.get("ref");
  const product = getProductByRef(rawRef);

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
        {/* Top Header Strip */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
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
            {product ? product.status.toUpperCase() : "BMSCE · BENGALURU"}
          </div>
        </div>

        {/* Center Main Message */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: product ? 56 : 68,
              fontWeight: 900,
              color: "#1A1A1A",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              maxWidth: 1040,
            }}
          >
            {product
              ? `${product.name} was built by Akshat Gupta.`
              : "Akshat Gupta"}
          </div>

          <div
            style={{
              fontSize: 24,
              color: "#1A1A1A",
              lineHeight: 1.4,
              maxWidth: 980,
              opacity: 0.9,
            }}
          >
            {product
              ? product.ogTagline
              : "Full-stack developer and CS undergrad (IoT, Cybersecurity & Blockchain) at BMS College of Engineering, Bengaluru. Builder of Orange Taxi and autonomous rescue robotics."}
          </div>
        </div>

        {/* Bottom Metadata Badges */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}
        >
          {product ? (
            <>
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
                Role: {product.role}
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
                {product.stack.slice(0, 3).join(" · ")}
              </div>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
