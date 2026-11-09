import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

const forwardedHost = process.env.CODESPACE_NAME
  ? `${process.env.CODESPACE_NAME}-5175.${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN || "app.github.dev"}`
  : undefined;

export default defineConfig({
  plugins: [tailwindcss()],
  server: { allowedHosts: forwardedHost ? [forwardedHost] : [] },
  preview: { allowedHosts: forwardedHost ? [forwardedHost] : [] },
});
