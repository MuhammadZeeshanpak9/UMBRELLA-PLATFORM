import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const CHAKRA_COLORS = [
  "#FF4D4D",
  "#FFA34D",
  "#FFE64D",
  "#4DFF4D",
  "#4DFFFF",
  "#A34DFF",
  "#9F81B9",
];

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#030008",
        }}
      >
        <svg width="150" height="150" viewBox="0 0 150 150">
          <circle
            cx="75"
            cy="75"
            r="62"
            fill="none"
            stroke="url(#g)"
            strokeWidth="13"
          />
          <defs>
            <linearGradient id="g" x1="0%" y1="0%" x2="0%" y2="100%">
              {CHAKRA_COLORS.map((c, i) => (
                <stop
                  key={c}
                  offset={`${(i / (CHAKRA_COLORS.length - 1)) * 100}%`}
                  stopColor={c}
                />
              ))}
            </linearGradient>
          </defs>
          <circle cx="75" cy="75" r="16" fill="#9F81B9" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
