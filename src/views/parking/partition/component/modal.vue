<template>
    <div>
        <Modal
            v-model="show"
            title="Common Modal dialog box title">
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
        </Modal>
    </div>
</template>

<script>
    export default {
        props: {
            showModal: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            show: {
                get() {
                    return this.showModal
                },
                set(newV) {
                    this.$emit('update:showModal', false)
                }
            }
        }
    }
</script>