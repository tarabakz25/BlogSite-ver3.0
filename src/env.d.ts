/// <reference types="astro/client" />

interface Window {
  dataLayer: any[];
}

declare const Typekit: {
  load(config: { kitId: string; scriptTimeout: number; async: boolean }): void;
};

declare function gtag(...args: any[]): void;
