<template>
    <div>
        <h1>detail</h1>
    </div>
</template>

<script>
export default {
    name: 'monitorDetail',
    mounted() {
        console.log(this.$route.query.id)
    }
}
</script>