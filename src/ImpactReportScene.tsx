import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { StatPanel } from "./StatPanel";
import {
  CAPTION_LEFT_END,
  CAPTION_LEFT_START,
  CAPTION_RIGHT_END,
  CAPTION_RIGHT_START,
  COUNT_LEFT_END,
  COUNT_LEFT_START,
  COUNT_RIGHT_END,
  COUNT_RIGHT_START,
  PANEL_LEFT_SLIDE_START,
  PANEL_RIGHT_SLIDE_START,
  PANEL_SLIDE_DURATION,
  STATS_DURATION,
} from "./timing";

const formatMillions = (value: number) => `$${value.toFixed(1)}M`;
const formatWholeNumber = (value: number) => `${Math.round(value)}`;

export const ImpactReportScene: React.FC = () => {
  const frame = useCurrentFrame();

  const cameraScale = interpolate(frame, [0, STATS_DURATION], [1, 1.03], {
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        transform: `scale(${cameraScale})`,
        transformOrigin: "50% 50%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 28,
      }}
    >
      <StatPanel
        fromSide="left"
        slideStart={PANEL_LEFT_SLIDE_START}
        slideDuration={PANEL_SLIDE_DURATION}
        countStart={COUNT_LEFT_START}
        countEnd={COUNT_LEFT_END}
        toValue={2.9}
        formatValue={formatMillions}
        captionStart={CAPTION_LEFT_START}
        captionEnd={CAPTION_LEFT_END}
        title="Federal Funds"
        description={[
          "Missouri DED Technical Assistance Grant",
          "to Expand Access to Capital Across Missouri",
        ]}
      />
      <StatPanel
        fromSide="right"
        slideStart={PANEL_RIGHT_SLIDE_START}
        slideDuration={PANEL_SLIDE_DURATION}
        countStart={COUNT_RIGHT_START}
        countEnd={COUNT_RIGHT_END}
        toValue={47}
        formatValue={formatWholeNumber}
        captionStart={CAPTION_RIGHT_START}
        captionEnd={CAPTION_RIGHT_END}
        title="Statewide Partners"
        description={["And Growing"]}
      />
    </AbsoluteFill>
  );
};
