import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Header from '../components/Header'
import '../sass/bootstrap.scss'
import styles from './styles.module.scss'

const Layout = ({ children, data }) => {
  const { title, keywords, description, author } = data.site.siteMetadata
  return (
    <div>
      <Helmet
        title={title}
        meta={[
          { name: 'description', content: description },
          { name: 'keywords', content: keywords },
          { name: 'author', content: author }
        ]}
      >
        <link rel='icon' type='image/x-icon' class='js-site-favicon' href='https://assets-cdn.github.com/favicon.ico' />
        <link href='https://fonts.googleapis.com/css?family=Quattrocento+Sans:400,400i,700|Work+Sans:600' rel='stylesheet' />
      </Helmet>
      <Header />
      <main className={['container pt-1 pt-md-3', styles.main].join(' ')}>
        {children()}
      </main>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.func
}

export default Layout

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title,
        description,
        author,
        keywords
      }
    }
  }
`
