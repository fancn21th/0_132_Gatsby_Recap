import { default as xhr } from "./xhr"
import { default as mock } from "./mock"

const useMock = false

const services = {
  ...xhr,
}
const mockServices = {
  ...mock,
}

console.log(services)

export default useMock ? mockServices : services
