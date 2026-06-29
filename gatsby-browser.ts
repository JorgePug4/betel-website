import type { GatsbyBrowser } from "gatsby";
import "./src/styles/global.css";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ThemeProvider } from "./src/context/ThemeContext";
import * as React from "react";

export const wrapRootElement: GatsbyBrowser["wrapRootElement"] = ({
  element,
}) => {
  return React.createElement(ThemeProvider, null, element);
};
