import firebase from 'firebase'
import 'firebase/firestore'

// firebase init goes here
const config = {
	apiKey: "AIzaSyDttXJ0CcYQJ6wFe6xQaDDqAbhlP05O00Y",
    authDomain: "rs-brayat.firebaseapp.com",
    databaseURL: "https://rs-brayat.firebaseio.com",
    projectId: "rs-brayat",
    storageBucket: "rs-brayat.appspot.com",
    messagingSenderId: "749163371696"
}
firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const firestorage = firebase.storage()
const currentUser = auth.currentUser

// date issue fix according to firebase
const settings = {
    timestampsInSnapshots: true
}
db.settings(settings)

// firebase collections
const usersCollection = db.collection('users')
const peransCollection = db.collection('perans')
const categoriesCollection = db.collection('categories')


export {
    db,
    auth,
    firestorage,
    currentUser,
    usersCollection,
    peransCollection,
    categoriesCollection
}