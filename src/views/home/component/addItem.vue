<template>
    <div>
        <Button @click="addModel = true" type="primary" class="btn">添加待办事项</Button>
        <Modal v-model="addModel" title='新增'>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="名称" prop="name">
                    <Input v-model="formValidate.name" placeholder="请输入事项名称"/>
                </FormItem>
                <FormItem label="时间" prop="date">
                    <DatePicker 
                        type="daterange" 
                        placeholder="请选择日期" 
                        v-model="formValidate.date"
                    >
                    </DatePicker>
                </FormItem>
                <FormItem label="描述" prop="desc">
                    <Input 
                        v-model="formValidate.desc" 
                        type="textarea" maxlength="300" 
                        show-word-limit 
                        :autosize="{minRows: 2,maxRows: 8}"
                    />
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="handleSubmit('formValidate')">确定</Button>
                <Button @click="cancel('formValidate')" style="margin-left: 8px">取消</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    name: 'addItem',
    data() {
        return {
            addModel: false,
            formValidate: {
                name: '',
                date: [],
                desc: ''
            },
            ruleValidate: {
                name: [
                    { required: true, message: '事项名称不能为空', trigger: 'blur' }
                ],
                desc: [
                    { type: 'string', max: 300, message: '描述不超过300字', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        handleSubmit (name) {
            let sendData = {
                name: this.formValidate.name,
                date: this.formValidate.date,
                desc: this.formValidate.desc
            }
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$emit('on-addItem', sendData)
                    this.$Message.success('Success!')
                    this.$refs[name].resetFields()
                    this.addModel = false
                } else {
                    this.$Message.error('有必填字段未填');
                }
            })
        },
        cancel(name) {
            this.$refs[name].resetFields()
            this.addModel = false
        }
    }
}
</script>