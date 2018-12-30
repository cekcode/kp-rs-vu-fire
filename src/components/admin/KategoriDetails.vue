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
                <v-progress-circular
                v-if="performingRequest"
                :size="70"
                color="primary"
                indeterminate
                ></v-progress-circular>
                <div v-if="errorMsg !== ''" class="red--text text--darken-3">
                    <p>{{ errorMsg }}</p>
                </div>
                <v-dialog v-model="dialog" max-width="500px">
                    <v-btn slot="activator" color="primary" dark class="mb-2">New Kategori</v-btn>
                <v-card>
                <v-form @submit.prevent ref="form" v-model="valid" lazy-validation>
                    <v-card-title>
                        <span class="headline">{{ formTitleKategori }}</span>
                    </v-card-title>

                    <v-card-text>
                        <v-container grid-list-md>
                        <v-layout wrap>
                            <input v-model="editedItemKategori.id" hidden>
                            <v-flex xs12 sm6 md12>
                            <v-text-field v-model="editedItemKategori.name" label="Nama Kategori" :rules="nameRules"></v-text-field>
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
                                required
                                :rules="peranRules"></v-select>
                            </v-flex>
                        </v-layout>
                        </v-container>
                    </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
                            <v-btn color="blue darken-1" flat @click="save" :disabled="!valid">Save</v-btn>
                        </v-card-actions>
                    </v-form>
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
                    <v-icon color="orange" medium class="mr-2" @click="editItemKategori(props.item)">
                        edit
                    </v-icon>
                    <v-icon color="red" medium @click="deleteItemKategori(props.item)">
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
            performingRequest: false,
            errorMsg: '',
            nameRules: [
                v => !!v || 'Nama Kategori kosong'
            ],
            peranRules: [
                v => !!v || 'Peran kosong'
            ],
            valid: true,
            dialog: false,
            headercategories: [
                {
                text: 'Nama Kategori',
                align: 'left',
                // sortable: false,
                value: 'name'
                },
                { text: 'Terhubung ke peran' ,value: 'peran.name' },
                { text: '', sortable: false }
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
                    name:''
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
            this.$refs.form.reset()
            setTimeout(() => {
            this.editedItemKategori = Object.assign({}, this.defaultItemKategori)
            this.select = Object.assign({}, this.defaultSelect)
            this.editedIndex = -1
            }, 300)
        },
        save () {
        if (this.$refs.form.validate()) {
            var self = this
            if (this.editedIndex > -1) {
                this.performingRequest = true;
                fb.categoriesCollection.doc(this.editedItemKategori.id).set({
                    name: this.editedItemKategori.name,
                    slug: this.slug,
                    peran:{
                        id: this.editedItemKategori.peran.id,
                        name:this.editedItemKategori.peran.name
                    }
                }).then((ref) => {
                    this.performingRequest = false;
                    this.close()
                    self.$swal({
                        title: "Success!",
                        text: "Edit Kategori "+this.editedItemKategori.name,
                        icon: "success"
                    });
                    Object.assign(this.categories[this.editedIndex], this.editedItemKategori)
                 })
                .catch((error) => {
                    this.performingRequest = false;
                    alert("Error adding document: ", error);
                });
            } else {
                this.performingRequest = true;
                // console.log(this.select.name)
                fb.categoriesCollection.add({
                    name: this.editedItemKategori.name,
                    slug: this.slug,
                    peran:{
                        id: this.editedItemKategori.peran.id,
                        name:this.editedItemKategori.peran.name
                    }
                    
                }).then(ref => {
                    this.performingRequest = false;
                    this.close()
                    self.$swal({
                        title: "Success!",
                        text: "Kategori Baru"+this.editedItemKategori.name,
                        icon: "success"
                    });
                }).catch(err => {
                    this.performingRequest = false;
                    console.log(err)
                })
            }
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
                this.performingRequest = true;
                fb.categoriesCollection.doc(item.id).delete().then((res) => {
                    self.$swal({
                        title: "Success!",
                        text: "Delete Kategori "+item.name,
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
        }
    }
}
</script>

