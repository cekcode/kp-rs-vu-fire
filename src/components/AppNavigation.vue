<template>
    <span>
        <v-navigation-drawer app v-model="drawer" class="blue darken-4" disable-resize-watcher>
            <v-list>
                <v-btn color="blue darken-2" dark @click="dialog = true">Buku Tamu</v-btn>
                <template v-for="(item, index) in items">
                    <v-list-tile :key="index">
                        <v-list-tile-content>
                            <router-link :to="item.to">
                                <v-icon medium color="white">{{item.icon}} </v-icon> {{item.title}}
                            </router-link>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-divider :key="`divider-${index}`"></v-divider>
                </template>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar app color="blue darken-3" dark>
            <v-toolbar-side-icon class="hidden-md-and-up" @click="drawer = !drawer"></v-toolbar-side-icon>
            <v-spacer class="hidden-md-and-up"></v-spacer>
            <router-link to="/">
                <v-toolbar-title to="/">{{appTitle}}</v-toolbar-title>
            </router-link>
            <v-btn flat class="hidden-sm-and-down" to="/">Beranda</v-btn>
            <v-btn flat class="hidden-sm-and-down" to="/profile">Profile</v-btn>
            <v-btn flat class="hidden-sm-and-down" to="/dokter">Dokter</v-btn>
            <v-btn flat class="hidden-sm-and-down" to="/informasi">Informasi</v-btn>
            <v-btn flat class="hidden-sm-and-down" to="/kontak-kami">Kontak Kami</v-btn>
            <v-btn flat class="hidden-sm-and-down" to="/karir">Karir</v-btn>
            <v-spacer class="hidden-sm-and-down"></v-spacer>
            <div v-if="!isAuthenticated" class="hidden-sm-and-down">
                <v-btn flat to="/login">SIGN IN</v-btn>
                <v-btn color="blue-grey darken-3" to="/join">JOIN</v-btn>
                <v-btn color="blue-grey darken-3" @click="dialog = true">Buku Tamu</v-btn>
            </div>
            <div class="hidden-sm-and-down" v-else>
                <v-btn outline color="light darken-2" @click="logout">Logout</v-btn>
            </div>
        </v-toolbar>

        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                <span class="headline">Buku Tamu</span>
                </v-card-title>
                <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                    <v-flex xs12>
                        <v-text-field label="Nama*" required></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field label="Email*" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-text-field label="No Handphone*" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-select
                        :items="['0-17', '18-29', '30-54', '54+']"
                        label="Umur*"
                        required
                        ></v-select>
                    </v-flex>
                    <v-flex xs12>
                        <v-textarea
                        name="input-7-1"
                        label="Pesan"
                        ></v-textarea>
                    </v-flex>
                     <v-checkbox
                    v-model="checkbox"
                    :rules="[v => !!v || 'Kamu harus verifikasi untuk Melanjutkan!']"
                    label="Verifikasi Bukan Robot"
                    required
                    ></v-checkbox>
                    </v-layout>
                </v-container>
                <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
                <v-btn color="blue darken-1" flat @click="dialog = false">Save</v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
    </span>
</template>

<script>
const fb = require('../firebaseConfig.js')
export default {
    name: 'AppNavigation',
    data() {
        return {
            checkbox:'',
            appTitle: 'RS.Brayat Minulya',
            dialog: false,
            drawer: false,
            items: [
                { icon:'home', title: 'Beranda' ,to:'/'},
                { icon:'business', title: 'Profile',to:'/profile' }, 
                { icon:'people', title: 'Dokter',to:'/dokter' },
                { icon:'assignment', title: 'Informasi' ,to:'/informasi'},
                { icon:'contacts', title: 'Kontak Kami' ,to:'/kontak-kami' },
                { icon:'work', title: 'Karir' ,to:'/karir'}
            ]
        };
    },
    computed: {
        isAuthenticated() {
            return this.$store.getters.isAuthenticated;
        }
    },
    methods: {
        logout() {
            fb.auth.signOut().then(() => {
                this.$store.dispatch('clearData')
                this.$router.push('/login')
            }).catch(err => {
                console.log(err)
            })
        }
    }
};
</script>
<style scoped>
a {
    color: white;
    text-decoration: none;
}
</style>