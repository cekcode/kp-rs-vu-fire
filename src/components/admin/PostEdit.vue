<template>
<v-container grid-list-md text-xs-center >
    <v-card>
        <v-progress-circular
        v-if="performingRequest"
        :size="70"
        color="primary"
        indeterminate
        ></v-progress-circular>
        <v-card-title>
            <span class="headline">New Post</span>
        </v-card-title>
        <v-card-text>
                <v-form @submit.prevent ref="form" v-model="valid" lazy-validation>
                    <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
                        <v-btn
                        @click.native="selectFile"
                        v-if="!uploadEnd && !uploading && First == false">
                            Upload Gambar Utama
                            <v-icon
                            right
                            aria-hidden="true">
                            add_a_photo
                            </v-icon>
                        </v-btn>
                        <input
                        hidden
                        id="files"
                        type="file"
                        name="file"
                        ref="uploadInput"
                        accept="image/*"
                        :multiple="false"
                        @change="detectFiles($event)" />
                        <v-progress-circular
                            v-if="uploading && !uploadEnd"
                            :size="100"
                            :width="15"
                            :rotate="360"
                            :value="progressUpload"
                            color="primary">
                            %
                        </v-progress-circular>

                        <img
                            v-if="uploadEnd"
                            :src="downloadURL"
                            width="100%" />
                        <img
                            v-if="First == true" width="100%" height="300px"
                            :src="this.editedItem.images" />
                            
                        <div v-if="uploadEnd">
                            <v-btn
                            class="ma-0"
                            dark
                            small
                            color="error"
                            @click="deleteImage()"
                            >
                            Delete
                            </v-btn>
                        </div>

                        <div v-if="First == true">
                            <v-btn
                            class="ma-0"
                            dark
                            small
                            color="error"
                            v-on:click="deleteImageFirst(editedItem.images)"
                            >
                            Delete
                            </v-btn>
                        </div>



                    </v-flex>
                    <v-flex xs12>
                        <v-text-field
                        v-model="editedItem.name"
                        :rules="nameRules"
                        :counter="100"
                        label="Nama Post"
                        required
                        ></v-text-field>
                        <input v-model="slug" id="slug" name="slug" hidden>
                    </v-flex>
                    <v-flex xs12>
                        <v-select
                        v-model="editedItem.category"
                        :items="categories"
                        item-text="name"
                        item-value="categories"
                        label="Pilih Kategori"
                        persistent-hint
                        return-object
                        single-line
                        required></v-select>
                    </v-flex>
                    <v-flex xs12>
                        <label for="">Content</label>
                        <vue-editor v-model="editedItem.content" useCustomImageHandler @imageAdded="handleImageAdded" id="editor" ref="description"></vue-editor>
                    </v-flex>
                    <v-flex xs12>
                       <v-radio-group v-model="editedItem.status">
                           <label>Status</label>
                           <v-radio
                                label="Publish"
                                color="green"
                                value="publish"
                            ></v-radio>
                            <v-radio
                                label="Draft"
                                color="red"
                                value="draft"
                            ></v-radio>
                       </v-radio-group>
                    </v-flex>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat to="/admin/post">Back</v-btn>
                    <v-btn color="blue darken-3" @click="save" :disabled="!valid" dark>Save</v-btn>
                    </v-card-actions>
                </v-form>
        </v-card-text>
    </v-card>
</v-container>
</template>

<script>
import { firestorage } from '@/firebaseConfig';
import { VueEditor } from 'vue2-editor';
import { mapState } from 'vuex';
const fb = require('@/firebaseConfig.js');

  export default {
    name: 'post-new',
    data: () => ({
        performingRequest: false,
        progressUpload: 0,
        fileName: '',
        uploadTask: '',
        First: true,
        uploading: false,
        uploadEnd: false,
        downloadURL: '',
        valid: false,
        nameRules: [
                v => !!v || 'Nama Kategori kosong'
            ],
        status: [
            {name: "Aktif",val: "true"},
            {name: "Tidak",val: "false"}
        ],
        editedItem: {
                name: '',
                slug: '',
                content: '',
                images: '',
                status: '',
                category:{
                    id: '',
                    name:''
                }
            }
    }),
    methods: {
        sanitizeTitle: function(title) {
            var slug = "";
            var titleLower = title.toLowerCase();
            slug = titleLower.replace(/e|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ/gi, 'e');
            slug = slug.replace(/a|á|à|ã|ả|ạ|ă|ắ|ằ|ẵ|ẳ|ặ|â|ấ|ầ|ẫ|ẩ|ậ/gi, 'a');
            slug = slug.replace(/o|ó|ò|õ|ỏ|ọ|ô|ố|ồ|ỗ|ổ|ộ|ơ|ớ|ờ|ỡ|ở|ợ/gi, 'o');
            slug = slug.replace(/u|ú|ù|ũ|ủ|ụ|ư|ứ|ừ|ữ|ử|ự/gi, 'u');
            slug = slug.replace(/đ/gi, 'd');
            slug = slug.replace(/\s*$/g, '');
            slug = slug.replace(/\s+/g, '-');
            return slug;
        },
        selectFile () {
            this.$refs.uploadInput.click()
        },
        detectFiles (e) {
            let fileList = e.target.files || e.dataTransfer.files
            Array.from(Array(fileList.length).keys()).map(x => {
                this.upload(fileList[x])
            })
        },
        upload (file) {
            this.fileName = file.name
            this.uploading = true
            this.uploadTask = firestorage.ref('images/' + file.name).put(file)
        },
        deleteImage () {
        firestorage
            .ref('images/' + this.fileName)
            .delete()
            .then(() => {
            this.uploading = false
            this.uploadEnd = false
            this.downloadURL = ''
            })
            .catch((error) => {
            console.error(`file delete error occured: ${error}`)
            })
        },
        deleteImageFirst(){
            var self = this
            self.First = false
            fb.postsCollection.doc(this.$route.params.id).get().then(doc => {
            let post = doc.data()
                let imageURL = post.images;
                var desertRef = firestorage.refFromURL(imageURL);
                desertRef.delete().then(function() {
                    console.log('sukses')
                }).catch(function(error) {
                    console.log(`Gagal: ${error}`)
                });
            }).catch(err => {
                console.log(err)
            })
        },
        getDownloadUrl (v) {
            this.imgUrl = v
        },
        handleImageAdded (file, Editor, cursorLocation) {
            let uploadTask1 = firestorage.ref('images/' + file.name).put(file)
            uploadTask1.on('state_changed', snapshot => {
            }, error => {
                console.error(`Upload error occured: ${error}`)
            }, () => {
                uploadTask1.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                console.log('File available at', downloadURL)
                Editor.insertEmbed(cursorLocation, 'image', downloadURL)
                })
            })
        },
        save(){
            if (this.$refs.form.validate()) {
                var self = this
                this.performingRequest = true;
                if(this.downloadURL.length > 0)
                {
                    // console.log(this.select.name)
                    fb.postsCollection.doc(this.$route.params.id).set({
                        name: this.editedItem.name,
                        slug: this.slug,
                        content: this.editedItem.content,
                        images: this.downloadURL,
                        category:{
                            id: this.editedItem.category.id,
                            name:this.editedItem.category.name
                        },
                        status: this.editedItem.status,
                        createdOn: this.editedItem.createdOn,
                        updatedOn: new Date()
                        
                    }).then(ref => {
                        this.performingRequest = false;
                        self.$swal({
                            title: "Success!",
                            text: "Post Baru"+this.editedItem.name,
                            icon: "success"
                        });
                        this.$router.push('/admin/post');
                    }).catch(err => {
                        this.performingRequest = false;
                        console.log(err)
                    })
                }else{
                    // console.log(this.select.name)
                    fb.postsCollection.doc(this.$route.params.id).set({
                        name: this.editedItem.name,
                        slug: this.slug,
                        content: this.editedItem.content,
                        images: this.editedItem.images,
                        category:{
                            id: this.editedItem.category.id,
                            name:this.editedItem.category.name
                        },
                        status: this.editedItem.status,
                        createdOn: this.editedItem.createdOn,
                        updatedOn: new Date()
                        
                    }).then(ref => {
                        this.performingRequest = false;
                        self.$swal({
                            title: "Success!",
                            text: "Post Baru"+this.editedItem.name,
                            icon: "success"
                        });
                        this.$router.push('/admin/post');
                    }).catch(err => {
                        this.performingRequest = false;
                        console.log(err)
                    })
                }
                
            }
        }
    },
    components: {
        VueEditor
    },
    watch: {
        uploadTask: function () {
        this.uploadTask.on('state_changed', sp => {
            this.progressUpload = Math.floor(sp.bytesTransferred / sp.totalBytes * 100)
        },
        null,
        () => {
            this.uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            this.uploadEnd = true
            this.downloadURL = downloadURL
            this.$emit('downloadURL', downloadURL)
            })
        })
        }
    },
    computed: {
        ...mapState(['currentUser','categories','posts']),
        slug: function() {
            var slug = this.sanitizeTitle(this.editedItem.name);
            return slug;
        }
    },
    created() {

        fb.postsCollection.doc(this.$route.params.id).get().then(doc => {
        let post = doc.data()
            this.editedItem = post
        }).catch(err => {
            console.log(err)
        })

        
    }
  }
</script>