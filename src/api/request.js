/*
 * @Author: zhilutianji
 * @Date: 2022-01-02 19:03:55
 * @LastEditors: zhilutianji
 * @LastEditTime: 2022-01-02 19:03:55
 * @Description: file content
 * @FilePath: \shops_frontend_web\src\api\request.js
 */
/*
 * @Author: zhilutianji
 * @Date: 2021-12-31 13:18:11
 * @LastEditors: zhilutianji
 * @LastEditTime: 2022-01-01 23:14:10
 * @Description: file content
 * @FilePath: \app\src\api\request.js
 */
//对于axios进行二次封装
import axios from 'axios'
//引入进度条
import nprogress from 'nprogress';
//引入进度条样式
import 'nprogress/nprogress.css';

//1.利用axios对象的方法create，去创建一个axios实例
//2.request就是axios，只不过稍微配置一下
const requests = axios.create({
    //配置对象
    //基础路径，requests发出的请求在端口号后面会跟改baseURl
    baseURL:'/api',
    timeout: 5000,
})
//请求拦截器：

requests.interceptors.request.use((config)=>{
    // 在发送请求之前做些什么
    //进度条开始
    nprogress.start();
    return config;
})

//响应拦截器
requests.interceptors.response.use((res) => {
    //成功的回调
    //进度条结束
    nprogress.done()
    return res.data;
}, (error) => {
    //失败的回调函数
    console.log("响应失败" + error)
    return Promise.reject(new Error('fail'))
})



//对外暴露
export default requests