import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import eslint from "vite-plugin-eslint";

import { resolve } from "path";

const dir = (path: string) => resolve(process.cwd(), "./", path);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni(), eslint({})],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: dir("src"),
      },
      {
        find: "@ui",
        replacement: dir("node_modules/@dcloudio/uni-ui/lib/"),
      },
      {
        find: "#/types",
        replacement: dir("types"),
      },
    ],
  },
});
