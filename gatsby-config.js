module.exports = {
  siteMetadata: {
    title: 'inglkruiz.GitHub.io',
    author: 'inglkruiz',
    description: 'Luis Carlos Ruiz Delgado. Proactive & disciplined Senior Frontend Web Developer with rock-solid programming skills in JavaScript and latest web technologies',
    keywords: 'inglkruiz, lkruiz, luis ruiz, senior frontend developer'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages'
      }
    },
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        precision: 8
      }
    },
    'gatsby-plugin-react-svg'
  ]
}
