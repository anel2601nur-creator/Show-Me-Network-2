import React from "react";
import { AbsoluteFill, OffthreadVideo, staticFile } from "remotion";
import { ZoomPunch } from "./components/ZoomPunch";
import { ColorGrade } from "./components/ColorGrade";
import { Captions } from "./components/Captions";
import { IconBurst, type IconTrigger } from "./components/IconBurst";
import { BRollPlaceholder, type BRollWindow } from "./components/BRollPlaceholder";
import { KineticTitle } from "./components/KineticTitle";
import { FontFace } from "./components/FontFace";
import { TrendingUp, Target, DollarSign, BookOpen, Rocket } from "lucide-react";

const icons: IconTrigger[] = [
  { icon: BookOpen, atSeconds: 5.2, holdSeconds: 0.8, x: 14, y: 62, color: "#5fd0d8" },
  { icon: TrendingUp, atSeconds: 8.4, holdSeconds: 0.8, x: 85, y: 22, color: "#ffd23f" },
  { icon: DollarSign, atSeconds: 11.7, holdSeconds: 0.8, x: 86, y: 62, color: "#7be07a" },
  { icon: Target, atSeconds: 22.45, holdSeconds: 0.8, x: 14, y: 22, color: "#ff9f6b" },
  { icon: Rocket, atSeconds: 28.05, holdSeconds: 0.8, x: 86, y: 22, color: "#ffd23f" },
];

const brollWindows: BRollWindow[] = [
  { start: 12.5, end: 13.7, description: "Suggested b-roll: paperwork / laptop / advisor meeting" },
  { start: 21.35, end: 22.55, description: "Suggested b-roll: whiteboard goal-setting / team planning" },
];

export const MainEdit: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <FontFace />
      <ZoomPunch>
        <OffthreadVideo src={staticFile("source-video.mp4")} />
      </ZoomPunch>

      <ColorGrade />

      {brollWindows.map((w, i) => (
        <BRollPlaceholder key={i} {...w} />
      ))}

      {icons.map((icon, i) => (
        <IconBurst key={i} {...icon} />
      ))}

      <KineticTitle
        lines={["MISSOURI ENTREPRENEURS,", "LISTEN UP."]}
        atSeconds={0.05}
        holdSeconds={1.5}
        position="top"
      />

      <KineticTitle
        lines={["GET CONNECTED TODAY", "ShowMeNetwork.org"]}
        atSeconds={35.35}
        holdSeconds={1.15}
        position="center"
        accentColor="#ffd23f"
      />

      <Captions />
    </AbsoluteFill>
  );
};
