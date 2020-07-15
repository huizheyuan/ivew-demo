<template>
    <div>
        <Tabs v-model="tabsType" :animated="false">
            <TabPane label="待办事项" name="todo">
                <addItem @on-addItem="addItem"/>
                <Card shadow v-for="(todo,index) in todoList" :key="todo.id" class="cardItem">
                    <span class="itemTitle">{{todo.title}}</span>
                    <span>{{todo.desc}}</span>
                    <span class="fr">
                        <Button @click="btnHandler('complete', '完成', todo, index)" type="success" class="btn">完成</Button>
                        <Button @click="btnHandler('delete', '删除', todo, index)" type="error" class="btn">删除</Button>
                        <Button @click="btnHandler('detail', '查看', todo, index)" class="btn">查看</Button>
                    </span>
                </Card>
            </TabPane>
            <TabPane label="完成事项" name="down">
                <Card shadow v-for="(down,index) in downList" :key="down.id" class="cardItem">
                    <span class="itemTitle">{{down.title}}</span>
                    <span>{{down.desc}}</span>
                    <span class="fr">
                        <Button @click="btnHandler('delete', '删除', down, index)" type="error" class="btn">删除</Button>
                        <Button @click="btnHandler('detail', '查看', down, index)" class="btn">查看</Button>
                    </span>
                </Card>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
import addItem from './component/addItem'
export default {
    name: 'home',
    components: {addItem},
    data() {
        return {
            tabsType: 'todo',
            todoList: [
                { id: 10001, title: '检查消防栓', desc: '1栋到5栋' },
                { id: 10002, title: '检查垃圾分类', desc: '查看监控……' }
            ],
            downList: [
                { id: 20001, title: '检查门禁', time: '2020-6-29', desc: '' }
            ]
        }
    },
    created() {
        this.uUid = 0
    },
    methods: {
        addItem(item) {
            this.uUid--
            this.todoList.unshift({
                id: this.uUid, 
                title: item.name, 
                time: item.date,
                desc: item.desc
            })
        },
        btnHandler(type, name, detail, index) {
            const title = type==='detail' ? '详情' : '提示'
            const content = `<p>您确定要<span class='bold'>${name}</span><span class='orange'>${detail.title}</span> 吗？</p>`
            switch (type) {
                case 'detail':
                    this.$Modal.info({
                        title: title,
                        content: `
                            <p>名称：<span class='bold'>${detail.title}</span></p>
                            <p>详情：<span>${detail.desc}</span></p>
                        `
                    });
                    break;
                default:
                    this.$Modal.confirm({
                        title: title,
                        content: content,
                        onOk: () => {
                            if (type==='delete') {
                                let handerList = this.tabsType==='todo' ? this.todoList : this.downList
                                let newArr = handerList.filter(item=>item.id!==detail.id)
                                if(this.tabsType==='todo') this.todoList = newArr
                                else this.downList = newArr
                            } else if (type==='complete') {
                                this.todoList.splice(index,1)
                                this.downList.push(detail)
                            }                            
                        }
                    });
                    break;
            }
        },
        getCountdown() {}
    }
}
</script>

<style lang="less" scoped>
.cardItem {
    margin-top: 8px;
    .itemTitle {
        color: #2d8cf0;
        font-weight: bold;
        font-size: 18px;
        margin-right: 8px;
    }
}
</style>