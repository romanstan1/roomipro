import {auth, persistence, firestore, messaging} from './initialize'

export const onAuthStateChanged = (logInSuccessful, notLoggedIn) => {
  auth.onAuthStateChanged(user => {
    if(user) {
      firestore.collection('users').doc(user.uid).get().then(userData => {
        const thisUser = userData.data()
        logInSuccessful({...user, ...thisUser})
      })
    } else {
      notLoggedIn()
    }
  })
}
