<template>
<v-container fluid fill-height>
    <v-layout justify-center>
        <v-flex xs12>
            <v-card>
                <v-toolbar flat color="white">
                <v-toolbar-title>Peran</v-toolbar-title>
                <v-divider
                    class="mx-2"
                    inset
                    vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                    <v-btn slot="activator" color="primary" dark class="mb-2" disabled hidden>New Peran</v-btn>
                <v-card>
                <v-card-title>
                    <span class="headline">{{ formTitlePeran }}</span>
                </v-card-title>

                <v-card-text>
                    <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12 sm6 md12>
                        <input v-model="editedItem.id" hidden>
                        <v-text-field v-model="editedItem.name" label="Nama Peran"></v-text-field>
                        <input v-model="slug" id="slug" name="slug" hidden>
                        </v-flex>
                    </v-layout>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
                    <v-btn color="blue darken-1" flat @click="saveperans">Save</v-btn>
                </v-card-actions>
                </v-card>
                </v-dialog>
                </v-toolbar>
                <v-data-table
                :headers="headers"
                :items="perans"
                class="elevation-1"
                >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.name }}</td>
                    <td class="justify-center layout px-0">
                    <v-icon small class="mr-2" @click="editItemPeran(props.item)" disabled hidden>
                        edit
                    </v-icon>
                    <v-icon small @click="deleteItemPeran(props.item)" disabled hidden>
                        delete
                    </v-icon>
                    </td>
                </template>
                <template slot="no-data">
                    Tidak Ada Data Peran
                </template>
                </v-data-table>
            </v-card>
        </v-flex>
    </v-layout>
</v-container>
</template>

<script>
import { mapState } from 'vuex'
const fb = require('@/firebaseConfig.js')

export default {
    name:'PeranDetails',
    data () {
        return {
            dialog: false,
            headers: [
                {
                text: 'Nama Peran',
                align: 'left',
                sortable: false,
                value: 'name'
                },
                { text: '', value: 'name', sortable: false }
            ],
            editedIndex: -1,
            editedItem: {
                id:'',
                name: ''
            },
            defaultItem: {
                name: ''
            }
        }
    },
    watch: {
      dialog (val) {
        val || this.close()
      }
    },
    computed: {
        ...mapState(['currentUser', 'perans']),
        formTitlePeran () {
            return this.editedIndex === -1 ? 'New Peran' : 'Edit Peran'
        },
        slug: function() {
            var slug = this.sanitizeTitle(this.editedItem.name)
            return slug;
        }
    },
    methods: {
        sanitizeTitle: function(title) {
            var slug = ""
            // Change to lower case
            var titleLower = title.toLowerCase()
            // Letter "e"
            slug = titleLower.replace(/e|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ/gi, 'e')
            // Letter "a"
            slug = slug.replace(/a|á|à|ã|ả|ạ|ă|ắ|ằ|ẵ|ẳ|ặ|â|ấ|ầ|ẫ|ẩ|ậ/gi, 'a')
            // Letter "o"
            slug = slug.replace(/o|ó|ò|õ|ỏ|ọ|ô|ố|ồ|ỗ|ổ|ộ|ơ|ớ|ờ|ỡ|ở|ợ/gi, 'o')
            // Letter "u"
            slug = slug.replace(/u|ú|ù|ũ|ủ|ụ|ư|ứ|ừ|ữ|ử|ự/gi, 'u')
            // Letter "d"
            slug = slug.replace(/đ/gi, 'd')
            // Trim the last whitespace
            slug = slug.replace(/\s*$/g, '')
            // Change whitespace to "-"
            slug = slug.replace(/\s+/g, '-')
            
            return slug;
        },
        editItemPeran (item) {
            this.editedIndex = this.perans.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        close () {
            this.dialog = false
            setTimeout(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
            }, 300)
        },
        saveperans(){
            if (this.editedIndex > -1) {
                fb.peransCollection.doc(this.editedItem.id).set({
                    name: this.editedItem.name,
                    slug: this.slug
                }).then((ref) => {
                    this.close()
                    Object.assign(this.perans[this.editedIndex], this.editedItem)
                 })
                .catch((error) => {
                    alert("Error adding document: ", error);
                });
            } else {
                fb.peransCollection.add({
                    name: this.editedItem.name,
                    slug: this.slug
                }).then(ref => {
                    this.close()
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        deleteItemPeran(item) {
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
                    fb.peransCollection.doc(item.id).delete().then((res) => {
                        fb.categoriesCollection.where('peran.id', '==', item.id).get().then(function(querySnapshot){
                            querySnapshot.forEach(function(doc) {
                                    // console.log(doc.id, " => ", doc.data());
                                     fb.categoriesCollection.doc(doc.id).delete().then((res) => {
                                        console.log(doc.id);
                                     }).catch(function(error) {
                                        console.log("Error getting documents: ", error);
                                        });
                                self.$swal({
                                title: "Success!",
                                text: "Delete Peran "+item.name,
                                icon: "success"
                                });
                                return true;
                                });
                            }).catch(function(error) {
                            console.log("Error getting documents: ", error);
                            });
                    }).catch((error) => {
                        self.$swal({
                            title: "Oops...!",
                            text: error,
                            type: "error"
                        });
                    });
                }
                else{
                    return false;
                }
            });
        }
    }
}
</script>