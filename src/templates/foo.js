import React from "react"

export default function Product({
  pageContext: {
    product: { chineseName },
  },
}) {
  return <h1>{chineseName}</h1>
}
