<template>
<v-container fluid fill-height>
    <v-layout justify-center>
        <v-flex xs12 sm10>
            <v-card>
                <v-btn color="blue darken-3" medium dark to="/admin/post/new">Tambah Post</v-btn>
                <v-data-table
                        :headers="headers"
                        :items="posts"
                        class="elevation-1"
                    >
                        <template slot="items" slot-scope="props">
                        <td>{{ props.item.name }}</td>
                        <td class="text-xs-left justify-center">{{ props.item.category.name }}</td>
                        <td class="text-xs-left justify-center">{{ props.item.createdOn | formatDate}}</td>
                        <td class="text-xs-left justify-center">{{ props.item.updatedOn | formatDate}}</td>
                        <td class="justify-center layout px-0">
                            <v-icon color="black" medium class="mr-2" >
                                zoom_in
                            </v-icon>
                            <v-icon color="orange" medium class="mr-2" >
                                edit
                            </v-icon>
                            <v-icon color="red" medium>
                                delete
                            </v-icon>
                        </td>
                        </template>
                    </v-data-table>
                </v-card>
        </v-flex>
    </v-layout>
</v-container>
</template>

<script>
import { mapState } from 'vuex';
import moment from 'moment';
const fb = require('@/firebaseConfig.js');

  export default {
    name: 'post',
    data () {
      return {
          headers: [
                {
                    text: 'Nama Post',
                    align: 'left',
                    value: 'name'
                },
                {
                    text: 'Kategori',
                    align: 'left',
                    value: 'category.name'
                },
                { text: 'Di Buat', value: 'createdOn' },
                { text: 'Di Update', value: 'updatedOn' },
                { text: '' }]
      }
    },
    computed: {
        ...mapState(['currentUser','posts']),
    },
    filters: {
        formatDate(val) {
            if (!val) { return '-' }
            let date = val.toDate()
            return moment(date).fromNow()
        }
    }
  }
</script>
