import { Composition } from "remotion";
import { ImpactReportScene } from "./ImpactReportScene";
import { DURATION_IN_FRAMES, FPS } from "./timing";

export const MyComposition = () => {
  return (
    <Composition
      id="ImpactReportScene"
      component={ImpactReportScene}
      durationInFrames={DURATION_IN_FRAMES}
      fps={FPS}
      width={1920}
      height={1080}
    />
  );
};
