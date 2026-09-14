import { ImageResponse } from "next/og";

export const alt = "Taku-Media";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FAFAF8",
          padding: 64,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#1B4DFF",
            fontWeight: 500,
          }}
        >
          Taku-Media
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 500,
              color: "#111113",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              maxWidth: 900,
            }}
          >
            AI implementation for Montreal operators
          </div>
          <div style={{ fontSize: 28, color: "#5A5A5F" }}>
            Strategy, wiring, training. Not another platform.
          </div>
        </div>
        <div
          style={{
            height: 4,
            width: 120,
            background: "#1B4DFF",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
