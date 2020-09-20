import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query rootQuery {
      site {
        siteMetadata {
          title
        }
      }
      fileName: file(relativePath: { eq: "white.png" }) {
        childImageSharp {
          fluid(maxWidth: 400, maxHeight: 250) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <>
      <div className={'h-full'}>
      <Header siteTitle={data.site.siteMetadata.title} />
        <main className={'h-full m-40'}>{children}</main>
      <footer>
      </footer>
    </div>
  </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
