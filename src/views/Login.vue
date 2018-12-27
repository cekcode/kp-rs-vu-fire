<template>
    <v-container fluid>
        <transition name="fade">
            <div v-if="performingRequest" class="loading">
                <p>Loading...</p>
            </div>
        </transition>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form Administrator</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <v-btn
                    slot="activator"
                    :href="source"
                    icon
                    large
                    target="_blank"
                  >
                    <v-icon large>lock</v-icon>
                  </v-btn>
                  <span>Security</span>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent ref="form" v-model="valid" lazy-validation>
                  <v-text-field v-model.trim="loginForm.email" :rules="emailRules" prepend-icon="mail" name="email" label="Email" type="email"></v-text-field>
                  <v-text-field v-model.trim="loginForm.password" :rules="passwordRules" id="password" prepend-icon="vpn_key" name="password" label="Password" type="password"></v-text-field>
                  <v-checkbox
                    v-model="loginForm.checkbox"
                    :rules="checkboxRules"
                    label="Verifikasi Bukan Robot"
                    required>
                  </v-checkbox>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" :disabled="!valid" @click="login">Login</v-btn>
                    <v-btn @click="clear">clear</v-btn>
                  </v-card-actions>
                </v-form>
                <transition name="fade">
                    <div v-if="errorMsg !== ''" class="red--text text--darken-3">
                        <p>{{ errorMsg }}</p>
                    </div>
                </transition>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
</template>
<script>
const fb = require('../firebaseConfig.js')
export default {
    name: 'Signin',
    data: () => ({
      valid: true,
      select: null,
      performingRequest: false,
      errorMsg: '',
      drawer: null,
      emailRules: [
          v => !!v || 'E-mail kosong',
          v => /.+@.+/.test(v) || 'E-mail harus valid'
      ],
      passwordRules: [
          v => !!v || 'Password kosong',
          v => (v && v.length >= 6) || 'Password minimal 6 karakter'
      ],
      checkboxRules: [
          v => !!v || 'Verifikasi kosong'
      ],
      loginForm: {
        email: '',
        password: '',
        checkbox: false
      }
    }),
    props: {
      source: String
    },
    methods: {
        login() {
          if (this.$refs.form.validate()) {
            this.performingRequest = true
            fb.auth.signInWithEmailAndPassword(this.loginForm.email, this.loginForm.password).then(credential => {
                this.$store.commit('setCurrentUser', credential.user)
                this.$store.dispatch('fetchUserProfile')
                this.performingRequest = false
                this.$router.push('/admin/dashboard')
            }).catch(err => {
                console.log(err)
                this.performingRequest = false
                this.errorMsg = err.message
            })
          }
        },
        clear () {
          this.$refs.form.reset()
        }
    }
};
</script>
<style scoped>
</style>