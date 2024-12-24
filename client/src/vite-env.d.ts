/// <reference types="vite/client" />
/// <reference types="vitest" />

interface ImportMetaEnv {
  readonly VITE_APP_SUPABASE_URL: string;
  readonly VITE_APP_SUPABASE_ANON_KEY: string;
  readonly VITE_GITHUB_API_URL: string;
  readonly VITE_TASKMOTION_API_PROD: string;
  readonly VITE_TASKMOTION_API_DEV: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
