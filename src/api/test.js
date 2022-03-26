// 对于axios进行二次封装
import axios from 'axios'
// 引入进度条
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'

// 1.利用axios对象的方法create，去创建一个axios实例
// 2.request就是axios，只不过稍微配置一下
const test = axios.create({
    // 配置对象
    // 基础路径，requests发出的请求在端口号后面会跟改baseURl
    baseURL: '/test',
    timeout: 5000
})
// 请求拦截器：

test.interceptors.request.use((config) => {
    // 在发送请求之前做些什么
    nprogress.start()
    return config
})

// 响应拦截器
test.interceptors.response.use((res) => {
    // 成功的回调
    nprogress.done()
    return res.data
}, (error) => {
    // 失败的回调函数
    nprogress.done()
    return Promise.reject(error)
})

// 对外暴露
export default test
