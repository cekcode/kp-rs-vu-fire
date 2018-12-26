<template>
  <v-layout justify-center>
    <v-flex xs12 sm10>
        <v-card>
        <v-container
          fluid
          grid-list-md
        >
          <v-layout row wrap>
            <v-flex 
              v-for="card in cards"
              v-bind="{ [`xs${card.flex}`]: true }"
              :key="card.title"
            >
              <v-card align="center" class="text-md-center">
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

      <v-card>
        <v-data-table
                :headers="headers"
                :items="desserts"
                class="elevation-1"
            >
                <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <td class="text-xs-right">{{ props.item.jen }}</td>
                <td class="text-xs-right">{{ props.item.calories }}</td>
                <td class="text-xs-right">{{ props.item.fat }}</td>
                <td class="text-xs-right">{{ props.item.carbs }}</td>
                <td class="text-xs-right">{{ props.item.protein }}</td>
                <td class="text-xs-right">{{ props.item.iron }}</td>
                <td class="text-xs-right">{{ props.item.sab }}</td>
                </template>
            </v-data-table>
        </v-card>
    </v-flex>

  </v-layout>
</template>

<script>
export default {
    name:'dokter',
    data(){
        return{
            page: 1,
            cards:[
                {src: 'http://source.unsplash.com/0BhSKStVtdM',title:'Dr. Favorite road trips'},
                {src: 'http://source.unsplash.com/0BhSKStVtdM',title:'Dr. Favorite trips'},
                {src: 'http://source.unsplash.com/0BhSKStVtdM',title:'Dr. Favorite trips'},
                {src: 'http://source.unsplash.com/0BhSKStVtdM',title:'Dr. Favorite road trips'},
                {src: 'http://source.unsplash.com/0BhSKStVtdM',title:'Dr. Favorite'},
                {src: 'http://source.unsplash.com/0BhSKStVtdM',title:'Dr. Favorite road trips'}
            ],
            headers: [
            {
                text: 'Nama Dokter',
                align: 'left',
                sortable: false,
                value: 'name'
            },
            { text: 'Jenis Dokter', value: 'jen' },
            { text: 'Senin', value: 'calories' },
            { text: 'Selasa', value: 'fat' },
            { text: 'Rabu', value: 'carbs' },
            { text: 'Kamis', value: 'protein' },
            { text: 'Jumat', value: 'iron' },
            { text: 'Sabtu', value: 'sab' }
            ],
            desserts: [
            {
                value: false,
                name: 'dr. M. Riza, Sp. A., M.Kes',
                jen: 'Spesialis Anak',
                calories: 159,
                fat: 6.0,
                carbs: 24,
                protein: 4.0,
                iron: '1%',
                sab : '14.00'
            },
            {
                value: false,
                name: 'dr. Pudjiastuti, Sp. A (K) ',
                jen: 'Spesialis Anak',
                calories: 237,
                fat: 9.0,
                carbs: 37,
                protein: 4.3,
                iron: '1%',
                sab : '14.00'
            },
            {
                value: false,
                name: 'dr. Rustam Siregar, Sp. A',
                jen: 'Spesialis Anak',
                calories: 262,
                fat: 16.0,
                carbs: 23,
                protein: 6.0,
                iron: '7%',
                sab : '14.00'
            },
            {
                value: false,
                name: 'dr. Singgih Ongkorahardjo, Sp.B ',
                jen: 'SPESIALIS BEDAH UMUM',
                calories: 305,
                fat: 3.7,
                carbs: 67,
                protein: 4.3,
                iron: '8%',
                sab : '14.00'
            },
            {
                value: false,
                name: 'Gingerbread',
                jen: 'Spesialis Anak',
                calories: 356,
                fat: 16.0,
                carbs: 49,
                protein: 3.9,
                iron: '16%',
                sab : '14.00'
            },
            {
                value: false,
                name: 'Jelly bean',
                jen: 'Spesialis Anak',
                calories: 375,
                fat: 0.0,
                carbs: 94,
                protein: 0.0,
                iron: '0%',
                sab : '14.00'
            },
            {
                value: false,
                name: 'Lollipop',
                jen: 'Spesialis Anak',
                calories: 392,
                fat: 0.2,
                carbs: 98,
                protein: 0,
                iron: '2%',
                sab : '14.00'
            },
            {
                value: false,
                name: 'Honeycomb',
                jen: 'Spesialis Anak',
                calories: 408,
                fat: 3.2,
                carbs: 87,
                protein: 6.5,
                iron: '45%',
                sab : '14.00'
            },
            {
                value: false,
                name: 'Donut',
                jen: 'Spesialis Anak',
                calories: 452,
                fat: 25.0,
                carbs: 51,
                protein: 4.9,
                iron: '22%',
                sab : '14.00'
            },
            {
                value: false,
                name: 'KitKat',
                jen: 'Spesialis Anak',
                calories: 518,
                fat: 26.0,
                carbs: 65,
                protein: 7,
                iron: '6%',
                sab : '14.00'
            }
            ]
        }
    }
}
</script>
