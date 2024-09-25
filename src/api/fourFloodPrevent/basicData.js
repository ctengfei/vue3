import request from '@/utils/request'

// 新增列表
export function addList(data) {
  return request({
    url: '/resbase/add',
    method: 'post',
    data,
  })
}
// 查询列表
export function getList(data) {
    return request({
      url: '/resbase/pageQuery',
      method: 'post',
      data,
    })
}
// 获取详情 
export function getDetail(params) {
    return request({
      url: '/resbase/getDetailById',
      method: 'get',
      params,
    })
}
// 编辑
export function editList(data) {
    return request({
      url: '/resbase/update',
      method: 'put',
      data,
    })
}

// 删除
export function deleteData(id) {
    return request({
      url: '/resbase/' + id,
      method: 'delete',
    })
}

// 公共请求
// get请求
export function getRequest(url, params) {
    return request({
        url,
        method: 'get',
        params
    })
}
// post请求
export function postRequest(url, data) {
    return request({
        url,
        method: 'post',
        data
    })
}
// put请求
export function putRequest(url, data) {
    return request({
        url,
        method: "put",
        data
    })
}
// delete请求
export function deleteRequest(url) {
    return request({
        url,
        method: 'delete',
    })
}
