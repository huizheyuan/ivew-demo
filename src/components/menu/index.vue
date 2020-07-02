<template>
<Layout>
    <Sider hide-trigger>
        <div class="title">物业管理系统</div>
        <Menu 
            :theme="theme" 
            :active-name="activeName"
            :open-names="openedNames"
            accordion 
            ref="menu"
            style="height: 100vh; width: 200px" 
            @on-select="selectMenu"
        >
            <div v-for="menu in menuList" :key="menu.name">
                <div v-if="menu.children && menu.children.length===1">
                    <MenuItem :name="menu.children[0].name">
                        <div>{{menu.children[0].meta.title}}</div>
                    </MenuItem>
                </div>
                <div v-else-if="menu.children">
                    <Submenu v-if="!menu.meta.hideInMenu" :name="menu.name">
                        <template slot="title">
                            <Icon type="ios-paper" />
                            {{menu.meta.title}}
                        </template>
                        <div v-for="menuchild in menu.children" :key="menuchild.name">
                            <MenuItem v-if="!menuchild.meta.hideInMenu" :name="menuchild.name">
                                <div>{{menuchild.meta.title}}</div>
                            </MenuItem>
                        </div>
                    </Submenu>
                </div>
            </div>
        </Menu>
    </Sider>
    <Layout>
        <Header>
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
        <Content>
            <div class="tagList">
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
            <div class="content"><router-view/></div>
        </Content>
    </Layout>
</Layout>
</template>

<script>
import menu from '../../router'
import { setToken, findIndexById, getNextRoute, routeEqual, getUnion, getNewTagList, findRouteByName } from '@/libs/utils'
import { mapMutations } from 'vuex'
import { Time } from 'view-design'
export default {
    computed: {
        tagList () {
            return this.$store.state.app.tagNavList
        },
    },
    data () {
        return {
            theme: 'dark',
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
.title {
    height: 64px;
    line-height: 64px;
    color: #b5c1cf;
    text-align: center;
    font-size: 26px;
    font-weight: bold;
}
.userInfo {
    color: #b5c1cf;
    padding: 0 10px;
    &:hover {
        background: #363e4f;
    }
}
.tagList {
    margin: 10px 0;
    &>div{
        cursor: pointer;
    }
}
.content {
    margin: 0 18px;
    padding: 8px;
    min-height: 80vh;
    border-radius: 5px;
    box-shadow: 2px 1px 6px #cccccc;
}
</style>
