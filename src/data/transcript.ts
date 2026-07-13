export type Word = {
  text: string;
  start: number;
  end: number;
};

/**
 * Real transcript, provided by the client. Word-level start/end times are
 * estimated (silence-detected speech segments, words distributed within
 * each segment weighted by character length) rather than transcribed
 * timestamps, so sync is close but not frame-perfect — nudge individual
 * `start`/`end` values here if a word feels early/late once you watch it.
 */
export const transcript: Word[] = [
  { text: "Whether", start: 0, end: 0.348 },
  { text: "you're", start: 0.348, end: 0.652 },
  { text: "just", start: 0.652, end: 0.87 },
  { text: "getting", start: 0.87, end: 1.218 },
  { text: "started", start: 1.218, end: 1.566 },
  { text: "or", start: 1.566, end: 1.696 },
  { text: "looking", start: 1.696, end: 2.044 },
  { text: "to", start: 2.044, end: 2.174 },
  { text: "grow,", start: 2.174, end: 2.435 },
  { text: "the", start: 2.435, end: 2.609 },
  { text: "Show-Me", start: 2.609, end: 2.957 },
  { text: "Network", start: 2.957, end: 3.305 },
  { text: "connects", start: 3.305, end: 3.697 },
  { text: "Missouri", start: 3.697, end: 4.088 },
  { text: "entrepreneurs", start: 4.088, end: 4.697 },
  { text: "with", start: 4.697, end: 4.914 },
  { text: "the", start: 4.914, end: 5.088 },
  { text: "resources,", start: 5.088, end: 5.567 },
  { text: "education,", start: 5.567, end: 6.045 },
  { text: "and", start: 6.045, end: 6.219 },
  { text: "expert", start: 6.562, end: 6.881 },
  { text: "support", start: 6.881, end: 7.245 },
  { text: "they", start: 7.549, end: 7.833 },
  { text: "need", start: 7.833, end: 8.117 },
  { text: "to", start: 8.117, end: 8.287 },
  { text: "succeed.", start: 8.287, end: 8.797 },
  { text: "Need", start: 8.797, end: 9.081 },
  { text: "help", start: 9.081, end: 9.365 },
  { text: "writing", start: 9.365, end: 9.819 },
  { text: "a", start: 10.182, end: 10.28 },
  { text: "business", start: 10.28, end: 10.72 },
  { text: "plan?", start: 10.72, end: 11.014 },
  { text: "Looking", start: 11.014, end: 11.406 },
  { text: "for", start: 11.406, end: 11.601 },
  { text: "funding", start: 11.601, end: 11.993 },
  { text: "opportunities?", start: 11.993, end: 12.727 },
  { text: "Have", start: 12.727, end: 12.972 },
  { text: "questions", start: 12.972, end: 13.462 },
  { text: "about", start: 13.462, end: 13.755 },
  { text: "legal,", start: 13.755, end: 14.098 },
  { text: "accounting,", start: 14.098, end: 14.685 },
  { text: "or", start: 14.685, end: 14.832 },
  { text: "other", start: 14.832, end: 15.126 },
  { text: "business", start: 15.126, end: 15.566 },
  { text: "challenges?", start: 15.566, end: 16.154 },
  { text: "We're", start: 16.154, end: 16.447 },
  { text: "here", start: 16.447, end: 16.692 },
  { text: "to", start: 16.692, end: 16.839 },
  { text: "connect", start: 16.839, end: 17.23 },
  { text: "you", start: 17.23, end: 17.426 },
  { text: "with", start: 17.426, end: 17.671 },
  { text: "the", start: 17.671, end: 17.867 },
  { text: "right", start: 17.867, end: 18.16 },
  { text: "resources.", start: 18.16, end: 18.699 },
  { text: "So,", start: 18.699, end: 18.895 },
  { text: "what", start: 18.895, end: 19.139 },
  { text: "happens", start: 19.139, end: 19.531 },
  { text: "when", start: 19.531, end: 19.776 },
  { text: "you", start: 19.776, end: 19.972 },
  { text: "reach", start: 19.972, end: 20.265 },
  { text: "out?", start: 20.265, end: 20.51 },
  { text: "We'll", start: 20.51, end: 20.804 },
  { text: "learn", start: 20.804, end: 21.097 },
  { text: "about", start: 21.097, end: 21.391 },
  { text: "your", start: 21.391, end: 21.636 },
  { text: "business,", start: 21.636, end: 22.125 },
  { text: "your", start: 22.125, end: 22.37 },
  { text: "goals,", start: 22.37, end: 22.713 },
  { text: "and", start: 22.713, end: 22.908 },
  { text: "where", start: 22.908, end: 23.202 },
  { text: "you", start: 23.202, end: 23.398 },
  { text: "need", start: 23.398, end: 23.643 },
  { text: "support.", start: 23.643, end: 24.083 },
  { text: "Then,", start: 24.083, end: 24.377 },
  { text: "we'll", start: 24.377, end: 24.671 },
  { text: "connect", start: 24.671, end: 25.062 },
  { text: "you", start: 25.062, end: 25.258 },
  { text: "with", start: 25.258, end: 25.503 },
  { text: "the", start: 25.503, end: 25.698 },
  { text: "right", start: 25.698, end: 25.992 },
  { text: "resources", start: 25.992, end: 26.482 },
  { text: "to", start: 26.482, end: 26.628 },
  { text: "help", start: 26.628, end: 26.873 },
  { text: "you", start: 26.873, end: 27.069 },
  { text: "move", start: 27.069, end: 27.314 },
  { text: "your", start: 27.314, end: 27.558 },
  { text: "business", start: 27.558, end: 27.999 },
  { text: "forward.", start: 27.999, end: 28.44 },
  { text: "No", start: 28.44, end: 28.586 },
  { text: "matter", start: 28.586, end: 28.929 },
  { text: "where", start: 29.366, end: 29.648 },
  { text: "you", start: 29.648, end: 29.836 },
  { text: "are", start: 29.836, end: 30.025 },
  { text: "in", start: 30.025, end: 30.166 },
  { text: "your", start: 30.166, end: 30.401 },
  { text: "entrepreneurial", start: 30.401, end: 31.154 },
  { text: "journey,", start: 31.154, end: 31.577 },
  { text: "you", start: 31.577, end: 31.765 },
  { text: "don't", start: 31.765, end: 32.048 },
  { text: "have", start: 32.048, end: 32.283 },
  { text: "to", start: 32.638, end: 32.762 },
  { text: "figure", start: 32.762, end: 33.05 },
  { text: "it", start: 33.05, end: 33.174 },
  { text: "out", start: 33.174, end: 33.339 },
  { text: "alone.", start: 33.339, end: 33.627 },
  { text: "Get", start: 33.627, end: 33.792 },
  { text: "connected", start: 33.792, end: 34.205 },
  { text: "today", start: 34.205, end: 34.452 },
  { text: "at", start: 34.452, end: 34.576 },
  { text: "ShowMeNetwork.org.", start: 34.576, end: 35.359 },
];

/** Hand-picked keyword indices for kinetic-emphasis pops (bigger + colored). */
export const emphasisIndices = new Set([
  10, // Show-Me
  11, // Network
  13, // Missouri
  17, // resources,
  25, // succeed.
  31, // plan?
  34, // funding
  35, // opportunities?
  53, // resources.
  67, // goals,
  80, // resources
  87, // forward.
  95, // entrepreneurial
  104, // alone.
  106, // connected
  109, // ShowMeNetwork.org.
]);
