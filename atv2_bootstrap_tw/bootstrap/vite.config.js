import { defineConfig } from 'vite';

const forwardedHost = process.env.CODESPACE_NAME
  ? `${process.env.CODESPACE_NAME}-5174.${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN || 'app.github.dev'}`
  : undefined;

export default defineConfig({
  server: { allowedHosts: forwardedHost ? [forwardedHost] : [] },
  preview: { allowedHosts: forwardedHost ? [forwardedHost] : [] },
});
