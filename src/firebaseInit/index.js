import config from './firebase-config.js'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/messaging'
import 'firebase/firestore'

firebase.initializeApp(config);

const auth = firebase.auth()
const persistence = firebase.auth.Auth.Persistence
const secondaryAuth = firebase.initializeApp(config, "Secondary").auth()
const firestore = firebase.firestore()
const {arrayRemove, arrayUnion} = firebase.firestore.FieldValue
const settings = {timestampsInSnapshots: true}

firestore.settings(settings)
firestore.enablePersistence({experimentalTabSynchronization:true})


try {
  var messaging = firebase.messaging();
} catch (e) {
  console.log('Unable to Instantiate Firebase Messaing', e);
}

export {auth, persistence, secondaryAuth, firestore, arrayUnion, arrayRemove, messaging}
