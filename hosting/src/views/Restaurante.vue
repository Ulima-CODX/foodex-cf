<template>
  <v-row justify="center">
    <v-col cols="12" sm="8">
      <v-card>
        <v-card-title class="red darken-1">
          <span class="headline white--text">Embarcadero 41 (Miraflores)</span>
        </v-card-title>
        <v-list>
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-map-marker</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>Av. Mariscal La Mar 456 </v-list-item-title>
            </v-list-item-content>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-border-color</v-icon>
            </v-btn>
          </v-list-item>

          <v-divider inset></v-divider>
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-phone</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>(01) 4216144</v-list-item-title>
            </v-list-item-content>

            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-border-color</v-icon>
            </v-btn>
          </v-list-item>

          <v-divider inset></v-divider>

          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-email</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>lamar@embarcadero41.com</v-list-item-title>
            </v-list-item-content>

            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-border-color</v-icon>
            </v-btn>
          </v-list-item>

          <v-divider inset></v-divider>
        </v-list>

        <v-img src="@/resources/assets/embarcadero.jpg" height="500px"></v-img>
      </v-card>
    </v-col>
  </v-row>
</template>
