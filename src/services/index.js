import { default as xhr } from "./xhr"
import { default as mock } from "./mock"
import { default as weixin } from "./weixin"

const useMock = false

const services = {
  ...xhr,
  ...weixin,
}
const mockServices = {
  ...mock,
}

// TODO: remove in prod
console.log(services)

export default useMock ? mockServices : services
