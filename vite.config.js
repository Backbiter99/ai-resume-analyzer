import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import babel from "vite-plugin-babel";
import netlifyPlugin from "@netlify/vite-plugin-react-router";

export default defineConfig({
    plugins: [
        babel({
            filter: /\.[jt]sx?$/,
            babelConfig: {
                presets: ["@babel/preset-typescript"], // if you use TypeScript
                plugins: [["babel-plugin-react-compiler"]],
            },
        }),
        tailwindcss(),
        reactRouter(),
        tsconfigPaths(),
        netlifyPlugin(),
    ],
});
