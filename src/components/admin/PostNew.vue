<template>
<v-container grid-list-md text-xs-center >
    <v-card>
        <v-card-title>
            <span class="headline">New Post</span>
        </v-card-title>
        <v-card-text>
                <v-form v-model="valid">
                    <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
                        <v-btn
                        @click.native="selectFile"
                        v-if="!uploadEnd && !uploading">
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
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field
                        v-model="name"
                        :rules="nameRules"
                        :counter="10"
                        label="Nama Post"
                        required
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-select
                        :items="items"
                        label="Kategori"
                        ></v-select>
                    </v-flex>
                    <v-flex xs12>
                        <label for="">Content</label>
                        <vue-editor useCustomImageHandler @imageAdded="handleImageAdded" id="editor" ref="description"></vue-editor>
                    </v-flex>
                    <v-flex xs12>
                       <v-radio-group>
                           <label for="">Status</label>
                           <v-radio
                                label="Aktif"
                                color="green"
                                value="true"
                            ></v-radio>
                            <v-radio
                                label="Tidak Aktif"
                                color="red"
                                value="false"
                            ></v-radio>
                       </v-radio-group>
                    </v-flex>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat>Back</v-btn>
                    <v-btn color="grey darken-3" dark>Clear</v-btn>
                    <v-btn color="blue darken-3" dark>Save</v-btn>
                    </v-card-actions>
                </v-form>
        </v-card-text>
    </v-card>
</v-container>
</template>

<script>
import { firestorage } from '@/firebaseConfig';
import { VueEditor } from 'vue2-editor';

  export default {
    name: 'post-new',
    data: () => ({
        progressUpload: 0,
        fileName: '',
        uploadTask: '',
        uploading: false,
        uploadEnd: false,
        downloadURL: '',
        valid: false,
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
        items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
        status: [
            {name: "Aktif",val: "true"},
            {name: "Tidak",val: "false"}
            ]
    }),
    methods: {
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
    }
  }
</script>
content_copy
Name

