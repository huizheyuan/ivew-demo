<template>
<Layout style="height: 100%" class="main">
    <Sider 
        ref="side" 
        collapsible 
        :collapsed-width="64" 
        v-model="isCollapsed" 
        hide-trigger
        class="left-sider"
        :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'hidden'}"
    >
        <div class="logo-con">
          <img v-show="!isCollapsed" :src="maxLogo" key="max-logo" />
          <img v-show="isCollapsed" :src="minLogo" key="min-logo" />
        </div>
        <Menu 
            v-show="!isCollapsed" 
            :theme="theme" 
            :active-name="activeName"
            :open-names="openedNames"
            accordion 
            ref="menu"
            width="auto"
            :class="menuitemClasses"
            @on-select="selectMenu"
        >
            <div v-for="menu in menuList" :key="menu.name">
                <div v-if="menu.children && menu.children.length===1">
                    <MenuItem :name="menu.children[0].name">
                        <Icon :type="menu.meta.icon" />
                        <span>{{menu.children[0].meta.title}}</span>
                    </MenuItem>
                </div>
                <div v-else-if="menu.children">
                    <Submenu v-if="!menu.meta.hideInMenu" :name="menu.name">
                        <template slot="title">
                            <Icon :type="menu.meta.icon" />
                            <span>{{menu.meta.title}}</span>
                        </template>
                        <div v-for="menuchild in menu.children" :key="menuchild.name">
                            <MenuItem v-if="!menuchild.meta.hideInMenu" :name="menuchild.name">
                                <Icon :type="menuchild.meta.icon" />
                                <span>{{menuchild.meta.title}}</span>
                            </MenuItem>
                        </div>
                    </Submenu>
                </div>
            </div>
        </Menu>
        <div v-show="isCollapsed">
            盛大开放花瓣
        </div>
    </Sider>
    <Layout :style="{marginLeft: layoutLeft}">
        <Header class="layout-header-bar"  :style="{padding: 0, position: 'fixed', zIndex: 9999}">
            <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
            <Dropdown @on-click="handleDropdown" class="userInfo fr pointer">
                显示用户名
                <DropdownMenu slot="list">
                    <DropdownItem 
                        v-for="item in dropdownItem" 
                        :key="item.id" 
                        :name="item.id"
                    >{{item.title}}</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </Header>
        <Content class="main-content-con" :style="{margin: '64px 0 20px'}">
            <div :style="{margin: '16px 0', cursor: 'pointer'}">
                <Tag 
                    v-for="tag in tagList" 
                    :key="tag.id" type="dot" 
                    :name="tag.id"
                    :closable="tag.name !== 'home'" 
                    :color="isCurrentTag(tag) ? 'primary':'default'"
                    @click.native="handleSelectTag(tag)"
                    @on-close="handleCloseTag(tag)"
                >{{tag.meta.title}}</Tag>
            </div>
            <Card style="margin: 0 20px">
                <div class="mainContent" style="height: 80vh; overflow-y: scroll;"><router-view/></div>
            </Card>
        </Content>
    </Layout>
</Layout>
</template>

<script>
import menu from '../../router'
import { setToken, findIndexById, getNextRoute, routeEqual, getUnion, getNewTagList, findRouteByName } from '@/libs/utils'
import { mapMutations } from 'vuex'
import { Time } from 'view-design'
import minLogo from '@/assets/image/min-logo.png'
import maxLogo from '@/assets/image/max-logo.png'
export default {
    name: 'mainMenu',
    computed: {
        tagList () {
            return this.$store.state.app.tagNavList
        },
        rotateIcon () {
            return [
                'menu-icon',
                this.isCollapsed ? 'rotate-icon' : ''
            ];
        },
        menuitemClasses () {
            return [
                'menu-item',
                this.isCollapsed ? 'collapsed-menu' : ''
            ]
        },
        layoutLeft () {
            return this.isCollapsed ? '64px' : '200px'
        }
    },
    data () {
        return {
            theme: 'dark',
            minLogo,
            maxLogo,
            isCollapsed: false,
            activeName: this.$route.meta.actName ? this.$route.meta.actName : this.$route.name,
            openedNames: [],
            dropdownItem: [
                {
                    id: 1,
                    title: '个人信息'
                },
                {
                    id: 2,
                    title: '退出登录'
                }
            ],
            menuList: menu.options.routes,
        }
    },
    mounted() {
        this.setTagNavList(this.tagList)
        this.addTag({ route: this.$route })
    },
    watch: {
        $route (newRoute) {
            const { name, query, params, meta } = newRoute
            this.addTag({
                route: { name, query, params, meta },
                type: 'push'
            })
            this.activeName = newRoute.meta.actName ? newRoute.meta.actName : newRoute.name
            this.openedNames.splice(0,1,newRoute.matched[0].name)
        },
        openedNames () {
            this.$nextTick(() => {
                if (this.$refs.menu) {
                    this.$refs.menu.updateOpened()
                }
            })
        }
    },
    methods: {
        ...mapMutations([
            'setTagNavList',
            'addTag'
        ]),
        collapsedSider () {
            this.$refs.side.toggleCollapse();
        },
        handleDropdown(name) {
            switch (name) {
                case 1:
                    // 个人信息跳转
                    setTimeout(() => {
                        this.$router.push({name: 'indoor'})
                    }, 1000);
                    break;
                case 2:
                    // 退出
                    setToken('')
                    setTimeout(() => {
                        this.$router.push({name: 'login'})
                    }, 1000);
                    break;
                default:
                    break;
            }
        },
        selectMenu(name) {
            this.turnToPage(name)
        },
        handleCloseTag(item) {
            const nextRoute = getNextRoute(this.tagList, item)
            let res = this.tagList.filter(e => !routeEqual(item, e))
            if (this.isCurrentTag(item)) {
                this.$router.push(nextRoute)
            }
            this.setTagNavList(res)
        },
        handleSelectTag(item) {
            // 点击tag，跳转路由，主菜单变化
            this.turnToPage(item)
        },
        turnToPage(route) {
            let { name, params, query } = {}
            if (typeof route === 'string') name = route
            else {
                name = route.name
                params = route.params
                query = route.query
            }
            this.$router.push({
                name,
                params,
                query
            })
        },
        isCurrentTag (item) {
            return routeEqual(this.$route, item)
        }
    }
}
</script>

<style lang="less" scoped>
.main {
    .mainContent {
        overflow-y: scroll;
        &::-webkit-scrollbar {/*滚动条整体样式*/
            width: 6px;
            cursor: pointer;
        }
        &::-webkit-scrollbar-thumb {/*滚动条里的小方块*/
            border-radius: 10px;
            box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            background: #dcdee2;
        }
    }
    .logo-con {
        height: 64px;
        padding: 10px;
        img{
            height: 44px;
            width: auto;
            display: block;
            margin: 0 auto;
        }
    }
    
    .left-sider{
        .ivu-layout-sider-children{
            overflow-y: scroll;
            margin-right: -18px;
            height: 100%;
        }
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
        padding: 0 20px;
        width: 100%;
    }
    .main-content-con {
        height: ~"calc(100% - 60px)";
        overflow: hidden;
    }
    .menu-icon{
        transition: all .3s;
    }
    .rotate-icon{
        transform: rotate(-90deg);
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 80%;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
}
</style>
