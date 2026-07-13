import "./index.css";
import { Composition } from "remotion";
import { MainEdit } from "./MainEdit";
import { durationInFrames, fps } from "./data/scenes";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MainEdit"
        component={MainEdit}
        durationInFrames={durationInFrames}
        fps={fps}
        width={1080}
        height={1920}
      />
    </>
  );
};
