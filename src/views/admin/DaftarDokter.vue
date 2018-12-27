<template>
<v-container fluid fill-height>
    <v-layout justify-center>

        <v-flex xs12 sm10>
            
        <v-card>
            <v-container
            fluid
            grid-list-md
            >
            <v-btn color="blue darken-3" medium dark>Tambah Dokter</v-btn>
            <v-layout row wrap>
                <v-flex 
                v-for="card in cards"
                v-bind="{ [`xs${card.flex}`]: true }"
                :key="card.title"
                >
                <v-card class="text-md-center">
                    <v-img
                    :src="card.src"
                    height="200px" width="350px"
                    >
                    <v-container
                        fill-height
                        fluid
                        pa-2
                    >

                    </v-container>
                    </v-img>
                    <v-card-actions>
                        <strong>{{card.title}}</strong> 
                    </v-card-actions>
                    <v-card-actions>
                        <v-btn flat color="orange">Edit</v-btn>
                        <v-btn flat color="red">Hapus</v-btn>
                    </v-card-actions>
                </v-card>
                </v-flex>
            </v-layout>
                <div class="text-xs-center">
                    <v-pagination
                    v-model="cards"
                    :length="4"
                    circle
                    ></v-pagination>
                </div>
            </v-container>
        </v-card>
        </v-flex>
    </v-layout>
</v-container>
</template>

<script>
  export default {
    name: 'admin-daftar-dokter',
    data () {
      return {
          cards:[
                {src: 'http://source.unsplash.com/0BhSKStVtdM',title:'Dr. Favorite road trips'},
                {src: 'http://source.unsplash.com/0BhSKStVtdM',title:'Dr. Favorite trips'},
                {src: 'http://source.unsplash.com/0BhSKStVtdM',title:'Dr. Favorite trips'},
                {src: 'http://source.unsplash.com/0BhSKStVtdM',title:'Dr. Favorite road trips'},
                {src: 'http://source.unsplash.com/0BhSKStVtdM',title:'Dr. Favorite'},
                {src: 'http://source.unsplash.com/0BhSKStVtdM',title:'Dr. Favorite road trips'}
            ]
      }
    }
  }
</script>
