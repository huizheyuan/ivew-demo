<template>
    <div>
        <vxe-table
          border
          resizable
          ref="xTree"
          :tree-config="treeConfig"
          :data="tableData">
          <vxe-table-column field="name" title="名称" tree-node></vxe-table-column>
          <vxe-table-column field="size" title="大小"></vxe-table-column>
          <vxe-table-column field="type" title="类型"></vxe-table-column>
          <vxe-table-column field="date" title="日期"></vxe-table-column>
        </vxe-table>
    </div>
</template>

<script>
import Vue from 'vue'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'
Vue.use(VXETable)

export default {
    name: 'chargeItems',
    data () {
        return {
            treeConfig: {
                children: 'children'
            },
            tableData: [
                {
                    id: "10000",
                    name: "文件夹 10000",
                    size: "53k",
                    type: "www",
                    date: "2019-10-22",
                    children: [
                        {
                            parentId: "10000",
                            id: "11000",
                            name: "vxe-table 从入门到放弃.avi",
                            size: "53k",
                            type: "www",
                            date: "2019-10-22",
                        }
                    ],
                }
            ]
        }
    },
    methods: {
        getTreeExpansionEvent () {
            let treeExpandRecords = this.$refs.xTree.getTreeExpandRecords()
            this.$XModal.alert(treeExpandRecords.length)
        }
    }
}
</script>