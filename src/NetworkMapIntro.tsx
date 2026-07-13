import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { COLORS } from "./colors";
import { INTRO_DURATION, INTRO_OUTRO_DURATION, INTRO_REVEAL_DURATION } from "./timing";

export const NetworkMapIntro: React.FC = () => {
  const frame = useCurrentFrame();

  const reveal = interpolate(frame, [0, INTRO_REVEAL_DURATION], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const insetRight = interpolate(reveal, [0, 1], [100, 0]);
  const revealScale = interpolate(reveal, [0, 1], [1.04, 1]);
  const revealOpacity = interpolate(frame, [0, INTRO_REVEAL_DURATION * 0.6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const kenBurns = interpolate(frame, [0, INTRO_DURATION], [1, 1.035], {
    easing: Easing.out(Easing.cubic),
  });

  const outroStart = INTRO_DURATION - INTRO_OUTRO_DURATION;
  const outroT = interpolate(frame, [outroStart, INTRO_DURATION], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });
  const outroOpacity = interpolate(outroT, [0, 1], [1, 0]);
  const outroScale = interpolate(outroT, [0, 1], [1, 1.06]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.bgFrom} 0%, ${COLORS.bgVia} 55%, ${COLORS.bgTo} 100%)`,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: 900,
          opacity: revealOpacity * outroOpacity,
          transform: `scale(${revealScale * kenBurns * outroScale})`,
          borderRadius: 28,
          overflow: "hidden",
          boxShadow: "0 40px 80px rgba(18, 49, 89, 0.18)",
        }}
      >
        <div style={{ clipPath: `inset(0 ${insetRight}% 0 0)` }}>
          <Img src={staticFile("network-map.png")} style={{ width: "100%", display: "block" }} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
