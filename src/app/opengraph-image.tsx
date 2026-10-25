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
          background: "#F8F7F3",
          padding: 64,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 16, height: 16, borderRadius: 8, background: "#F3350C" }} />
          <div
            style={{
              display: "flex",
              fontSize: 30,
              fontWeight: 600,
              letterSpacing: "-0.04em",
              color: "#0A0A0A",
            }}
          >
            Taku-Media®
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 76,
              fontWeight: 600,
              color: "#0A0A0A",
              lineHeight: 1,
              letterSpacing: "-0.045em",
              maxWidth: 1050,
            }}
          >
            Senior engineering pods shipped in days,&nbsp;
            <span style={{ color: "#8A8883" }}>not months.</span>
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#5C5C5C" }}>
            Prototype hardening · iOS & Android · Fixed-price sprints
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
