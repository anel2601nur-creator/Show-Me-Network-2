import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "./colors";
import { MissouriMap } from "./MissouriMap";
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
  DURATION_IN_FRAMES,
  MAP_RECEDE_END,
  MAP_RECEDE_START,
  PANEL_LEFT_SLIDE_START,
  PANEL_RIGHT_SLIDE_START,
  PANEL_SLIDE_DURATION,
} from "./timing";

const formatMillions = (value: number) => `$${value.toFixed(1)}M`;
const formatWholeNumber = (value: number) => `${Math.round(value)}`;

export const ImpactReportScene: React.FC = () => {
  const frame = useCurrentFrame();

  const cameraScale = interpolate(frame, [0, DURATION_IN_FRAMES], [1, 1.035], {
    easing: Easing.out(Easing.cubic),
  });

  const recede = interpolate(frame, [MAP_RECEDE_START, MAP_RECEDE_END], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const mapScale = interpolate(recede, [0, 1], [1, 0.42]);
  const mapOpacity = interpolate(recede, [0, 1], [1, 0.13]);
  const parallaxY = interpolate(frame, [MAP_RECEDE_END, DURATION_IN_FRAMES], [0, -22], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const mapTranslateY = interpolate(recede, [0, 1], [0, -150]) + parallaxY;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.bgFrom} 0%, ${COLORS.bgVia} 55%, ${COLORS.bgTo} 100%)`,
      }}
    >
      <AbsoluteFill
        style={{
          transform: `scale(${cameraScale})`,
          transformOrigin: "50% 50%",
        }}
      >
        <AbsoluteFill
          style={{
            top: 70,
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <div
            style={{
              width: 780,
              height: 600,
              opacity: mapOpacity,
              transform: `translateY(${mapTranslateY}px) scale(${mapScale})`,
              transformOrigin: "50% 0%",
            }}
          >
            <MissouriMap />
          </div>
        </AbsoluteFill>

        <AbsoluteFill
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            gap: 48,
            paddingTop: 40,
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
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
