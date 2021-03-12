const path = require("path")

const axios = require("axios")

const get = endpoint => axios.get(`${process.env.API_BASE_URL}${endpoint}`)

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
  })
}

exports.createPages = async ({ actions: { createPage } }) => {
  const {
    data: { content: allProducts },
  } = await get("/agentProducts")

  allProducts.forEach(product => {
    createPage({
      path: `/foo/${product.chineseName}`,
      component: require.resolve("./src/templates/foo.js"),
      context: { product },
    })
  })
}
