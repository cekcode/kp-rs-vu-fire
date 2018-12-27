<template>
<v-container fluid fill-height>
   <v-layout justify-center align-center>
    <v-flex xl12>
      <v-timeline>
        <v-timeline-item
          v-for="n in 4"
          :key="n"
          color="red lighten-2"
          large
        >
          <span slot="opposite">Tus eu perfecto</span>
          <v-card class="elevation-2">
            <v-card-title class="headline">Lorem ipsum</v-card-title>
            <v-card-text>
              Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.
            </v-card-text>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
  export default {
    name: 'admin-dashboard',
    data () {
      return {
          
      }
    }
  }
</script>
