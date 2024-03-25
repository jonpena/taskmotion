// import million from "million/compiler";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

//mode dev and prod

// https://vitejs.dev/config/
export default defineConfig({
  // plugins: [million.vite({ auto: true }), react()],
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
