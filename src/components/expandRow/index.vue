<template>
    <div>
        <Table border :columns="columns" :data="tableData">
            <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" class="btn" @click="editItem(row)">编辑</Button>
                <Button type="error" size="small" @click="deleteItem(row, index)">删除</Button>
            </template>
        </Table>
        <Modal v-model="editModel" title='编辑'>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="模块" prop="menu">
                    <Input v-model="formValidate.menu" placeholder="请输入模块名称"/>
                </FormItem>
                <FormItem label="模块编号" prop="menuNum">
                    <Input v-model="formValidate.menuNum" placeholder="请输入模块编号"/>
                </FormItem>
                <FormItem label="备注" prop="remarks">
                    <Input 
                        v-model="formValidate.remarks" 
                        type="textarea" maxlength="300" 
                        show-word-limit 
                        :autosize="{minRows: 2,maxRows: 8}"
                    />
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="editSubmit('formValidate')">确定</Button>
                <Button @click="()=>editModel = false" style="margin-left: 8px">取消</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    name: 'expandRow',
    props: {
        row: Object
    },
    data() {
        return {
            columns: [
                {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                },
                {
                    title: '序号',
                    width: 80,
                    type: 'index',
                    align: 'center'
                },
                {
                    title: '菜单',
                    key: 'menu',
                    align: 'center'
                },
                {
                    title: '菜单编号',
                    key: 'menuNum',
                    align: 'center'
                },
                {
                    title: '排序',
                    type: 'index',
                    align: 'center'
                },
                {
                    title: '创建时间',
                    key: 'createTime',
                    align: 'center'
                },
                {
                    title: '备注',
                    key: 'remarks',
                    align: 'center'
                }
            ],
            tableData: JSON.parse(JSON.stringify(this.row.subData)),
            editModel: false,
            formValidate: {
                menu: '',
                menuNum: '',
                remarks: ''
            },
            ruleValidate: {
                menu: [
                    { required: true, message: '事项名称不能为空', trigger: 'blur' }
                ],
                remarks: [
                    { type: 'string', max: 300, message: '描述不超过300字', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        editItem(row) {
            this.editModel = true
            this.formValidate = row
        },
        editSubmit(name) {
            console.log(this.formValidate)
            this.editModel = false
        },
        deleteItem(row, index) {
            this.$Modal.confirm({
                title: '提示',
                content: `您确定要删除<span class='bold'>${row.menu}</span>模块吗？`,
                onOk: () => {
                    this.tableData.splice(index,1)
                }
            });
        },
    }
}
</script>