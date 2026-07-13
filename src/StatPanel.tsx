import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONT_STACK } from "./colors";
import { RollingNumber } from "./RollingNumber";

type Props = {
  slideStart: number;
  slideDuration: number;
  fromSide: "left" | "right";
  countStart: number;
  countEnd: number;
  toValue: number;
  formatValue: (value: number) => string;
  captionStart: number;
  captionEnd: number;
  title: string;
  description: string[];
};

export const StatPanel: React.FC<Props> = ({
  slideStart,
  slideDuration,
  fromSide,
  countStart,
  countEnd,
  toValue,
  formatValue,
  captionStart,
  captionEnd,
  title,
  description,
}) => {
  const frame = useCurrentFrame();

  const slideT = interpolate(frame, [slideStart, slideStart + slideDuration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const offset = fromSide === "left" ? -620 : 620;
  const translateX = interpolate(slideT, [0, 1], [offset, 0]);
  const opacity = interpolate(frame, [slideStart, slideStart + slideDuration * 0.65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const captionOpacity = interpolate(frame, [captionStart, captionEnd], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const captionTranslateY = interpolate(frame, [captionStart, captionEnd], [14, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        width: 560,
        padding: "56px 48px",
        borderRadius: 32,
        backgroundColor: COLORS.paleGreen,
        boxShadow: "0 30px 60px rgba(18, 49, 89, 0.12)",
        opacity,
        transform: `translateX(${translateX}px)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <RollingNumber
        start={countStart}
        end={countEnd}
        toValue={toValue}
        formatValue={formatValue}
        fontSize={92}
        color={COLORS.navy}
        glowColor="rgba(111, 174, 44, 0.4)"
      />
      <div
        style={{
          opacity: captionOpacity,
          transform: `translateY(${captionTranslateY}px)`,
          marginTop: 18,
        }}
      >
        <div
          style={{
            fontFamily: FONT_STACK,
            fontWeight: 700,
            fontSize: 34,
            color: COLORS.blue,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: FONT_STACK,
            fontWeight: 500,
            fontSize: 21,
            color: COLORS.blue,
            marginTop: 12,
            lineHeight: 1.4,
            maxWidth: 420,
          }}
        >
          {description.map((line) => (
            <div key={line}>{line}</div>
          ))}
        </div>
      </div>
    </div>
  );
};
