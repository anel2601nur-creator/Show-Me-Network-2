export type Point = [number, number];

export const VIEWBOX_WIDTH = 600;
export const VIEWBOX_HEIGHT = 460;

// Stylized, simplified silhouette of Missouri (not GIS-accurate), traced
// clockwise starting near the NW corner so the outline reads as drawing
// left-to-right across the top first.
export const MISSOURI_OUTLINE: Point[] = [
  [70, 60],
  [95, 42],
  [180, 36],
  [260, 40],
  [300, 30],
  [345, 38],
  [400, 34],
  [430, 55],
  [418, 95],
  [442, 130],
  [412, 165],
  [444, 200],
  [416, 235],
  [446, 268],
  [420, 298],
  [452, 322],
  [478, 340],
  [500, 368],
  [512, 410],
  [486, 442],
  [452, 448],
  [424, 420],
  [402, 372],
  [388, 340],
  [150, 336],
  [118, 312],
  [96, 270],
  [80, 210],
  [66, 150],
  [58, 100],
];

export type CityDot = {
  x: number;
  y: number;
  label: string;
};

export const MISSOURI_DOTS: CityDot[] = [
  { x: 95, y: 110, label: "St. Joseph" },
  { x: 100, y: 225, label: "Kansas City" },
  { x: 260, y: 205, label: "Columbia" },
  { x: 250, y: 255, label: "Jefferson City" },
  { x: 215, y: 330, label: "Springfield" },
  { x: 135, y: 335, label: "Joplin" },
  { x: 400, y: 190, label: "St. Louis" },
  { x: 440, y: 310, label: "Cape Girardeau" },
];

export const MISSOURI_EDGES: [number, number][] = [
  [0, 1],
  [1, 3],
  [3, 2],
  [2, 6],
  [3, 4],
  [4, 5],
  [6, 7],
  [3, 7],
];

const dist = (a: Point, b: Point): number => Math.hypot(a[0] - b[0], a[1] - b[1]);

export const buildClosedPath = (points: Point[]): string => {
  const [first, ...rest] = points;
  const commands = rest.map(([x, y]) => `L ${x} ${y}`).join(" ");
  return `M ${first[0]} ${first[1]} ${commands} Z`;
};

export const pathTotalLength = (points: Point[]): number => {
  let total = 0;
  for (let i = 0; i < points.length; i++) {
    const a = points[i];
    const b = points[(i + 1) % points.length];
    total += dist(a, b);
  }
  return total;
};
