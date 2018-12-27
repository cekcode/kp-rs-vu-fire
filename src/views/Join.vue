<template>
    <v-container fill-height>
        <v-layout align-center justify-center>
            <transition name="fade">
                <div v-if="performingRequest" class="loading">
                    <p>Loading...</p>
                </div>
            </transition>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Join Form</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form @submit.prevent ref="form" v-model="valid" lazy-validation>
                            <v-text-field prepend-icon="person" name="name" label="Name" type="text"
                                          v-model.trim="signupForm.name" required :rules="nameRules">
                            </v-text-field>
                            <v-text-field prepend-icon="person" name="title" label="Title" id="title"
                                          type="text" required v-model.trim="signupForm.title" :rules="titleRules">
                            </v-text-field>
                            <v-text-field prepend-icon="person" name="email" label="Email" type="email"
                                          v-model.trim="signupForm.email" :rules="emailRules" required>
                            </v-text-field>
                            <v-text-field prepend-icon="lock" name="password" label="Password" id="password"
                                          type="password" required v-model.trim="signupForm.password" :rules="passwordRules">
                            </v-text-field>
                            <v-checkbox
                                v-model="signupForm.checkbox"
                                :rules="checkboxRules"
                                label="Verifikasi Bukan Robot"
                                required>
                            </v-checkbox>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" :disabled="!valid" @click="signup">Join</v-btn>
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
    name: 'Join',
    data() {
        return {
            nameRules: [
                v => !!v || 'Nama kosong',
                v => (v && v.length >= 2) || 'Title minimal 2 karakter'
            ],
            titleRules: [
                v => !!v || 'Title kosong',
                v => (v && v.length >= 2) || 'Title minimal 2 karakter'
            ],
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
            valid: true,
            select: null,
            performingRequest: false,
            errorMsg: '',
            signupForm: {
                    name: '',
                    title: '',
                    email: '',
                    password: '',
                    checkbox: false
                }
        };
    },
    methods: {
        signup() {
        if (this.$refs.form.validate()) {
            this.performingRequest = true;
                fb.auth.createUserWithEmailAndPassword(this.signupForm.email, this.signupForm.password)
                .then(credential=> {  // CHANGED
                this.$store.commit('setCurrentUser', credential.user);  // CHANGED
                // create user obj
                fb.usersCollection.doc(credential.user.uid).set({  //CHANGED
                    name: this.signupForm.name,
                    title: this.signupForm.title
                }).then(() => {
                    this.$store.dispatch('fetchUserProfile');
                    this.performingRequest = false;
                    this.$router.push('/admin/dashboard')
                }).catch(err => {
                    console.log(err);
                    this.performingRequest = false;
                    this.errorMsg = err.message
                })
                }).catch(err => {
                console.log(err);
                this.performingRequest = false;
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