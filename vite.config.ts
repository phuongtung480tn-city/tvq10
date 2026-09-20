// The shared TanStack/Vite adapter provides the framework plugins and production
// server preset. Keep project-specific overrides in this file.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  build: {
    target: "es2022",
    chunkSizeWarningLimit: 750,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("src/routes/")) return "routes";
          if (id.includes("src/components/admin/")) return "admin-ui";
          if (id.includes("src/lib/")) return "app-lib";
          if (id.includes("node_modules")) {
            if (id.includes("@tanstack/react-router") || id.includes("@tanstack/router")) {
              return "router-core";
            }
            if (id.includes("@tanstack/react-query")) {
              return "query-core";
            }
            if (id.includes("@tanstack/react-start")) {
              return "start-core";
            }
            if (id.includes("@radix-ui")) {
              return "ui-core";
            }
            if (id.includes("recharts") || id.includes("d3-") || id.includes("@visx")) {
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
            if (id.includes("date-fns")) {
              return "date-utils";
            }
            if (id.includes("react-hook-form") || id.includes("@hookform")) {
              return "form-core";
            }
            if (id.includes("cmdk") || id.includes("vaul") || id.includes("embla")) {
              return "ui-extra";
            }
            if (
              id.includes("zod") ||
              id.includes("clsx") ||
              id.includes("tailwind-merge")
            ) {
              return "utils";
            }
          }
          return undefined;
        },
      },
    },
  },
});
