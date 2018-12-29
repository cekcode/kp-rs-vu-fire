<template>
<v-container fluid fill-height>
    <v-layout justify-center>
        <v-flex xs12>
            <v-card>
                <v-toolbar flat color="white">
                <v-toolbar-title>Kategori</v-toolbar-title>
                <v-divider
                    class="mx-2"
                    inset
                    vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                    <v-btn slot="activator" color="primary" dark class="mb-2">New Kategori</v-btn>
                <v-card>
                <v-card-title>
                    <span class="headline">{{ formTitleKategori }}</span>
                </v-card-title>

                <v-card-text>
                    <v-container grid-list-md>
                    <v-layout wrap>
                        <input v-model="editedItemKategori.id" hidden>
                        <v-flex xs12 sm6 md12>
                          <v-text-field v-model="editedItemKategori.name" label="Nama Kategori"></v-text-field>
                        </v-flex>
                        <input v-model="slug" id="slug" name="slug" hidden>
                        <v-flex xs12 sm6 md12>
                            <v-select
                            v-model="editedItemKategori.peran"
                            :items="perans"
                            item-text="name"
                            item-value="perans"
                            label="Pilih Peran"
                            persistent-hint
                            return-object
                            single-line
                            ></v-select>
                        </v-flex>
                    </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
                    <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
                </v-card-actions>
                </v-card>
                </v-dialog>
                </v-toolbar>
                <v-data-table
                :headers="headercategories"
                :items="categories"
                class="elevation-1"
                >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.peran.name }}</td>
                    <td class="justify-center layout px-0">
                    <v-icon small class="mr-2" @click="editItemKategori(props.item)">
                        edit
                    </v-icon>
                    <v-icon small @click="deleteItemKategori(props.item)">
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
import { mapState } from 'vuex';
const fb = require('@/firebaseConfig.js');
export default {
    name: 'KategoriDetails',
    data () {
        return {
            dialog: false,
            headercategories: [
                {
                text: 'Nama Kategori',
                align: 'left',
                sortable: false,
                value: 'name'
                },
                { text: 'Terhubung ke peran', value: 'Terhubung ke peran', sortable: false },
                { text: '', value: 'name', sortable: false }
            ],
            editedIndex: -1,
            defaultSelect:{
                id:'',
                name: '',
                peran:{
                    id: '',
                    name:''
                }
            },
            defaultItemKategori: {
                id:'',
                name: '',
                peran:{
                    id: '',
                    name:''
                }
            },
            editedItemKategori: {
                id:'',
                name: '',
                peran:{
                    id: '',
                    name:'Pilih Peran'
                }
            }
        }
    },
    watch: {
      dialog (val) {
        val || this.close()
      }
    },
    computed: {
        ...mapState(['currentUser','categories','perans']),
        formTitleKategori () {
            return this.editedIndex === -1 ? 'New Kategori' : 'Edit Kategori'
        },
        slug: function() {
            var slug = this.sanitizeTitle(this.editedItemKategori.name);
            return slug;
        }
    },
    methods: {
        sanitizeTitle: function(title) {
            var slug = "";
            // Change to lower case
            var titleLower = title.toLowerCase();
            // Letter "e"
            slug = titleLower.replace(/e|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ/gi, 'e');
            // Letter "a"
            slug = slug.replace(/a|á|à|ã|ả|ạ|ă|ắ|ằ|ẵ|ẳ|ặ|â|ấ|ầ|ẫ|ẩ|ậ/gi, 'a');
            // Letter "o"
            slug = slug.replace(/o|ó|ò|õ|ỏ|ọ|ô|ố|ồ|ỗ|ổ|ộ|ơ|ớ|ờ|ỡ|ở|ợ/gi, 'o');
            // Letter "u"
            slug = slug.replace(/u|ú|ù|ũ|ủ|ụ|ư|ứ|ừ|ữ|ử|ự/gi, 'u');
            // Letter "d"
            slug = slug.replace(/đ/gi, 'd');
            // Trim the last whitespace
            slug = slug.replace(/\s*$/g, '');
            // Change whitespace to "-"
            slug = slug.replace(/\s+/g, '-');
            
            return slug;
        },
        editItemKategori (item) {
            this.editedIndex = this.categories.indexOf(item)
            this.editedItemKategori = Object.assign({}, item)
            this.dialog = true
        },
        close () {
            this.dialog = false
            setTimeout(() => {
            this.editedItemKategori = Object.assign({}, this.defaultItemKategori)
            this.select = Object.assign({}, this.defaultSelect)
            this.editedIndex = -1
            }, 300)
        },
        save () {
            if (this.editedIndex > -1) {
                fb.categoriesCollection.doc(this.editedItemKategori.id).set({
                    name: this.editedItemKategori.name,
                    slug: this.slug,
                    peran:{
                        id: this.editedItemKategori.peran.id,
                        name:this.editedItemKategori.peran.name
                    }
                }).then((ref) => {
                    this.close()
                    Object.assign(this.categories[this.editedIndex], this.editedItemKategori)
                 })
                .catch((error) => {
                    alert("Error adding document: ", error);
                });
            } else {
                // console.log(this.select.name)
                fb.categoriesCollection.add({
                    name: this.editedItemKategori.name,
                    slug: this.slug,
                    peran:{
                        id: this.editedItemKategori.peran.id,
                        name:this.editedItemKategori.peran.name
                    }
                    
                }).then(ref => {
                    this.close()
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        deleteItemKategori(item) {
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
                fb.categoriesCollection.doc(item.id).delete().then((res) => {
                    self.$swal({
                        title: "Success!",
                        text: "Delete Kategori "+item.name,
                        icon: "success"
                    });
                    return true;
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

