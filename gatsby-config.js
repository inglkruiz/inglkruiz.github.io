module.exports = {
  siteMetadata: {
    title: "WhateverJS Blog",
    author: "Luis C. Ruiz",
    description:
      "Luis Carlos Ruiz Delgado. Proactive & disciplined Senior Software Engineer with rock-solid programming skills in JavaScript/Typescript.",
    siteUrl: "https://inglkruiz.github.io/",
    social: {
      twitter: "LkRuiZ",
      linkedIn: "inglkruiz",
    },
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content/blog`,
        name: "blog",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content/assets`,
        name: "assets",
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: "gatsby-remark-responsive-iframe",
            options: {
              wrapperStyle: "margin-bottom: 1.0725rem",
            },
          },
          {
            resolve: "gatsby-remark-prismjs",
            options: {
              // Customize the prompt used in shell output
              // Values below are default
              prompt: {
                user: "inglkruiz",
                host: "localhost",
                global: true,
              },
            },
          },

          "gatsby-remark-copy-linked-files",
          "gatsby-remark-smartypants",
          "gatsby-remark-reading-time",
        ],
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    "gatsby-plugin-feed",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "WhateverJS Blog",
        short_name: "WhateverJS",
        start_url: "/",
        background_color: "#ffffff",
        theme_color: "#663399",
        display: "minimal-ui",
        icon: "content/assets/js-icon.png",
      },
    },
    "gatsby-plugin-offline",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: "src/utils/typography",
      },
    },
  ],
}
