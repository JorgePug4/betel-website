import type { GatsbyConfig } from "gatsby";

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

const siteUrl = process.env.GATSBY_SITE_URL || "https://comunidadbetel.org";

const config: GatsbyConfig = {
  siteMetadata: {
    title: "Comunidad Bet-el Casa Abierta",
    titleTemplate: "%s | Bet-el Casa Abierta",
    description:
      "Comunidad cristiana juvenil que proclama el Kerigma, forma discípulos y camina con Cristo a través de retiros espirituales y formación.",
    siteUrl,
    image: "/og-image.jpg",
    lang: "es",
    locale: "es_ES",
    twitterUsername: "@comunidadbetel",
    author: "Comunidad Bet-el Casa Abierta",
    keywords: [
      "comunidad cristiana juvenil",
      "retiros espirituales",
      "evangelización",
      "Kerigma",
      "discípulos de Cristo",
      "Bet-el Casa Abierta",
      "Espíritu Santo",
      "jóvenes cristianos",
    ],
  },
  graphqlTypegen: true,
  trailingSlash: "always",
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/assets`,
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Comunidad Bet-el Casa Abierta",
        short_name: "Bet-el",
        start_url: "/",
        background_color: "#0A1628",
        theme_color: "#00AEEF",
        display: "standalone",
        icon: "src/assets/logo.png",
      },
    },
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        output: "/sitemap",
      },
    },
  ],
};

export default config;
