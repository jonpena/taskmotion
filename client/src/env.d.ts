/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_SUPABASE_URL: string;
  readonly VITE_APP_SUPABASE_ANON_KEY: string;
  readonly VITE_GITHUB_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
