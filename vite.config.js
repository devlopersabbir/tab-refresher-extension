import { defineConfig } from "vite";
import manifest from "./manifest";
import { crx } from "@crxjs/vite-plugin";

export default defineConfig({
  plugins: [crx({ manifest })],
});
