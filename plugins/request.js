import axios from 'axios'

export const request = axios.create({
  baseURL: 'https://conduit.productionready.io',
})

export default ({ store }) => {
  // 请求拦截器
  // 我们可以在请求拦截器中做一些公共的业务处理例如统一设置token
  request.interceptors.request.use(
    (config) => {
      const {user} = store.state
      if(user && user.token){
        config.headers.Authorization = `Token ${user.token}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
}
