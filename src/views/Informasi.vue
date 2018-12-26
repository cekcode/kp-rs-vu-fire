<template>
    <v-container grid-list-md text-xs-center>
    <v-layout row wrap>

        <v-flex
            xs12
            sm6
            md6
            lg12
        >
        <v-card>
          <v-card-title class="subheading font-weight-bold">Pelayanan Medik</v-card-title>
          <v-divider></v-divider>
          <v-list dense>
            <v-expansion-panel focusable>
                <v-expansion-panel-content
                v-for="(item,i) in 3"
                :key="i"
                >
                <div slot="header">Instalasi Gawat Darurat</div>
                <v-card>
                    <v-card-text class="grey lighten-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
                </v-card>
                </v-expansion-panel-content>
            </v-expansion-panel>

          </v-list>
        </v-card>
      </v-flex>

      <v-flex
            xs12
            sm6
            md6
            lg12
        >
        <v-card>
          <v-card-title class="subheading font-weight-bold">Instalasi Medik</v-card-title>
          <v-divider></v-divider>
          <v-list dense>
            <v-expansion-panel focusable>
                <v-expansion-panel-content
                v-for="(item,i) in 3"
                :key="i"
                >
                <div slot="header">Poli Darurat</div>
                <v-card>
                    <v-card-text class="grey lighten-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
                </v-card>
                </v-expansion-panel-content>
            </v-expansion-panel>

          </v-list>
        </v-card>
      </v-flex>

      <v-flex
            xs12
            sm6
            md6
            lg12
        >
        <v-card>
          <v-card-title class="subheading font-weight-bold">Artikel</v-card-title>
          <v-divider></v-divider>
          <v-list dense>
            <v-expansion-panel focusable>
                <v-expansion-panel-content
                v-for="(item,i) in 3"
                :key="i"
                >
                <div slot="header">Mencegah kanker</div>
                <v-card>
                    <v-card-text class="grey lighten-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
                </v-card>
                </v-expansion-panel-content>
            </v-expansion-panel>

          </v-list>
        </v-card>
      </v-flex>
      
    </v-layout>
  </v-container>
</template>
<script>
export default {
    name: 'informasi'
};
</script>
<style scoped>
</style>