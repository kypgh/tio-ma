import { Inter } from "@next/font/google";
import { createGlobalStyle } from "styled-components";
const inter = Inter({ subsets: ["latin"], display: "swap" });

const GlobalStyle = createGlobalStyle`
  html,
  body {
    background: ${({ theme }) => theme.colors.mainBgColor};
    padding: 0;
    margin: 0;
    font-family: ${inter.style.fontFamily};
  }
  * {
    box-sizing: border-box;
  }
  a {
    color: inherit;
    text-decoration: none;
  }

  p {
    margin-block-start: 0;
    margin-block-end: 0;
  }
  #tooltipsContainer {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99999;
  }

  // hide image from live chat
  #wo_online_image {
    display: none !important;
  }
 `;

export default GlobalStyle;
