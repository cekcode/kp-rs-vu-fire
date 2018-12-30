import Vue from 'vue';
import Vuex from 'vuex';
const fb = require('./firebaseConfig.js');

Vue.use(Vuex);

// handle page reload
fb.auth.onAuthStateChanged(user => {
    if (user) {
        store.commit('setCurrentUser', user);
        store.dispatch('fetchUserProfile');

        fb.usersCollection.doc(user.uid).onSnapshot(doc => {
            store.commit('setUserProfile', doc.data());
        });
        // realtime updates from our perans collection
        fb.peransCollection.onSnapshot(querySnapshot => {
            let peransArray = []
            querySnapshot.forEach(doc => {
                let peran = doc.data();
                peran.id = doc.id;
                peransArray.push(peran);
            });

            store.commit('setPerans', peransArray);
        });

        // realtime updates from our categories collection
        fb.categoriesCollection.onSnapshot(querySnapshot => {
            let categoriesArray = [];
            querySnapshot.forEach(doc => {
                let category = doc.data();
                category.id = doc.id;
                categoriesArray.push(category);
            });

            store.commit('setCategories', categoriesArray);
        });

        // realtime updates from our posts collection
        fb.postsCollection.onSnapshot(querySnapshot => {
            let postsArray = [];
            querySnapshot.forEach(doc => {
                let post = doc.data();
                post.id = doc.id;
                postsArray.push(post);
            });

            store.commit('setPosts', postsArray);
        });
    }
});

export const store = new Vuex.Store({
    state: {
        currentUser: null,
        userProfile: {},
        perans: [],
        categories: [],
        posts: []
    },
    actions: {
        clearData({ commit }) {
            commit('setCurrentUser', null)
            commit('setUserProfile', {})
            commit('setPerans', null)
            commit('setCategories', null)
        },
        fetchUserProfile({ commit, state }) {
        fb.usersCollection.doc(state.currentUser.uid).get().then(res => {
        commit('setUserProfile', res.data())
        }).catch(err => {
            console.log(err);
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
                state.perans = []
            }
        },
        setCategories(state, val) {
            if (val) {
                state.categories = val
            } else {
                state.categories = []
            }
        },
        setPosts(state, val) {
            if (val) {
                state.posts = val
            } else {
                state.posts = []
            }
        }
    },
    getters: {
        isAuthenticated(state) {
            return state.currentUser !== null && state.currentUser !== undefined;
        }
    }
});
