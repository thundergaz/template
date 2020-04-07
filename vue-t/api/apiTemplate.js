import { http } from '@/core/core.module'

// 设置测试环境基础URL
const baseUrl = ''

class Api {

    // 获取树状列表
    tree = (params) => {
        let url = baseUrl + '/questionnaire/page'
        return http.get(url, params)
    }
    // 获取列表
    list = (params) => {
        let url = baseUrl + '/questionnaire/page'
        return http.get(url, params)
    }
    // 查到单个详情
    findOne = (params) => {
        let url = baseUrl + '/exam/question/category/delete/' + params
        return http.get(url)
    }
    // 保存
    save = (params) => {
        let url = baseUrl + '/exam/question/category/save'
        return http.post(url, params)
    }
    // 更新
    update = (params) => {
        let url = baseUrl + '/exam/question/category/update'
        return http.post(url, params)
    }
    // 删除
    delete = (id) => {
        let url = baseUrl + '/exam/question/category/delete/' + id
        return http.get(url)
    }

}

export const __module_name__ = new Api()


