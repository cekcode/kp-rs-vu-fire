<template>
    <span>
        <v-navigation-drawer v-if="!isAuthenticated" app v-model="drawer" class="blue darken-4" disable-resize-watcher>
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

        <v-navigation-drawer v-else
        :clipped="$vuetify.breakpoint.lgAndUp"
        v-model="drawer1"
        fixed
        app
        >
        <v-list dense>
            <template v-for="item in menus">
            <v-layout
                v-if="item.heading"
                :key="item.heading"
                row
                align-center
            >
                <v-flex xs6>
                <v-subheader v-if="item.heading">
                    {{ item.heading }}
                </v-subheader>
                </v-flex>
                <v-flex xs6 class="text-xs-center">
                <a href="#!" class="body-2 black--text">EDIT</a>
                </v-flex>
            </v-layout>
            <v-list-group
                v-else-if="item.children"
                v-model="item.model"
                :key="item.text"
                :prepend-icon="item.model ? item.icon : item['icon-alt']"
                append-icon=""
            >
                <v-list-tile slot="activator">
                <v-list-tile-content>
                    <v-list-tile-title>
                    {{ item.text }}
                    </v-list-tile-title>
                </v-list-tile-content>
                </v-list-tile>
                <v-list-tile
                v-for="(child, i) in item.children"
                :key="i" :to="child.to"
                >
                <v-list-tile-action v-if="child.icon">
                    <v-icon>{{ child.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>
                    {{ child.text }}
                    </v-list-tile-title>
                </v-list-tile-content>
                </v-list-tile>
            </v-list-group>
            <v-list-tile v-else :key="item.text" :to="item.to" >
                <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                <v-list-tile-title>
                     {{ item.text }}
                </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            </template>
        </v-list>
        </v-navigation-drawer>

        <v-toolbar v-if="!isAuthenticated" app color="blue darken-3" dark>
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
            <div class="hidden-sm-and-down">
                <v-btn flat to="/login">SIGN IN</v-btn>
                <v-btn color="blue-grey darken-3" to="/join">JOIN</v-btn>
                <v-btn color="blue-grey darken-3" @click="dialog = true">Buku Tamu</v-btn>
            </div>
            
        </v-toolbar>

        <v-toolbar v-else
        :clipped-left="$vuetify.breakpoint.lgAndUp"
        color="blue darken-3"
        dark
        app
        fixed
        >
        <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
            <v-toolbar-side-icon @click.stop="drawer1 = !drawer1"></v-toolbar-side-icon>
            <span class="hidden-sm-and-down">Administrator</span>
        </v-toolbar-title>
        <v-text-field
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="search"
            label="Search"
            class="hidden-sm-and-down"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn icon>
            <v-icon>apps</v-icon>
        </v-btn>
        <v-btn icon>
            <v-icon>notifications</v-icon>
        </v-btn>
        <v-btn icon>
            <v-icon @click="logout">logout</v-icon>
        </v-btn>
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
            drawer1: null,
            items: [
                { icon:'home', title: 'Beranda' ,to:'/'},
                { icon:'business', title: 'Profile',to:'/profile' }, 
                { icon:'people', title: 'Dokter',to:'/dokter' },
                { icon:'assignment', title: 'Informasi' ,to:'/informasi'},
                { icon:'contacts', title: 'Kontak Kami' ,to:'/kontak-kami' },
                { icon:'work', title: 'Karir' ,to:'/karir'}
            ],
            menus: [
                { icon: 'dashboard', text: 'Dashboard' , to: '/admin/dashboard'},
                { icon: 'business', text: 'Profile' , to: '/admin/profile'},
                {
                icon: 'keyboard_arrow_up',
                'icon-alt': 'people',
                text: 'Dokter',
                children: [
                    { icon: 'person', text: 'Daftar Dokter' , to: '/admin/daftar-dokter'},
                    { icon: 'alarm', text: 'Jadwal Dokter' , to: '/admin/jadwal-dokter'}
                ]
                },
                {
                icon: 'keyboard_arrow_up',
                'icon-alt': 'assignment',
                text: 'Informasi',
                children: [
                    { icon: 'class', text: 'Peran & Kategori' , to: '/admin/peran-dan-kategori'},
                    { icon: 'receipt', text: 'Posts', to: '/admin/post'}
                ]
                },
                {
                icon: 'keyboard_arrow_up',
                'icon-alt': 'work',
                text: 'Karir',
                children: [
                    { icon: 'sort', text: 'Lowongan Kerja' },
                    { icon: 'send', text: 'Pelamar Kerja' }
                ]
                },
                { icon: 'mail_outline', text: 'Buku Tamu' },
                {
                icon: 'keyboard_arrow_up',
                'icon-alt': 'contacts',
                text: 'Kontak Kami',
                children: [
                    { icon: 'add', text: 'Address' }
                ]
                },
                { icon: 'settings', text: 'Settings' },
                { icon: 'help', text: 'Help' }
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