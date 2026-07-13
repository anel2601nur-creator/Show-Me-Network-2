import React from "react";
import { AbsoluteFill, Easing, Sequence, interpolate, useCurrentFrame } from "remotion";
import { ImpactReportScene } from "./ImpactReportScene";
import { NetworkMapIntro } from "./NetworkMapIntro";
import { INTRO_DURATION, INTRO_OVERLAP, STATS_DURATION } from "./timing";

const StatsCrossfadeIn: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, INTRO_OVERLAP], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill style={{ opacity }}>
      <ImpactReportScene />
    </AbsoluteFill>
  );
};

export const FullReport: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#ffffff" }}>
      <Sequence durationInFrames={INTRO_DURATION}>
        <NetworkMapIntro />
      </Sequence>
      <Sequence from={INTRO_DURATION - INTRO_OVERLAP} durationInFrames={STATS_DURATION}>
        <StatsCrossfadeIn />
      </Sequence>
    </AbsoluteFill>
  );
};
