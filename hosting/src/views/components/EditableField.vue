<template>
  <v-list-item v-if="value != ''">
    <v-text-field v-model="value" v-if="editing" />
    <template v-else>{{ value }}</template>
    <v-spacer />
    <v-icon v-if="editing" @click="action(value)">mdi-checkbox-marked</v-icon>
    <v-icon @click="editing != editing">{{
      editing ? "mdi-close-box" : "mdi-pencil"
    }}</v-icon>
  </v-list-item>
</template>

<script>
export default {
  name: "editable-field",
  props: ['value', 'action'],
  data() {
    return {
      editing: false
    };
  }
};
</script>

<style></style>
