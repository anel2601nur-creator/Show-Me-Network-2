import React from "react";
import { staticFile } from "remotion";
import { fontFaceOnlyFamily } from "../font";

const face = (weight: number, file: string) => `
@font-face {
  font-family: "${fontFaceOnlyFamily}";
  src: url("${staticFile(file)}") format("woff2");
  font-weight: ${weight};
  font-style: normal;
  font-display: block;
}`;

/** Self-hosted local @font-face rules, injected via <style> so webpack never
 * tries to resolve the url() as a module path (which a plain CSS @import
 * would do for an absolute /fonts/... URL). */
export const FontFace: React.FC = () => (
  <style>
    {[
      face(700, "fonts/inter-latin-700-normal.woff2"),
      face(800, "fonts/inter-latin-800-normal.woff2"),
      face(900, "fonts/inter-latin-900-normal.woff2"),
    ].join("\n")}
  </style>
);
