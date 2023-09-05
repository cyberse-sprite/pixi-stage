import request from './request'

export const ApiGetExhi = (id: any) => {
    return request({
        url: `/exhi/${id}`,
        method: 'get',
        params: { id }
    })
}

export const ApiGetUser = (id: any) => {
    return request({
        url: `/user/${id}`,
        method: 'get',
        params: { id }
    })
}

export const ApiGetBooth = (id: any) => {
    return request({
        url: `/booth/${id}`,
        method: 'get',
        params: { id }
    })
}

export const ApiGetMap = (id: any) => {
    return request({
        url: `/map/${id}`,
        method: 'get',
        params: { id }
    })
}

export const ApiGetScript = (id: any) => {
    return request({
        url: `/script/${id}`,
        method: 'get',
        params: { id }
    })
}