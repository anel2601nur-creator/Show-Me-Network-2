import React from "react";
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "./colors";
import {
  MISSOURI_DOTS,
  MISSOURI_EDGES,
  MISSOURI_OUTLINE,
  VIEWBOX_HEIGHT,
  VIEWBOX_WIDTH,
  buildClosedPath,
  pathTotalLength,
} from "./missouri-data";
import {
  DOT_POP_DURATION,
  DOT_STAGGER,
  DOT_START,
  EDGE_DRAW_DURATION,
  EDGE_STAGGER,
  EDGE_START,
  OUTLINE_DRAW_END,
  OUTLINE_DRAW_START,
} from "./timing";

const OUTLINE_PATH = buildClosedPath(MISSOURI_OUTLINE);
const OUTLINE_LENGTH = pathTotalLength(MISSOURI_OUTLINE);

export const MissouriMap: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const outlineProgress = interpolate(
    frame,
    [OUTLINE_DRAW_START, OUTLINE_DRAW_END],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    },
  );

  return (
    <svg
      viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
      style={{ width: "100%", height: "100%", overflow: "visible" }}
    >
      <path
        d={OUTLINE_PATH}
        fill="none"
        stroke={COLORS.blue}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={`${OUTLINE_LENGTH * outlineProgress} ${OUTLINE_LENGTH}`}
      />

      {MISSOURI_EDGES.map(([a, b], i) => {
        const from = MISSOURI_DOTS[a];
        const to = MISSOURI_DOTS[b];
        const length = Math.hypot(to.x - from.x, to.y - from.y);
        const start = EDGE_START + i * EDGE_STAGGER;
        const progress = interpolate(
          frame,
          [start, start + EDGE_DRAW_DURATION],
          [0, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          },
        );
        return (
          <line
            key={`edge-${a}-${b}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke={COLORS.green}
            strokeWidth={1.3}
            strokeLinecap="round"
            strokeOpacity={0.75}
            strokeDasharray={`${length * progress} ${length}`}
          />
        );
      })}

      {MISSOURI_DOTS.map((dot, i) => {
        const start = DOT_START + i * DOT_STAGGER;
        const localFrame = frame - start;
        const scale = spring({
          frame: localFrame,
          fps,
          durationInFrames: DOT_POP_DURATION,
          config: { damping: 18, mass: 0.5, stiffness: 150 },
        });
        const opacity = interpolate(frame, [start, start + 6], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <g
            key={dot.label}
            opacity={opacity}
            transform={`translate(${dot.x} ${dot.y}) scale(${Math.max(0, scale)})`}
          >
            <circle r={10} fill={COLORS.brightBlue} opacity={0.22} style={{ filter: "blur(3px)" }} />
            <circle r={5} fill={COLORS.brightBlue} opacity={0.4} />
            <circle r={2.8} fill={COLORS.blue} />
          </g>
        );
      })}
    </svg>
  );
};
