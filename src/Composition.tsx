import { Composition } from "remotion";
import { FullReport } from "./FullReport";
import { DURATION_IN_FRAMES, FPS, VIDEO_HEIGHT, VIDEO_WIDTH } from "./timing";

export const MyComposition = () => {
  return (
    <Composition
      id="ImpactReportScene"
      component={FullReport}
      durationInFrames={DURATION_IN_FRAMES}
      fps={FPS}
      width={VIDEO_WIDTH}
      height={VIDEO_HEIGHT}
    />
  );
};
