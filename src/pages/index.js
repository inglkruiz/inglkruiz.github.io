import { graphql } from "gatsby"
import React from "react"

import Bio from "../components/bio"
import Layout from "../components/layout"
import PostTile from "../components/post-tile"
import Seo from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={location} title={siteTitle}>
      <Bio />
      {posts.map(({ node }) => {
        return (
          <PostTile
            key={node.fields.slug}
            post={{
              title: node.frontmatter.title || node.fields.slug,
              slug: node.fields.slug,
              date: node.frontmatter.date,
              description: node.frontmatter.description || node.excerpt,
              readingTime: node.fields.readingTime.text,
            }}
          />
        )
      })}
    </Layout>
  )
}

export default BlogIndex

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="All posts" />

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
            readingTime {
              text
            }
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
