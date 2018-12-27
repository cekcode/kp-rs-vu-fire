import Vue from 'vue'
import Vuex from 'vuex'
const fb = require('./firebaseConfig.js')

Vue.use(Vuex)
 
// handle page reload
fb.auth.onAuthStateChanged(user => {
    if (user) {
        store.commit('setCurrentUser', user)
        store.dispatch('fetchUserProfile')

        fb.usersCollection.doc(user.uid).onSnapshot(doc => {
            store.commit('setUserProfile', doc.data())
        })
        
        // realtime updates from our posts collection
        fb.peransCollection.onSnapshot(querySnapshot => {
            let peransArray = []
            querySnapshot.forEach(doc => {
                let peran = doc.data()
                peran.id = doc.id
                peransArray.push(peran)
            })

            store.commit('setPerans', peransArray)
        })
    }
})


export const store = new Vuex.Store({
    state: {
        currentUser: null,
        userProfile: {},
        perans: []
    },
    actions: {
        clearData({ commit }) {
            commit('setCurrentUser', null)
            commit('setUserProfile', {})
            commit('setPerans', null)
        },
        fetchUserProfile({ commit, state }) {
            fb.usersCollection.doc(state.currentUser.uid).get().then(res => {
                commit('setUserProfile', res.data())
            }).catch(err => {
                console.log(err)
            })
        }
    },
    mutations: {
        setCurrentUser(state, val) {
            state.currentUser = val
        },
        setUserProfile(state, val) {
            state.userProfile = val
        },
        setPerans(state, val) {
            if (val) {
                state.perans = val
            } else {
                state.pernas = []
            }
        }
    },
    getters: {
        isAuthenticated(state) {
            return state.currentUser !== null && state.currentUser !== undefined;
        }
    }
})


