import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const forwardedHost =
  process.env.CODESPACE_NAME &&
  process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN
    ? `${process.env.CODESPACE_NAME}-5177.${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}`
    : null;

export default defineConfig({
  plugins: [vue()],
  server: { allowedHosts: forwardedHost ? [forwardedHost] : [] },
  preview: { allowedHosts: forwardedHost ? [forwardedHost] : [] },
});
