import viteConfig from "./vite.config";
import { mergeConfig } from "vite";
import { defineConfig } from "vitest/config";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });
export default defineConfig((configEnv) =>
  mergeConfig(
    viteConfig(configEnv),
    defineConfig({
      test: {
        globals: true,
        environment: "jsdom",
        setupFiles: ["./src/setup.ts"],
        testTimeout: 10000,
        coverage: {
          provider: "v8",
          enabled: true,
        },
      },
    }),
  ),
);
