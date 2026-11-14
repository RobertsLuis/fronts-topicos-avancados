import { defineConfig } from 'vite';

const forwardedHost =
  process.env.CODESPACE_NAME &&
  process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN
    ? `${process.env.CODESPACE_NAME}-5176.${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}`
    : null;

export default defineConfig({
  server: { allowedHosts: forwardedHost ? [forwardedHost] : [] },
  preview: { allowedHosts: forwardedHost ? [forwardedHost] : [] },
});
