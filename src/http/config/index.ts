// export const BASE_URL: string = 'http://codercba.com:8000'
let BASE_URL: string = ''
if (import.meta.env.VITE_APP_USE_MOCK) {
  BASE_URL = import.meta.env.VITE_APP_MOCK_BASEURL
} else {
  BASE_URL = import.meta.env.VITE_APP_API_BASEURL
}
export const TIME_OUT = 10000
export { BASE_URL }
