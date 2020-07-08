<template>
    <div>
        <Button type="primary" @click="showModal = true">双向绑定props</Button>
        <modal :showModal.sync="showModal"></modal>
    </div>
</template>

<script>
import modal from './component/modal'
export default {
    name: 'partition',
    components: {modal},
    data() {
        return {
            showModal: false
        }
    }
}
</script>