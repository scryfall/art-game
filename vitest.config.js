import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [vue()],
  test: {
    include: ["**/*.test.ts"],
    globals: true,
    watch: false,
    clearMocks: true,
  },
});
