<template>
  
</template>

<script>

export default {
    name: 'EmployeeList',
    data: { 
        employees: []
    },
    firestore: {
        employees: db.collection('employees')
    }
}
</script>

<style>

</style>