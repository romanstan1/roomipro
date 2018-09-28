import config from './firebase-config.js'
import firebase from 'firebase/app'
import 'firebase/auth'

firebase.initializeApp(config);

const auth = firebase.auth();
const persistence = firebase.auth.Auth.Persistence

const secondaryAuth = firebase.initializeApp(config, "Secondary").auth()

export {auth, persistence, secondaryAuth};
