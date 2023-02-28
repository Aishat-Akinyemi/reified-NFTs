/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NETWORK: "TESTNET";
  readonly VITE_GAS_PRICE: string;
  readonly VITE_APP_RPC: string;
  readonly VITE_APP_CHAIN_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
