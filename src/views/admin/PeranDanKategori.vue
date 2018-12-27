<template>
<v-container fluid fill-height>
    <v-layout justify-center>
        <v-flex xs12 sm10>
            <v-card>
                <v-btn color="blue darken-3" medium dark>Tambah Peran</v-btn>
                <v-layout row wrap v-if="perans.length">
                    <v-flex 
                    v-for="peran in perans"
                    :key="peran.name"
                    >
                    <v-card class="text-md-center">
                        {{peran.name}} | {{peran.slug}}
                    </v-card>
                    </v-flex>
                </v-layout>
                <v-layout row wrap v-else>
                    <v-flex >
                    <v-card class="text-md-center">
                       Tidak Ada Peran
                    </v-card>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-flex>

        <v-flex xs12 sm10>
            <v-card>
                <v-btn color="blue darken-3" medium dark>Tambah Katori</v-btn>
                <v-layout row wrap>
                    <v-flex 
                    v-for="category in categories"
                    :key="category.name"
                    >
                    <v-card class="text-md-center">
                        {{category.name}} | {{category.slug}}
                    </v-card>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-flex>
    </v-layout>
</v-container>
</template>

<script>
import { mapState } from 'vuex';
const fb = require('../../firebaseConfig.js');

export default {
    name: 'peran-dan-kategori',
    data () {
        return {
            categories:[
                {name: 'road trips',slug:'road-trips'}
            ]
        }
    },
    computed: {
        ...mapState(['currentUser', 'perans'])
    }
}
</script>
