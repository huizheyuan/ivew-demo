import {
    setTagNavListInSessionstorage,
    getTagNavListFromSessionstorage,
    routeHasExist,
} from '@/libs/utils'
const homeName = 'home'
  
export default {
    state: {
        tagNavList: [{
            id: 1,
            name: 'home',
            params: {},
            query: {},
            meta: {
                title: '个人主页'
            }
        },
        // {
        //     id: 2,
        //     name: 'partition',
        //     params: {},
        //     query: {},
        //     meta: {
        //         title: '分区'
        //     }
        // }
        ],
    },
    getters: {},
    mutations: {
        setTagNavList (state, list) {
            let tagList = []
            if (list) {
                tagList = [...list]
            } else tagList = getTagNavListFromSessionstorage() || []
            if (tagList[0] && tagList[0].name !== homeName) tagList.shift()

            let homeTagIndex = tagList.findIndex(item => item.name === homeName)
            if (homeTagIndex > 0) {
                let homeTag = tagList.splice(homeTagIndex, 1)[0]
                tagList.unshift(homeTag)
            }

            state.tagNavList = tagList
            setTagNavListInSessionstorage([...tagList])
        },
        addTag (state, { route, type = 'unshift' }) {
            if (!routeHasExist(state.tagNavList, route)) {
                if (type === 'push') state.tagNavList.push(route)
                else {
                    if (route.name === homeName) state.tagNavList.unshift(route)
                    else state.tagNavList.splice(1, 0, route)
                }
                setTagNavListInSessionstorage([...state.tagNavList])
            }
        },
    },
    actions: {}
}
