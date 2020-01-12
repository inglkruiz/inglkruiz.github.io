import Typography from "typography"
import fairyGatesTheme from "typography-theme-fairy-gates"
import { MOBILE_MEDIA_QUERY } from "typography-breakpoint-constants"

fairyGatesTheme.overrideThemeStyles = ({ rhythm }) => {
  const linkColor = "#3ab159"
  return {
    "body,h1,h2,h3,h4,h5,h6,blockquote": {
      color: "#dfdfdf",
    },
    a: {
      color: linkColor,
      backgroundImage: "none",
      textShadow: "none",
    },
    "a:hover,a:focus": {
      color: "#61c57b",
    },
    blockquote: {
      borderLeft: `${rhythm(6 / 16)} solid ${linkColor}`,
    },
    [MOBILE_MEDIA_QUERY]: {
      blockquote: {
        borderLeft: `${rhythm(3 / 16)} solid ${linkColor}`,
      },
    },
  }
}

delete fairyGatesTheme.googleFonts

const typography = new Typography(fairyGatesTheme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
