import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const forwardedHost = process.env.CODESPACE_NAME
  ? `${process.env.CODESPACE_NAME}-5173.${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN || 'app.github.dev'}`
  : undefined;

export default defineConfig({
  plugins: [react()],
  server: { allowedHosts: forwardedHost ? [forwardedHost] : [] },
  preview: { allowedHosts: forwardedHost ? [forwardedHost] : [] },
});
