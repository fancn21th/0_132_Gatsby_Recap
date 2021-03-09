const axios = require("axios")

const service = axios.create({
  timeout: 50000, // 请求超时时间
})

// response 拦截器
// service.interceptors.response.use(
//   response => {
//     return response.data
//   },
//   error => {
//     return Promise.reject(error)
//   }
// )

const getFetch = (httpMethod = "get") => ({
  url,
  data,
  queryString,
  // baseUrl,
}) => {
  return service({
    method: httpMethod,
    url: url,
    data,
    params: queryString,
    // headers: {
    //   Authorization: getToken() || "",
    // },
  })
}

const fetch = {
  get: getFetch("get"),
  post: getFetch("post"),
}

export default fetch
