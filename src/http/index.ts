import RYRequest from './request'
import { BASE_URL, TIME_OUT } from './config'
const ryRequest = new RYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
})

export default ryRequest
