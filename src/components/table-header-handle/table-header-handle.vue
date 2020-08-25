<template>
    <span @mouseover="show=true">
        {{params.column.title}}
        <Poptip v-if="show" trigger="hover" :transfer="true" width="150" placement="bottom">
            <div slot="content">
                <p v-if="params.index!==0" @click="toBefore(params.index)" class="handleBtn green">向前移</p>
                <p v-if="params.index+1 !== colLength" @click="toBack(params.index)" class="handleBtn blue">向后移</p>
                <p @click="toCancel(params.index)" class="handleBtn red">删除</p>
            </div>
            <span class="pointer">
                <Icon type="md-create" />
            </span>
        </Poptip>
        <span v-else class="pointer">
            <Icon type="md-create" />
        </span>
    </span>
</template>

<script>
export default {
    name: 'tableHeaderHandle',
    props: {
        colLength: {
            type: Number,
            default: 0
        },
        params: {
            type: Object,
            default: ()=>{}
        },
    },
    data() {
        return {
            show: false
        }
    },
    methods: {
        toBefore(index) {
            this.$emit('on-cancel-before', index)
        },
        toBack(index) {
            this.$emit('on-cancel-back', index)
        },
        toCancel(index) {
            this.$emit('on-cancel-col', index)
        },
    }
}
</script>

<style lang="less" scoped>
.handleBtn {
    padding: 6px 0;
    text-align: center;
    cursor: pointer;
    border-radius: 4px;
    &:hover {
        background: #f8f8f9;
    }
}
</style>
