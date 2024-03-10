// import million from "million/compiler";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
//mode dev and prod

// https://vitejs.dev/config/
export default defineConfig({
  // plugins: [million.vite({ auto: true }), react()],
  plugins: [react()],
});
