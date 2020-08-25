<template>
    <div>
        <Table 
            border 
            :height="tableHeight" 
            :columns="tableCol" 
            :data="tableData"
        ></Table>
    </div>
</template>

<script>
import { setFixeMixin } from '@/libs/setFixedHeight' // 固定高度
import TableHeaderHandle from "@/components/table-header-handle";

export default {
    name: 'chargeRecords',
    mixins: [setFixeMixin],
    components: {TableHeaderHandle},
    computed: {
        tableHeight() {
            return this.HEIGHT
        }
    },
    data() {
        return {
            tableCol: [
                {
                    title: '学号', 
                    key: 'uid', 
                    minWidth: 120, 
                    align: 'center',
                    renderHeader: (h, params) => {
                        return (
                            <TableHeaderHandle
                                params={params}
                                colLength={this.tableCol.length}
                                onOn-cancel-before={(index)=>{
                                    this.TableHeaderHandle('before', index)
                                }}
                                onOn-cancel-back={(index)=>{
                                    this.TableHeaderHandle('back', index)
                                }}
                                onOn-cancel-col={(index)=>{
                                    this.TableHeaderHandle('cancel', index)
                                }}
                            ></TableHeaderHandle>
                        )
                    },
                },
                {
                    title: '姓名', 
                    key: 'uname', 
                    minWidth: 120, 
                    align: 'center',
                    renderHeader: (h, params) => {
                        return (
                            <TableHeaderHandle
                                params={params}
                                colLength={this.tableCol.length}
                                onOn-cancel-before={(index)=>{
                                    this.TableHeaderHandle('before', index)
                                }}
                                onOn-cancel-back={(index)=>{
                                    this.TableHeaderHandle('back', index)
                                }}
                                onOn-cancel-col={(index)=>{
                                    this.TableHeaderHandle('cancel', index)
                                }}
                            ></TableHeaderHandle>
                        )
                    },
                },
                {
                    title: '年龄', 
                    key: 'age', 
                    minWidth: 120, 
                    align: 'center',
                    renderHeader: (h, params) => {
                        return (
                            <TableHeaderHandle
                                params={params}
                                colLength={this.tableCol.length}
                                onOn-cancel-before={(index)=>{
                                    this.TableHeaderHandle('before', index)
                                }}
                                onOn-cancel-back={(index)=>{
                                    this.TableHeaderHandle('back', index)
                                }}
                                onOn-cancel-col={(index)=>{
                                    this.TableHeaderHandle('cancel', index)
                                }}
                            ></TableHeaderHandle>
                        )
                    },
                },
                {
                    title: '班级', 
                    key: 'class', 
                    minWidth: 120, 
                    align: 'center',
                    renderHeader: (h, params) => {
                        return (
                            <TableHeaderHandle
                                params={params}
                                colLength={this.tableCol.length}
                                onOn-cancel-before={(index)=>{
                                    this.TableHeaderHandle('before', index)
                                }}
                                onOn-cancel-back={(index)=>{
                                    this.TableHeaderHandle('back', index)
                                }}
                                onOn-cancel-col={(index)=>{
                                    this.TableHeaderHandle('cancel', index)
                                }}
                            ></TableHeaderHandle>
                        )
                    },
                },
                {
                    title: '寝室', 
                    key: 'dorm', 
                    minWidth: 120, 
                    align: 'center',
                    renderHeader: (h, params) => {
                        return (
                            <TableHeaderHandle
                                params={params}
                                colLength={this.tableCol.length}
                                onOn-cancel-before={(index)=>{
                                    this.TableHeaderHandle('before', index)
                                }}
                                onOn-cancel-back={(index)=>{
                                    this.TableHeaderHandle('back', index)
                                }}
                                onOn-cancel-col={(index)=>{
                                    this.TableHeaderHandle('cancel', index)
                                }}
                            ></TableHeaderHandle>
                        )
                    },
                }
            ],
            tableData: [
                {uid:111, uname: 'Jenn', age: 22, class: '三年二班', dorm: 'A5-432'},
                {uid:112, uname: 'Tom', age: 22, class: '三年二班', dorm: 'A5-618'}
            ],
        }
    },
    methods: {
        TableHeaderHandle(fn, index) {
            if (fn==='before'&&index!==0) {
                let item = this.tableCol.splice(index, 1)[0]
                this.tableCol.splice(index-1,0,item)
            }
            if (fn==='back'&&index+1 !== this.tableCol.length) {
                let item = this.tableCol.splice(index, 1)[0]
                this.tableCol.splice(index+1,0,item)
            }
            if (fn==='cancel'){
                this.tableCol.splice(index, 1)
            }
        }
    }
}
</script>
