import axios from "axios";

const http = axios.create({
  baseURL: "http://geek.itheima.net/v1_0",
  timeout: 5000,
});

http.interceptors.request.use(
  (config) => {
    // 拦截请求
    // 1.获取token
    const token = window.localStorage.getItem("token");
    // 2.判断token是否存在
    if (token) {
      // 3.设置token到请求头
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(config)
    return config;
  }, 
  (error) => {
    return Promise.reject(error);
  }
)

http.interceptors.response.use(
  (response) => {
    // 拦截响应
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
)

export default http;