<template>
<v-container fluid fill-height>
    <v-layout justify-center>
        <v-flex xs12 sm10>
            <v-card>
                <v-btn color="blue darken-3" medium dark to="/admin/post/new">Tambah Post</v-btn>
                <v-data-table
                        :headers="headers"
                        :items="desserts"
                        class="elevation-1"
                    >
                        <template slot="items" slot-scope="props">
                        <td>{{ props.item.name }}</td>
                        <td class="text-xs-left justify-center">{{ props.item.category }}</td>
                        <td class="text-xs-left justify-center">{{ props.item.createdOn }}</td>
                        <td class="text-xs-left justify-center">{{ props.item.updatedOn }}</td>
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
                    sortable: false,
                    value: 'category'
                },
                { text: 'Di Buat', value: 'createdOn' },
                { text: 'Di Update', value: 'updatedOn' },
                { text: '' }],
            desserts: [
            {
                value: false,
                name: 'Cara membuat makanan bayi',
                category: 'Artikel',
                createdOn: '11/12/2018',
                updatedOn: '11/12/2018'
            }]
      }
    }
  }
</script>
