import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tanstackStart({
      // @ts-expect-error - preset is passed to Nitro but not typed in this version
      server: { entry: "./src/server.ts", preset: "vercel" },
    }),
    viteReact(),
    tailwindcss(),
    tsConfigPaths(),
  ],
});
