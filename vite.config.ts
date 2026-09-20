// The shared TanStack/Vite adapter provides the framework plugins and production
// server preset. Keep project-specific overrides in this file.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  build: {
    target: "es2022",
    chunkSizeWarningLimit: 750,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (
              id.includes("@tanstack/react-router") ||
              id.includes("@tanstack/react-start") ||
              id.includes("@tanstack/router")
            ) {
              return "router-core";
            }
            if (id.includes("@radix-ui")) {
              return "ui-core";
            }
            if (id.includes("recharts") || id.includes("d3-")) {
              return "charts";
            }
            if (id.includes("lucide-react")) {
              return "icons";
            }
            if (id.includes("sonner")) {
              return "toast";
            }
            if (id.includes("@supabase")) {
              return "data";
            }
            if (id.includes("react-dom") || id.includes("react")) {
              return "react-vendor";
            }
            if (
              id.includes("zod") ||
              id.includes("clsx") ||
              id.includes("tailwind-merge")
            ) {
              return "utils";
            }
          }
        },
      },
    },
  },
});
