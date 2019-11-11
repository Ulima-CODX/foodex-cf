<template>
  <div v-if="show">
    <!--Link List-->
    <v-list dense>
      <v-list-item
        v-for="(link, id) in links"
        :key="id"
        :to="link.name ? { name: link.name } : null"
        @click="link.action ? link.action() : null"
      >
        <!--Icon-->
        <v-list-item-icon v-if="link.icon">
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-icon>
        <!--Label-->
        <v-list-item-content>
          <v-list-item-title>{{ link.label }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider v-if="divider" />
  </div>
</template>

<script lang="ts">
export default {
  props: {
    show: {
      type: Boolean,
      default: true
    },
    divider: {
      type: Boolean,
      default: true
    },
    links: Array
  }
};
</script>
