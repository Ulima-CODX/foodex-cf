<template>
  <v-card class="ma-4 flex">
    <!--Toolbar-->
    <v-toolbar color="#E41E2B" dark flat>
      <v-toolbar-title>Reservations</v-toolbar-title>
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-checkbox-marked-circle</v-icon>
      </v-btn>
    </v-toolbar>
    <!--List-->
      <v-list-item-group
      v-model="selected"
      multiple
      active-class="red-text">
        <v-list-item v-for="reservation in reservations" :key="reservation.id">
          <template v-slot:default="{ active, toggle }">
          <v-list-item-content>
            <!--v-list-item-title v-text="`ID: ${reservation.id}`"/-->
            <v-list-item-title v-text="`Juanito Alcachofa`"/>
            <v-list-item-subtitle
            class="text-primary"
            v-text="`Establishment ID: ${reservation.data.establishment_id}`"
          />
          <!--v-list-item-subtitle
            class="text-primary"
            v-text="`Client ID: ${reservation.data.client_id}`"/-->
          <v-list-item-subtitle
            class="text-primary"
            v-text="`Status: ${reservation.data.status}`"
          />
          <v-list-item-subtitle
            class="text-primary"
            v-text="`Attendees: ${reservation.data.attendees}`"
          />
          <!--v-list-item-subtitle
            class="text-primary"
            v-text="`Order IDs: ${reservation.data.order_ids}`"/-->
          <v-list-item-subtitle
            class="text-primary"
            v-text="`Timestamp: ${reservation.data.timestamp}`"/>
          </v-list-item-content>
          <v-list-item-action>
            <v-list-item-action-text
            v-text="reservation.action"/>
            <v-icon v-if="!active" color="grey lighten-1">
              mdi-star-border
            </v-icon>
            <v-btn icon v-else color="red">
              <v-icon>mdi-checkbox-marked-circle</v-icon>
            </v-btn>
          </v-list-item-action>
          </template>
        </v-list-item>
      </v-list-item-group>
  </v-card>
</template>

<script>
//Plugin Import
import { mapGetters } from "vuex";

//Component Export
export default {
  computed: {
    ...mapGetters({
      reservations: "receptionistController/getReservationList"
    })
  },
  data: () => ({
    selected: []
  })
};
</script>
