/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { graphql, useStaticQuery } from "gatsby"
import React from "react"

import { rhythm } from "../utils/typography"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
          }
          social {
            linkedIn
          }
        }
      }
    }
  `)

  const { author, social } = data.site.siteMetadata
  return (
    <div
      style={{
        marginBottom: rhythm(2.5),
      }}
    >
      <p>
        Written by <strong>{author.name}</strong>. A proactive and disciplined
        Sr. Software Engineer (Full-stack Web Developer) with rock-solid
        programming skills in Javascript/Typescript.
        <a
          style={{ textAlign: `right`, display: `block` }}
          href={`https://www.linkedin.com/in/${social.linkedIn}`}
        >
          Read more about me on LinkedIn.
        </a>
      </p>
    </div>
  )
}

export default Bio
