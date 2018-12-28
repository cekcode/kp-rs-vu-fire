<template>
<div>
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
                    <v-btn slot="activator" color="primary" dark class="mb-2">New Peran</v-btn>
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
                :headers="headerperans"
                :items="perans"
                class="elevation-1"
                >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.name }}</td>
                    <td class="justify-center layout px-0">
                    <v-icon small class="mr-2" @click="editItemPeran(props.item)">
                        edit
                    </v-icon>
                    <v-icon small @click="deleteItemPeran(props.item)">
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
                <v-dialog v-model="dialog1" max-width="500px">
                    <v-btn slot="activator" color="primary" dark class="mb-2">New Kategori</v-btn>
                <v-card>
                <v-card-title>
                    <span class="headline">{{ formTitleKategori }}</span>
                </v-card-title>

                <v-card-text>
                    <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12 sm6 md12>
                        <v-text-field v-model="editedItemKategori.name" label="Nama Kategori"></v-text-field>
                        </v-flex>
                    </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="close1">Cancel</v-btn>
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
                    <td>{{ props.item.peranName }}</td>
                    <td class="justify-center layout px-0">
                    <v-icon small class="mr-2" @click="editItemKategori(props.item)">
                        edit
                    </v-icon>
                    <v-icon small @click="deleteItemPeran(props.item)">
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
</div>
</template>

<script>
import { mapState } from 'vuex';
const fb = require('@/firebaseConfig.js');

export default {
    name: 'peran-dan-kategori',
    data () {
        return {
            dialog: false,
            dialog1: false,
            headerperans: [
                {
                text: 'Nama Peran',
                align: 'left',
                sortable: false,
                value: 'name'
                },
                { text: '', value: 'name', sortable: false }
            ],
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
            editedItem: {
                id:'',
                name: ''
            },
            defaultItem: {
                name: ''
            },
            defaultItemKategori: {
                name: ''
            },
            editedItemKategori: {
                name: ''
            }
        }
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
      dialog1 (val) {
        val || this.close()
      }
    },
    computed: {
        ...mapState(['currentUser', 'perans','categories']),
        formTitlePeran () {
            return this.editedIndex === -1 ? 'New Peran' : 'Edit Peran'
        },
        formTitleKategori () {
            return this.editedIndex === -1 ? 'New Kategori' : 'Edit Kategori'
        },
        slug: function() {
            var slug = this.sanitizeTitle(this.editedItem.name);
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
        editItemPeran (item) {
            this.editedIndex = this.perans.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItemPeran (item) {
            const index = this.perans.indexOf(item)
            confirm('Kamu yakin ingin menghapus ini?') && this.perans.splice(index, 1)
        },

        editItemKategori (item) {
            this.editedIndex = this.categories.indexOf(item)
            this.editedItemKategori = Object.assign({}, item)
            this.dialog1 = true
        },

        close () {
            this.dialog = false
            setTimeout(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
            }, 300)
        },
        close1 () {
            this.dialog1 = false
            setTimeout(() => {
            this.editedItemKategori = Object.assign({}, this.defaultItem)
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
        save () {
            if (this.editedIndex > -1) {
            Object.assign(this.perans[this.editedIndex], this.editedItem)
            } else {
            this.perans.push(this.editedItem)
            }
            this.close()
        }
    }
}
</script>
