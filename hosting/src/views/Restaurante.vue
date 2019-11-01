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
<<<<<<< HEAD
        </v-list>

        <v-img src="@/resources/assets/embarcadero.jpg" height="500px"></v-img>
      </v-card>
    </v-col>
  </v-row>
</template>
=======

        

        </v-list>
</v-card>
      </v-tab-item>
    </v-tabs>
    <v-img
          src="@/resources/assets/embarcadero.jpg"
          height="500px"
    ></v-img>
        
    </v-card>

       
    </v-col>
  </v-row>
</template>

<script>
  export default {
    data () {
      return {
        tab: null,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        icons: false,
        centered: false,
        grow: false,
        vertical: true,
        prevIcon: false,
        nextIcon: false,
        right: false,
        tabs: 2,
      }
    },
  }
</script>
>>>>>>> 9be33ecf9d33f5a29cdaf50872357e999b25c7a4
