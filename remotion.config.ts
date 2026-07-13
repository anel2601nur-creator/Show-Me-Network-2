/**
 * Note: When using the Node.JS APIs, the config file
 * doesn't apply. Instead, pass options directly to the APIs.
 *
 * All configuration options: https://remotion.dev/docs/config
 */

import fs from "node:fs";
import { Config } from "@remotion/cli/config";
import { enableTailwind } from '@remotion/tailwind-v4';

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.overrideWebpackConfig(enableTailwind);

// Dev-container fallback: this sandbox has no internet access to download
// Remotion's own Chrome Headless Shell, but ships a Playwright Chromium at
// this path. Only used when present, so it's a no-op on a normal machine.
const sandboxBrowser =
  "/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell";
if (fs.existsSync(sandboxBrowser)) {
  Config.setBrowserExecutable(sandboxBrowser);
  Config.setConcurrency(1);
  Config.setDelayRenderTimeoutInMilliseconds(60000);
}
