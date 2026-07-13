import React from "react";
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT_STACK } from "./colors";

type Props = {
  start: number;
  end: number;
  toValue: number;
  formatValue: (value: number) => string;
  fontSize: number;
  color: string;
  glowColor: string;
};

export const RollingNumber: React.FC<Props> = ({
  start,
  end,
  toValue,
  formatValue,
  fontSize,
  color,
  glowColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const durationInFrames = end - start;
  const springConfig = { damping: 15, mass: 0.9, stiffness: 85 };

  const progress = spring({
    frame: frame - start,
    fps,
    durationInFrames,
    config: springConfig,
  });
  const prevProgress = spring({
    frame: frame - start - 2,
    fps,
    durationInFrames,
    config: springConfig,
  });

  const value = Math.max(0, progress) * toValue;
  const velocity = Math.abs(progress - prevProgress);
  const blurAmount = interpolate(velocity, [0, 0.09], [0, 7], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const settlePulse = interpolate(frame, [end - 5, end, end + 8], [1, 1.045, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const glowOpacity = interpolate(frame, [start, start + 10], [0, 0.22], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ position: "relative", display: "inline-flex", justifyContent: "center" }}>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: fontSize * 3.6,
          height: fontSize * 2,
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, ${glowColor} 0%, rgba(255,255,255,0) 72%)`,
          filter: "blur(38px)",
          opacity: glowOpacity,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "relative",
          fontFamily: FONT_STACK,
          fontWeight: 800,
          fontSize,
          lineHeight: 1,
          color,
          letterSpacing: -1,
          transform: `scale(${settlePulse})`,
          filter: blurAmount > 0.4 ? `blur(${blurAmount}px)` : "none",
          whiteSpace: "nowrap",
        }}
      >
        {formatValue(value)}
      </div>
    </div>
  );
};
