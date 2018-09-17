import React from 'react'
import { withRouter } from 'react-router-dom'
import styles from './styles.module.scss'
import Link from 'gatsby-link'
import GitHubLogo from '@fortawesome/fontawesome-free/svgs/brands/github.svg'
import LinkedInLogo from '@fortawesome/fontawesome-free/svgs/brands/linkedin.svg'

const NavLink = withRouter(({ location, children, to }) => {
  const classNames = [
    'nav-link',
    location.pathname !== to ? '' : 'active',
    styles.navLink
  ].join(' ')

  return (
    <li className='nav-item'>
      <Link className={classNames} to={to}>
        {children}
      </Link>
    </li>
  )
})

const Header = ({ siteTitle }) => (
  <header className={[styles.header, 'container fixed-top pt-3 pb-2'].join(' ')}>
    <a className={[styles.gitHubLogo, 'd-none d-md-inline'].join(' ')} href='https://github.com/inglkruiz' target='_blank'>
      <GitHubLogo />
    </a>
    <a className={[styles.linkedInLogo, 'd-none d-md-inline'].join(' ')} href='https://www.linkedin.com/in/inglkruiz/' target='_blank'>
      <LinkedInLogo />
    </a>
    <h1 className={[styles.headerTitle, 'text-center mb-1'].join(' ')}>
      Luis Carlos Ruiz Delgado
    </h1>
    <p className={[styles.headerInfo, 'text-center mb-2'].join(' ')}>
      <span className='d-none d-md-inline'>Location: </span>Guatemala City | <span className='d-none d-md-inline'>Phone: </span>+50235249629 | <span className='d-none d-md-inline'>Email: </span>ing.lkruiz@gmail.com
    </p>
    <nav>
      <ul className='nav nav-pills nav-fill'>
        <NavLink to='/'>
          Home
        </NavLink>
        <NavLink to='/resume'>
          Resume
        </NavLink>
        <NavLink to='#'>
          Blog
        </NavLink>
      </ul>
    </nav>
  </header>
)

export default Header
