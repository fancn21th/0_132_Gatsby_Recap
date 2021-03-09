import * as React from "react"
// import { Link } from "gatsby"
// import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
// import SEO from "../components/seo"

import services from "services"

const { openChat } = services

const { useEffect } = React

const IndexPage = () => {
  useEffect(() => {}, [])

  const onContactWith = () => {
    openChat("fanyjb")
  }

  return (
    <Layout>
      <button onClick={onContactWith}>fanyjb</button>
    </Layout>
  )
}

export default IndexPage
