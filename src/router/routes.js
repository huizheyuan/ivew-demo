import Menu from '@/components/mainMenu'

// actName: 详情页添加

const routes = [
    {
        path: '/login',
        name: 'login',
        meta: {
            title: '登录',
            hideInMenu: true
        },
        component: () => import('@/views/login')
    },
    {
        path: '/register',
        name: 'register',
        meta: {
            title: '注册',
            hideInMenu: true
        },
        component: () => import('@/views/register')
    },
    {
        path: '/',
        name: '_home',
        redirect: '/home',
        meta: {
            title: '个人主页',
            icon: 'ios-contact',
            hideInMenu: false
        },
        component: Menu,
        children: [{
            path: '/home',
            name: 'home',
            meta: {
                title: '个人主页',
                hideInMenu: false
            },
            component: () => import('@/views/home')
        }]
    },
    {
        path: '/activity',
        name: 'activity',
        meta: {
            title: '社区活动',
            icon: 'ios-paper',
            hideInMenu: false
        },
        component: Menu,
        children: [
            {
                path: '/activity/indoor',
                name: 'indoor',
                meta: {
                    title: '室内活动',
                    icon: 'ios-create',
                    hideInMenu: false
                },
                component: () => import('@/views/activity/indoor')
            },
            {
                path: '/activity/outdoor',
                name: 'outdoor',
                meta: {
                    title: '室外活动',
                    icon: 'ios-create',
                    hideInMenu: false
                },
                component: () => import('@/views/activity/outdoor')
            }
        ]
    },
    {
        path: '/parking',
        name: 'parking',
        meta: {
            title: '停车位管理',
            icon: 'ios-paper',
            hideInMenu: false
        },
        component: Menu,
        children: [
            {
                path: '/parking/partition',
                name: 'partition',
                meta: {
                    title: '分区',
                    icon: 'ios-create',
                    hideInMenu: false
                },
                component: () => import('@/views/parking/partition')
            },
            {
                path: '/parking/monitor',
                name: 'monitor',
                meta: {
                    title: '停车场监控',
                    icon: 'ios-create',
                    hideInMenu: false
                },
                component: () => import('@/views/parking/monitor')
            },
            {
                path: '/parking/monitor/detail',
                name: 'monitorDetail',
                meta: {
                    title: '监控详情',
                    hideInMenu: true,
                    actName: 'monitor'
                },
                component: () => import('@/views/parking/monitor/detail')
            }
        ]
    },
    {
        path: '/chargeManagement',
        name: 'chargeManagement',
        meta: {
            title: '收费管理',
            icon: 'ios-paper',
            hideInMenu: false
        },
        component: Menu,
        children: [
            {
                path: '/chargeManagement/chargeItems',
                name: 'chargeItems',
                meta: {
                    title: '收费项目',
                    icon: 'ios-create',
                    hideInMenu: false
                },
                component: () => import('@/views/chargeManagement/chargeItems')
            },
            {
                path: '/chargeManagement/chargeRecords',
                name: 'chargeRecords',
                meta: {
                    title: '收费记录',
                    icon: 'ios-create',
                    hideInMenu: false
                },
                component: () => import('@/views/chargeManagement/chargeRecords')
            },
        ]
    },
    {
        path: '/401',
        name: 'error_401',
        meta: {
            hideInMenu: true
        },
        component: () => import('@/views/error-page/401.vue')
    },
    {
        path: '*',
        name: 'error_404',
        meta: {
            hideInMenu: true
        },
        component: () => import('@/views/error-page/404.vue')
    },
    {
        path: '/500',
        name: 'error_500',
        meta: {
            hideInMenu: true
        },
        component: () => import('@/views/error-page/500.vue')
    }
]

export default routes