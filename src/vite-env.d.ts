/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_PROTOCOL: string;
  readonly VITE_APP_ADDRESS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
