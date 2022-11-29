import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import { resolve } from "path";

const dir = (path: string) => {
  return resolve(process.cwd(), ".", path);
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],
  resolve: {
    alias: [
      {
        find: /^@ui/,
        replacement: dir("node_modules/@dcloudio/uni-ui/lib/"),
      },
      {
        find: /^#\/types/,
        replacement: dir("types"),
      },
    ],
  },
});
