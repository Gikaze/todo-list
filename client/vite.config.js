import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Eslintrc from "./.eslintrc.cjs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), Eslintrc],
});
