import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import type { LucideIcon } from "lucide-react";

export type IconTrigger = {
  icon: LucideIcon;
  atSeconds: number;
  holdSeconds?: number;
  x: number; // percent from left
  y: number; // percent from top
  color?: string;
};

export const IconBurst: React.FC<IconTrigger> = ({
  icon: Icon,
  atSeconds,
  holdSeconds = 0.9,
  x,
  y,
  color = "#ffd23f",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const age = t - atSeconds;

  if (age < -0.05 || age > holdSeconds + 0.35) return null;

  const enter = spring({
    fps,
    frame: age * fps,
    config: { damping: 10, stiffness: 220, mass: 0.5 },
    durationInFrames: 10,
  });

  const timeLeft = holdSeconds - age;
  const exit =
    timeLeft < 0.3
      ? interpolate(timeLeft, [-0.05, 0.3], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 1;

  const scale = interpolate(enter, [0, 1], [0.3, 1]);
  const rotate = interpolate(enter, [0, 1], [-25, 0]);

  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(-50%, -50%) scale(${scale}) rotate(${rotate}deg)`,
        opacity: enter * exit,
      }}
    >
      <div
        style={{
          width: 96,
          height: 96,
          borderRadius: "50%",
          background: "rgba(10,10,12,0.55)",
          border: `2px solid ${color}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 0 30px ${color}55`,
        }}
      >
        <Icon color={color} size={48} strokeWidth={2.4} />
      </div>
    </div>
  );
};
