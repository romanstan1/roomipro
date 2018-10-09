import config from './firebase-config.js'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

firebase.initializeApp(config);

const auth = firebase.auth()
const persistence = firebase.auth.Auth.Persistence
const secondaryAuth = firebase.initializeApp(config, "Secondary").auth()
const firestore = firebase.firestore()
const arrayUnion = firebase.firestore.FieldValue.arrayUnion
const settings = {timestampsInSnapshots: true}

firestore.settings(settings)
firestore.enablePersistence()

export {auth, persistence, secondaryAuth, firestore, arrayUnion}
