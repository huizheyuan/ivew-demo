<template>
    <div>
        <Table 
            border 
            :height="tableHeight" 
            :columns="columns" 
            :data="data"
            @on-sort-change="tableSort"
        ></Table>
        <div class="footerBox">
            <Page 
                :total="searchHeader.totalPage" 
                :current="searchHeader.currentPage" 
                @on-change="(currentPage)=>{searchHeader.currentPage=currentPage; searchData()}"
                @on-page-size-change="(totalPage)=>{searchHeader.totalPage=totalPage; searchData()}"
                class-name="pages" 
                show-total 
                show-sizer 
            />
        </div>
    </div>
</template>

<script>
import { setFixeMixin } from '@/libs/setFixedHeight' // 固定高度
import { HeaderSearchMixin } from '@/components/table-header-search'
import moment from 'moment'
export default {
    name: 'outdoor',
    mixins: [setFixeMixin, HeaderSearchMixin],
    computed: {
        tableHeight() {
            return this.HEIGHT
        }
    },
    data() {
        return {
            searchHeader: {
                currentPage: 1,
                totalPage: 100,
                module: 0,
                moduleNum: '',
                createRange: ['2020-05-16', '2020-05-17'],
                createTime: '2020.3.6'
            },
            moduleList: [
                {id: 0, value: '全部'},
                {id: 1, value: '模块111'},
                {id: 2, value: '模块222'},
                {id: 3, value: '模块333'},
            ],
            columns: [
                {
                    title: '序号',
                    width: 80,
                    type: 'index',
                    align: 'center'
                },
                {
                    title: '模块',
                    key: 'module',
                    align: 'center',
                    renderHeader: (h, params) => this.renderHeaderSelect(h, params, this.moduleList)
                },
                {
                    title: '模块编号',
                    key: 'moduleNum',
                    align: 'center',
                    renderHeader: (h, params) => this.renderHeaderInput(h, params)
                },
                {
                    title: '时间范围',
                    key: 'createRange',
                    align: 'center',
                    renderHeader: (h, params) => this.renderHeaderDatePicker(h, params, 'daterange')
                },
                {
                    title: '创建时间',
                    key: 'createTime',
                    align: 'center',
                    sortable: true,
                    renderHeader: (h, params) => this.renderHeaderDatePicker(h, params)
                },
                {
                    title: '备注',
                    key: 'remarks',
                    align: 'center'
                }
            ],
            data: [
                {
                    id: 1,
                    module: '账户管理',
                    moduleNum: 'userAccessInfo',
                    createRange: '2020-05-16——2020-06-15',
                    createTime: '1991-05-14',
                    remarks: ''
                },
                {
                    id: 2,
                    module: '部门管理',
                    moduleNum: 'departmentInfo',
                    createRange: '2020-05-16——2020-06-15',
                    createTime: '1991-05-14',
                    remarks: ''
                }
            ],
        }
    },
    mounted() {
        this.searchData()
    },
    methods: {
        tableSort (item) {
            console.log(item.column, item.key, item.order)
        },
        searchData() {
            let createTime = moment(this.searchHeader.createTime).format('YYYY-MM-DD')
            let createRange = [
                moment(this.searchHeader.createRange[0]).format('YYYY-MM-DD'),
                moment(this.searchHeader.createRange[1]).format('YYYY-MM-DD')
            ]
            console.log(createTime, createRange)
            console.log(this.searchHeader)
        },
    }
}
</script>
