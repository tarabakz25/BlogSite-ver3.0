// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  server: {
    headers: {
      'Permissions-Policy': 'private-state-token-redemption=(), private-state-token-issuance=(), browsing-topics=()'
    }
  }
});
