import request from '@/utils/request'

// 预案库信息列表
export function plansList(data) {
  return request({
    url: '/library/pageQuery',
    method: 'post',
    data,
  })
}

// 预案库管理

// 物资保障列表
export function materialList(data) {
    return request({
      url: '/material/queryEmergencyMaterials',
      method: 'post',
      data,
    })
}

// 人员保障列表
export function floodheadList(data) {
    return request({
      url: '/floodhead/queryPersonGuarantee',
      method: 'post',
      data,
    })
}


// 组织机构
export function organizationList(data) {
    return request({
      url: '/organization/pageQuery',
      method: 'post',
      data,
    })
}

// 组织机构树
export function getOrganizeTree() {
    return request({
      url: '/organization/getOrganizeTree',
      method: 'get',
    })
}

// 物资类型
export function materialType() {
    return request({
      url: '/material/pageQuery',
      method: 'post',
    })
}