import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { cutPoints, videoDurationInSeconds } from "../data/scenes";
import { emphasisIndices } from "../data/transcript";
import { transcript } from "../data/transcript";

const emphasisStarts = transcript.filter((_, i) => emphasisIndices.has(i)).map((w) => w.start);

/** Fast-attack, exponential-decay bump used for both hard-cut punches and word emphasis. */
const bump = (t: number, triggers: number[], amount: number, decay: number) => {
  let total = 0;
  for (const trigger of triggers) {
    const dt = t - trigger;
    if (dt < 0 || dt > decay * 4) continue;
    total += amount * Math.exp(-dt / decay);
  }
  return total;
};

export const ZoomPunch: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const drift = interpolate(t, [0, videoDurationInSeconds], [1, 1.07], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cutPunch = bump(t, cutPoints, 0.085, 0.28);
  const emphasisPunch = bump(t, emphasisStarts, 0.035, 0.18);

  const scale = drift + cutPunch + emphasisPunch;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          transform: `scale(${scale})`,
          transformOrigin: "50% 42%",
        }}
      >
        {children}
      </div>
    </div>
  );
};
