import config from './firebase-config.js'
import firebase from 'firebase'

firebase.initializeApp(config);

const database = firebase.database();
const auth = firebase.auth();

export {database, auth};
