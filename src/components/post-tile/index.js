import React from "react"
import { rhythm } from "../../utils/typography"
import { Link } from "gatsby"

export default function PostTile({ post }) {
  return (
    <article>
      <header>
        <h3
          style={{
            marginBottom: rhythm(1 / 4),
          }}
        >
          <Link to={post.slug}>{post.title}</Link>
        </h3>
        <small>{post.date}</small> - {post.readingTime}
      </header>
      <section>
        <p
          dangerouslySetInnerHTML={{
            __html: post.description,
          }}
        />
      </section>
    </article>
  )
}
