// TODO: remove react-helmet and gatsby-plugin-react-helmet and replace
// it with the async version of both. This should fix the browser
// console warnings about the componentWillMount function
// https://github.com/gatsbyjs/gatsby/issues/17865#issuecomment-559141860

module.exports = {
  siteMetadata: {
    title: "The Lantern",
    description: "Bringing you closer to the Word of God",
    author: "@ryexley"
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images`
      }
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "gatsby-starter-default",
        short_name: "starter", // eslint-disable-line camelcase
        start_url: "/", // eslint-disable-line camelcase
        background_color: "#663399", // eslint-disable-line camelcase
        theme_color: "#663399", // eslint-disable-line camelcase
        display: "minimal-ui",
        icon: "src/images/gatsby-icon.png" // This path is relative to the root of the site.
      }
    },
    {
      resolve: "gatsby-plugin-postcss",
      options: {
        postCssPlugins: [
          require("postcss-nested")({})
        ]
      }
    },
    "gatsby-plugin-astroturf",
    {
      resolve: "gatsby-plugin-create-client-paths",
      options: {
        prefixes: ["/lantern/*"]
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ]
}
