import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "../font";

export type KineticTitleProps = {
  lines: string[];
  atSeconds: number;
  holdSeconds: number;
  position?: "top" | "center" | "bottom";
  accentColor?: string;
};

export const KineticTitle: React.FC<KineticTitleProps> = ({
  lines,
  atSeconds,
  holdSeconds,
  position = "top",
  accentColor = "#ffd23f",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const age = t - atSeconds;

  if (age < -0.1 || age > holdSeconds + 0.4) return null;

  const enter = spring({
    fps,
    frame: age * fps,
    config: { damping: 16, stiffness: 200, mass: 0.6 },
    durationInFrames: 14,
  });

  const timeLeft = holdSeconds - age;
  const exit =
    timeLeft < 0.35
      ? interpolate(timeLeft, [-0.1, 0.35], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 1;

  const posStyle =
    position === "top"
      ? { top: "9%" }
      : position === "bottom"
        ? { bottom: "13%" }
        : { top: "50%", transform: "translateY(-50%)" };

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        ...posStyle,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        opacity: exit,
        padding: "0 8%",
      }}
    >
      {lines.map((line, i) => {
        const lineDelay = i * 3;
        const lineEnter = interpolate(
          (age * fps - lineDelay) / 12,
          [0, 1],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
        const translateY = interpolate(lineEnter, [0, 1], [30, 0]);
        return (
          <div
            key={i}
            style={{
              fontFamily,
              fontWeight: 900,
              fontSize: i === 0 ? 64 : 48,
              color: i === 0 ? "#ffffff" : accentColor,
              textAlign: "center",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              textShadow: "0 8px 30px rgba(0,0,0,0.55)",
              opacity: lineEnter,
              transform: `translateY(${translateY}px) scale(${interpolate(enter, [0, 1], [0.92, 1])})`,
            }}
          >
            {line}
          </div>
        );
      })}
    </div>
  );
};
