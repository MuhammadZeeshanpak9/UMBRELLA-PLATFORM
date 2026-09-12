import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
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

export default function Icon() {
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
          borderRadius: "50%",
        }}
      >
        <svg width="56" height="56" viewBox="0 0 56 56">
          <circle
            cx="28"
            cy="28"
            r="24"
            fill="none"
            stroke="url(#g)"
            strokeWidth="5"
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
          <circle cx="28" cy="28" r="6" fill="#9F81B9" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
