import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import logo from "../../public/logo.png"

const Header = ({ siteTitle }) => (
  <header
    className={"top-0 inset-x-0 z-50"}
    style={{
      marginBottom: `1.45rem`,
    }}
  >

  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
