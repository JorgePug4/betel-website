import type { GatsbyNode } from "gatsby";
import * as path from "path";

// Alias de rutas para imports limpios (@components, @sections, etc.)
export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({
  actions,
}) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@components": path.resolve(__dirname, "src/components"),
        "@sections": path.resolve(__dirname, "src/sections"),
        "@layouts": path.resolve(__dirname, "src/layouts"),
        "@styles": path.resolve(__dirname, "src/styles"),
        "@assets": path.resolve(__dirname, "src/assets"),
        "@utils": path.resolve(__dirname, "src/utils"),
        "@seo": path.resolve(__dirname, "src/seo"),
        "@apptypes": path.resolve(__dirname, "src/types"),
      },
      extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
  });
};
