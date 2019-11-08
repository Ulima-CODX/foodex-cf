<template>
  <v-list-item v-if="value != ''">
    <v-text-field
      single-line
      dense
      :value="(editing)? newValue: value"
      :readonly="!editing"
    >
      <template slot="append" v-if="editing">
        <v-icon @click="save()">mdi-checkbox-marked</v-icon>
        <v-icon @click="discard()">mdi-close-box</v-icon>
      </template>
      <v-icon v-else @click="edit()">mdi-pencil</v-icon>
    </v-text-field>
  </v-list-item>
</template>

<script>
export default {
  name: "editable-field",
  props: ["value", "action"],
  data() {
    return {
      newValue: this.value,
      editing: false
    };
  },
  methods: {
    edit() {
      this.newValue = this.value;
      this.editing = true;
    },
    discard() {
      this.newValue = this.value;
      this.editing = false;
    },
    save() {
      this.action(this.value);
    }
  }
};
</script>

<style></style>
