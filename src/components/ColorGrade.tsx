import React from "react";
import { useCurrentFrame } from "remotion";

/** Documentary-style teal/orange duotone wash + vignette + subtle film grain. */
export const ColorGrade: React.FC = () => {
  const frame = useCurrentFrame();
  const grainSeed = Math.floor(frame / 3);

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(120% 90% at 50% 40%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.55) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(200deg, rgba(0,60,70,0.35) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0) 65%, rgba(120,50,10,0.3) 100%)",
          mixBlendMode: "overlay",
        }}
      />
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.05, mixBlendMode: "overlay" }}>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed={grainSeed} stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  );
};
