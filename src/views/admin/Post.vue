<template>
<v-container fluid fill-height>
    <v-layout justify-center>
        <v-flex xs12 sm10>
            <v-progress-circular
            v-if="performingRequest"
            :size="70"
            color="primary"
            indeterminate
            ></v-progress-circular>
            <div v-if="errorMsg !== ''" class="red--text text--darken-3">
                <p>{{ errorMsg }}</p>
            </div>
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
                        <td class="text-xs-left justify-center">{{ props.item.status }}</td>
                        <td class="text-xs-left justify-center">{{ props.item.createdOn | formatDate}}</td>
                        <td class="text-xs-left justify-center">{{ props.item.updatedOn | formatDate}}</td>
                        <td class="justify-center layout px-0">
                            <v-icon color="black" medium class="mr-2" >
                                zoom_in
                            </v-icon>
                            <v-icon color="orange" @click="editItem(props.item)" medium class="mr-2" >
                                edit
                            </v-icon>
                            <v-icon color="red" @click="deleteItem(props.item)" medium class="mr-2">
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
import { firestorage } from '@/firebaseConfig';

  export default {
    name: 'post',
    data () {
      return {
            performingRequest: false,
            errorMsg: '',
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
                { text: 'Status', value: 'status' },
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
    },
    methods:{
        deleteItem(item) {
            var self = this
            self.$swal({
                title: "Delete "+item.name+" ?",
                text: "Data akan dihapus permanen!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
                closeOnConfirm: true
            }).then((isConfirm) => {
                if(isConfirm){
                this.performingRequest = true;
                fb.postsCollection.doc(item.id).delete().then((res) => {
                    self.$swal({
                        title: "Success!",
                        text: "Delete Post "+item.name,
                        icon: "success"
                    });
                    this.performingRequest = false;
                    return true;
                    }).catch((error) => {
                        self.$swal({
                            title: "Oops...!",
                            text: error,
                            type: "error"
                        });
                        this.performingRequest = false;
                    });
                }
                else{
                    this.performingRequest = false;
                    return false;
                }
            });
        },
        editItem(item) {
            this.$router.push(`/admin/post/edit/`+item.id);
        }
    }
  }
</script>
