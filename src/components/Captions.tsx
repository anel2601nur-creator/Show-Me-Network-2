import React, { useMemo } from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { transcript, emphasisIndices, type Word } from "../data/transcript";
import { fontFamily } from "../font";

const WORDS_PER_GROUP = 4;

type Group = {
  words: Word[];
  indices: number[];
  start: number;
  end: number;
};

const groups: Group[] = (() => {
  const out: Group[] = [];
  for (let i = 0; i < transcript.length; i += WORDS_PER_GROUP) {
    const words = transcript.slice(i, i + WORDS_PER_GROUP);
    const indices = words.map((_, j) => i + j);
    out.push({
      words,
      indices,
      start: words[0].start,
      end: words[words.length - 1].end,
    });
  }
  return out;
})();

export const Captions: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const activeGroupIndex = useMemo(() => {
    const idx = groups.findIndex((g, i) => {
      const next = groups[i + 1];
      const upperBound = next ? next.start : g.end + 0.6;
      return t >= g.start - 0.05 && t < upperBound;
    });
    return idx;
  }, [t]);

  if (activeGroupIndex === -1) return null;
  const group = groups[activeGroupIndex];

  const groupAgeSeconds = t - group.start;
  const enter = spring({
    fps,
    frame: groupAgeSeconds * fps,
    config: { damping: 14, stiffness: 180, mass: 0.5 },
    durationInFrames: 10,
  });

  const timeUntilGroupEnd = group.end - t;
  const exit =
    timeUntilGroupEnd < 0.35
      ? interpolate(timeUntilGroupEnd, [-0.25, 0.35], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 1;

  const translateY = interpolate(enter, [0, 1], [24, 0]);

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: "16%",
        display: "flex",
        justifyContent: "center",
        padding: "0 6%",
        opacity: enter * exit,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "0 14px",
          maxWidth: "100%",
        }}
      >
        {group.words.map((word, i) => {
          const globalIndex = group.indices[i];
          const isActive = t >= word.start && t < word.end;
          const isPast = t >= word.end;
          const isEmphasis = emphasisIndices.has(globalIndex);

          const wordAge = (t - word.start) * fps;
          const pop = spring({
            fps,
            frame: wordAge,
            config: { damping: 12, stiffness: 260, mass: 0.4 },
            durationInFrames: 8,
          });
          const scale = isActive
            ? interpolate(pop, [0, 1], [0.85, isEmphasis ? 1.18 : 1.06])
            : 1;

          return (
            <span
              key={`${globalIndex}-${word.text}`}
              style={{
                fontFamily,
                fontWeight: 800,
                fontSize: isEmphasis ? 66 : 58,
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
                color: isActive || isPast ? "#ffffff" : "rgba(255,255,255,0.45)",
                WebkitTextStroke: "2px rgba(0,0,0,0.55)",
                paintOrder: "stroke fill",
                textShadow: "0 6px 22px rgba(0,0,0,0.45)",
                display: "inline-block",
                transform: `scale(${scale})`,
                transformOrigin: "center bottom",
                background: isActive
                  ? "linear-gradient(180deg, #ffd23f 0%, #ff9f1c 100%)"
                  : "transparent",
                WebkitBackgroundClip: isActive ? "text" : undefined,
                backgroundClip: isActive ? "text" : undefined,
                WebkitTextFillColor: isActive ? "transparent" : undefined,
              }}
            >
              {word.text}
            </span>
          );
        })}
      </div>
    </div>
  );
};
