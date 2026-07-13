import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Clapperboard } from "lucide-react";

export type BRollWindow = {
  start: number;
  end: number;
  description: string;
};

/**
 * Simulates a b-roll cutaway slot: dims/desaturates the live footage and
 * shows a clearly-labeled placeholder card for the window duration, so the
 * cut rhythm of the final edit is visible before real cutaway footage exists.
 * Swap this for an actual <OffthreadVideo> of the real clip in that Sequence.
 */
export const BRollPlaceholder: React.FC<BRollWindow> = ({ start, end, description }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  if (t < start || t > end) return null;

  const fadeIn = interpolate(t, [start, start + 0.15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(t, [end - 0.2, end], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = Math.min(fadeIn, fadeOut);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: "24%",
        background: "rgba(8,10,14,0.86)",
      }}
    >
      <div
        style={{
          border: "3px dashed rgba(255,255,255,0.35)",
          borderRadius: 24,
          padding: "48px 40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          maxWidth: "78%",
        }}
      >
        <Clapperboard color="#ffd23f" size={56} strokeWidth={2} />
        <div
          style={{
            color: "#ffd23f",
            fontFamily: "sans-serif",
            fontWeight: 800,
            fontSize: 22,
            letterSpacing: "0.08em",
          }}
        >
          B-ROLL PLACEHOLDER
        </div>
        <div
          style={{
            color: "rgba(255,255,255,0.85)",
            fontFamily: "sans-serif",
            fontWeight: 500,
            fontSize: 20,
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          {description}
        </div>
      </div>
    </div>
  );
};
