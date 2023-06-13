// Set config defaults when creating the instance
import axios from "axios";
const myAxios = axios.create({
    // baseURL: 'http://localhost:8080/api'   //这里设置的地址前端和后端都必须是localhost（同域名才行，不然后端不能成功植入cookie）
    baseURL: 'http://user-java.linhaijian.top/api'
});

// TODO:为什么加了这个注解之后发送请求爆红，目标：为了让请求发送时自动携带cookie
// 答：这里设置的地址前端和后端都必须是localhost（同域名才行，不然后端不能成功植入cookie）
myAxios.defaults.withCredentials = true  //默认携带请求凭证 Cookie

//拦截器
// 添加请求拦截器
myAxios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
// myAxios.interceptors.response.use(function (response) {
//     // 对响应数据做点什么
//     return response.data;
// }, function (error) {
//     // 对响应错误做点什么
//     return Promise.reject(error);
// });
myAxios.interceptors.response.use(function (response) {
    // 未登录则跳转到登录页
    if (response?.data?.code === 40101) {
        const redirectUrl = window.location.href;
        window.location.href = `/user/login?redirect=${redirectUrl}`;
    }
    // Do something with response data
    return response.data;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});
export default myAxios
