export type Scene = {
  start: number;
  end: number;
  label: string;
};

/** Hard cuts already baked into the source footage, mapped by eye from sampled frames. */
export const scenes: Scene[] = [
  { start: 0, end: 9.7, label: "hallway-intro" },
  { start: 9.7, end: 19.8, label: "seated-interview" },
  { start: 19.8, end: 22, label: "doorway-transition" },
  { start: 22, end: 28.9, label: "stairwell" },
  { start: 28.9, end: 36.57, label: "mural-cta" },
];

/** Frame-accurate cut points (seconds) used to trigger punch-in / whip accents. */
export const cutPoints = scenes.slice(1).map((s) => s.start);

export const videoDurationInSeconds = 36.57;
export const fps = 30;
export const durationInFrames = Math.ceil(videoDurationInSeconds * fps) + 1;
