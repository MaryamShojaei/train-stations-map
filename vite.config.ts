/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig, type UserConfig } from "vite";
import react from "@vitejs/plugin-react";

const config: UserConfig = {
  plugins: [react()],
  // @ts-expect-error: vitest config
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
  },
};

export default defineConfig(config);
