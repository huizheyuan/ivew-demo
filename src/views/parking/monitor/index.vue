<template>
    <div class="monitor">
        <Card 
            v-for="monitor in monitors" 
            :key="monitor.id" 
            class="cardItem pointer" 
            style="width:300px"
        >
            <div style="text-align:center" @click="detail(monitor)">
                <img class="cardImg" :src="monitor.img">
                <h3>{{monitor.position}}</h3>
            </div>
        </Card>
    </div>
</template>

<script>
import monitor1 from '../../../assets/image/monitor1.jpg'
export default {
    name: 'monitor',
    data() {
        return {
            monitors: [
                {
                    id: 1,
                    img: monitor1,
                    position: '停车场入口'
                },
                {
                    id: 2,
                    img: monitor1,
                    position: 'A区入口'
                },
                {
                    id: 3,
                    img: monitor1,
                    position: 'A区第一个拐角'
                },
                {
                    id: 4,
                    img: monitor1,
                    position: 'A区第一个拐角'
                },
                {
                    id: 5,
                    img: monitor1,
                    position: 'A区第一个拐角'
                }
            ]
        }
    },
    methods: {
        detail(monitor) {
            this.$router.push({
                name: 'monitorDetail',
                query: { id: monitor.id }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.monitor {
    display: flex;
    flex-wrap: wrap;
    align-content: space-evenly;
    .cardItem {
        margin: 8px;
        .cardImg {
            width: 100%;
        }
    }
}
</style>