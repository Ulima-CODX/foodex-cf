<template>
  
</template>

<script>
export default {
    name: 'EmployeeProfile',
    props: {
        id: String
    },
    data: ()=>({
        employee: null
    }),
    firestore: ()=>{ return {

    }},
    watch: {
        id: {
            immediate: true,
            handler(id) {
                this.$bind('employee', db.collection('employees').doc(id))
            },
        }
    }
}
</script>

<style>

</style>