import { ImageResponse } from "next/og";

export const alt =
  "Veylora — a private decision journal that keeps hindsight honest";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 80,
        background: "#171717",
        color: "#f5f5f5",
      }}
    >
      <div
        style={{
          fontSize: 28,
          letterSpacing: 10,
          textTransform: "uppercase",
          color: "#b8a9c9",
          marginBottom: 28,
        }}
      >
        Veylora
      </div>
      <div style={{ fontSize: 60, lineHeight: 1.15, maxWidth: 960 }}>
        Capture your reasoning before the outcome arrives.
      </div>
      <div
        style={{
          marginTop: 28,
          fontSize: 26,
          color: "#a3a3a3",
          maxWidth: 820,
        }}
      >
        A private decision journal that keeps hindsight honest.
      </div>
    </div>,
    { ...size },
  );
}
