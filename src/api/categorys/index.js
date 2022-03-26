// 当前模块，API进行统一管理，即对请求接口统一管理
import test from '@/api/test'
// 首页三级分类接口
export const reqCateGoryList = () => {
    return test({
        url: '/api/product/getBaseCategoryList',
        method: 'GET'
    })
}
