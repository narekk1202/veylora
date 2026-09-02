import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#171717",
      }}
    >
      <div
        style={{
          display: "flex",
          color: "#b8a9c9",
          fontSize: 108,
          fontWeight: 700,
          letterSpacing: -4,
          lineHeight: 1,
        }}
      >
        V
      </div>
    </div>,
    { ...size },
  );
}
