import request from '@/utils/request';

// 雨情预警
// 查询列表
export function getRainWarnList(data) {
    return request({
        url: '/warnrule/queryRainWarn',
        method: 'post',
        data,
    })
}
// 编辑表
export function updateRainWarn(data) {
    return request({
        url: '/warnrule/updateRainWarn',
        method: 'put',
        data,
    })
}

// 水情预警
// 查询列表
export function getRegimenWarnList(data) {
    return request({
        url: '/warnrule/queryRegimenWarn',
        method: 'post',
        data,
    })
}
// 编辑表
export function updateRegimenWarn(data) {
    return request({
        url: '/warnrule/updateRegimenWarn',
        method: 'put',
        data,
    })
}

// 预泄洪预警
// 查询列表
export function getDischargeWarnList(data) {
    return request({
        url: '/warnrule/queryDischargeWarn',
        method: 'post',
        data,
    })
}
// 编辑表
export function updateDischargeWarn(data) {
    return request({
        url: '/warnrule/updateDischargeWarn',
        method: 'put',
        data,
    })
}

// 预警发布
export function addWarnpublish(data) {
    return request({
        url: '/warnpublish/add',
        method: 'post',
        data,
    })
}







