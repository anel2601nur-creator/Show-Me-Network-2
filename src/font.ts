// Loaded via @font-face in components/FontFace.tsx (self-hosted local files,
// no network fetch), rather than JS-driven delayRender/loadFont — that
// combination was found to hang intermittently when Remotion recycles the
// render tab mid-render. Bold fallbacks cover the rare frame rendered before
// the local font finishes loading right after a tab recycle.
export const fontFamily =
  '"Inter", "Arial Black", "Helvetica Neue", Arial, sans-serif';

export const fontFaceOnlyFamily = "Inter";
