// const TOKEN_KEY = 'TOKEN1'
export const setToken = (token)=>{
    localStorage.setItem('TOKEN1', token)
}

export const getToken = ()=>{
    const token = localStorage.TOKEN1 || ''
    if (token) return token
    else return false
}

export const findIndexById = (id, arr)=>{
    return arr.findIndex((value, index) => {
        return value.id === id
    })
}

export const getNextRoute = (list, route) => {
    let res = {}
    if (list.length === 2) {
        res = getHomeRoute(list)
    } else {
        const index = list.findIndex(item => routeEqual(item, route))
        if (index === list.length - 1) res = list[list.length - 2]
        else res = list[index + 1]
    }
    return res
}

export const getHomeRoute = (routers, homeName = 'home') => {
    let i = -1
    let len = routers.length
    let homeRoute = {}
    while (++i < len) {
        let item = routers[i]
        if (item.children && item.children.length) {
            let res = getHomeRoute(item.children, homeName)
            if (res.name) return res
        } else {
            if (item.name === homeName) homeRoute = item
        }
    }
    return homeRoute
}

export const routeEqual = (route1, route2) => {
    const params1 = route1.params || {}
    const params2 = route2.params || {}
    const query1 = route1.query || {}
    const query2 = route2.query || {}
    return (route1.name === route2.name) && objEqual(params1, params2) && objEqual(query1, query2)
}

export const objEqual = (obj1, obj2) => {
    const keysArr1 = Object.keys(obj1)
    const keysArr2 = Object.keys(obj2)
    if (keysArr1.length !== keysArr2.length) return false
    else if (keysArr1.length === 0 && keysArr2.length === 0) return true
    else return !keysArr1.some(key => obj1[key] != obj2[key])
}

export const routeHasExist = (tagNavList, routeItem) => {
    let len = tagNavList.length
    let res = false
    doCustomTimes(len, (index) => {
      if (routeEqual(tagNavList[index], routeItem)) res = true
    })
    return res
}

/**
 * @param {Number} times 回调函数需要执行的次数
 * @param {Function} callback 回调函数
 */
export const doCustomTimes = (times, callback) => {
    let i = -1
    while (++i < times) {
        callback(i)
    }
}

export const getRouteTitleHandled = (route) => {
    let router = { ...route }
    let meta = { ...route.meta }
    let title = ''
    if (meta.title) {
      if (typeof meta.title === 'function') title = meta.title(router)
      else title = meta.title
    }
    meta.title = title
    router.meta = meta
    return router
}

export const setTagNavListInSessionstorage = list => {
    // sessionStorage.tagNaveList = JSON.stringify(list)
    localStorage.tagNaveList = JSON.stringify(list)
}

export const getTagNavListFromSessionstorage = () => {
    // const list = sessionStorage.tagNaveList
    const list = localStorage.tagNaveList
    return list ? JSON.parse(list) : []
}

// 得到两个数组的并集, 两个数组的元素为数值或字符串
export const getUnion = (arr1, arr2) => {
    return Array.from(new Set([...arr1, ...arr2]))
}

/**
 * @param {*} list 现有标签导航列表
 * @param {*} newRoute 新添加的路由原信息对象
 * @description 如果该newRoute已经存在则不再添加
 */
export const getNewTagList = (list, newRoute) => {
    const { name, path, meta } = newRoute
    let newList = [...list]
    if (newList.findIndex(item => item.name === name) >= 0) return newList
    else newList.push({ name, path, meta })
    return newList
}

export function findRouteByName(arr, name) {
    let result = undefined;
    arr.forEach(e => {
        if (e.name === name) {
            result = e
        } else if (e.children) {
            result = findRouteByName(e.children, name)
        }
    })
    return result;
}

