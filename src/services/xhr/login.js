import xhrFetch from "utils/xhrFetch"

export function login(params) {
  return xhrFetch.get({
    url: "/api/ticket11",
    queryString: params,
  })
}
