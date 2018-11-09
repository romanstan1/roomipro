import {auth, persistence, firestore, messaging, arrayUnion, arrayRemove} from './initialize'
import {postNotificationApi} from 'modules/apis'

export const onAuthStateChanged = (logInSuccessful, notLoggedIn) => {
  auth.onAuthStateChanged(user => {
    if(user) {
      firestore.collection('users').doc(user.uid).onSnapshot(userData => {
        const thisUser = userData.data()
        logInSuccessful({
          ...thisUser,
          email: user.email,
          refreshToken: user.refreshToken,
          uid: user.uid
        })
      })
    } else {
      notLoggedIn()
    }
  })
}

export const handleBooking = (guest, addGuestBoolean, props) => {

  const {locations, selectedDate, selectedLocation, user, attendingOnDate, placeBooking} = props
  const locationRef = firestore.collection("locations")
  const bookingUser = { id: user.uid, name: user.firstName + ' ' + user.lastName}

  placeBooking(selectedLocation.id, selectedDate.id)

  const dateRef = locationRef
    .doc(selectedLocation.id)
    .collection('dates')
    .doc(`${selectedDate.id}`)

  dateRef
    .get()
    .then(doc => {
      if(guest && addGuestBoolean) dateRef.update({
        "id": selectedDate.id,
        "date": selectedDate.date,
        "people": arrayUnion({...bookingUser, guest: Math.floor(Date.now() / 1000) }),
        "seats": selectedLocation.seats
      })
      else if(guest && !addGuestBoolean) {
        const guest = doc.data().people.find(person => ((bookingUser.id === person.id) && person.guest))
        dateRef.update({
          "id": selectedDate.id,
          "date": selectedDate.date,
          "people": arrayRemove(guest),
          "seats": selectedLocation.seats
        })
      } else if(doc.exists && !attendingOnDate)
      dateRef.update({
        "id": selectedDate.id,
        "date": selectedDate.date,
        "people": arrayUnion(bookingUser),
        "seats": selectedLocation.seats
      })
      else if(doc.exists && attendingOnDate){
        const people = doc.data().people.filter(person => bookingUser.id !== person.id)
        dateRef.update({
          "id": selectedDate.id,
          "date": selectedDate.date,
          "people": people,
          "seats": selectedLocation.seats
        })
      } else dateRef.set({
        "id": selectedDate.id,
        "date": selectedDate.date,
        "people": [bookingUser],
        "seats": selectedLocation.seats
      })
    })
}

export const downloadLocationData = (startDate, endDate) => {

  const ref =  firestore.collection("locations")

  function getLocation(location) {
    return ref
    .doc(location.id)
    .collection("dates")
    .where("id", ">=", startDate.valueOf())
    .where("id", "<=", endDate.valueOf())
    .get()
    .then(querySnapshot => {
      let dates = []
      querySnapshot.forEach(doc => dates.push(doc.data()))
      return {...location, dates}
    })
  }

  return ref.get()
    .then(querySnapshot => {
      let locations = []
      querySnapshot.forEach(doc => locations.push(doc.data()))
      return locations
    })
    .then(async(locations) => {
      const data = await Promise.all(locations.map(location => getLocation(location)))
      return data
    })
}

export const subscribeToLocation = ({minDate, maxDate, addDateToLocation, updateLocationData, removeLoadingData, user, getDarkSky}) => {
  return firestore.collection("locations")
  .onSnapshot(querySnapshot => {
    let data = {}
    querySnapshot.forEach(doc => {
      const locationData = doc.data()
      data = { ...data, [doc.id]: {...locationData, id: doc.id}}
      getDarkSky(user.qa, locationData)
      firestore.collection("locations")
      .doc(doc.id)
      .collection("dates")
      .where("id", ">=", minDate)
      .where("id", "<=", maxDate)
      .onSnapshot(querySnapshot => {
        let dates = []
        querySnapshot.forEach(docQuery => dates.push(docQuery.data()))
        removeLoadingData(doc.id)
        addDateToLocation(doc.id, dates)
      })
    })
    updateLocationData(data)
  })
}

export const deleteLocation = (state) => () => {
  firestore
    .collection("locations")
    .doc(state.id)
    .delete()
}

export const postNotification = (state) => {
  auth.currentUser.getIdToken(true).then(idToken => {
    const url = 'https://us-central1-room-ipro.cloudfunctions.net/app/postNotification'
    postNotificationApi(url, idToken, state)
  }).catch((error) => console.log('error getting Firebase id token: ',error ))
}
