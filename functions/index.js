// const functions = require('firebase-functions');
//
// // // Create and Deploy Your First Cloud Functions
// // // https://firebase.google.com/docs/functions/write-firebase-functions
// //
// // exports.helloWorld = functions.https.onRequest((request, response) => {
// //  response.send("Hello from Firebase!");
// // });
handleUpdateDates = () => {

  const d = new Date()
  const n = d.getDay()
  const date = createDate(5, 0)

  const formattedDate = moment(date).format('ddd Do MMM YYYY');
  console.log('formattedDate::', formattedDate)


  const locationRef = firestore
    .collection("locations")
  //
  // locationRef.doc("london-tower-bridge")
  //   .set({
  //     id: 'london-tower-bridge',
  //     main: "London",
  //     secondary: "Tower Bridge",
  //     seats: 27,
  //     url: "https://officesnapshots.com/wp-content/uploads/2017/11/wework-towerbridge-offices-london-wework-5-700x467.jpg"
  //   })
  // locationRef.doc("chichester-ilex-place")
  //   .set({
  //     id: 'chichester-ilex-place',
  //     main: "Chichester",
  //     secondary: "Ilex Place",
  //     seats: 25,
  //     url: "https://media-cdn.tripadvisor.com/media/photo-s/01/41/a2/a1/chichester.jpg"
  //   })
  //
  // locationRef.doc("chichester-little-london")
  //   .set({
  //     id: 'chichester-little-london',
  //     main: "Chichester",
  //     secondary: "Little London",
  //     seats: 33,
  //     url: "https://media-cdn.tripadvisor.com/media/photo-s/01/41/a2/a1/chichester.jpg"
  //   })

  // get array of ids of location collection
  // map through array and set collection of dates

  // dates contain date documents with ids in format


  // const locations = []

  // const getLocations =
  // firestore
  //   .collection("locations")
  //   .get()
  //   .then(col => {
  //     const locations = []
  //     col.forEach(doc => {
  //       locations.push(doc.id)
  //     })
  //     return locations
  //   })
  //
  // Promise.all([getLocations])
  //   .then((values) => {
  //   // console.log('locations', values)
  //   values[0].forEach(id => {
  //     locationRef
  //       .doc(id)
  //       .collection("dates")
  //       .doc(date.toString())
  //       .set({
  //         date: formattedDate,
  //         people: []
  //       })
  //   })
  // })
}

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const moment = require('moment');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

// const config = {
//   apiKey: process.env.REACT_APP_ROOMIPRO_FIREBASE_APIKEY,
//   authDomain: "room-ipro.firebaseapp.com",
//   databaseURL: "https://room-ipro.firebaseio.com",
//   projectId: "room-ipro",
//   storageBucket: "room-ipro.appspot.com",
//   messagingSenderId: "855552313275"
// }
// admin.initializeApp();

// admin.initializeApp(config);

function createDate(days, weeks) {
  return moment()
    .add(weeks, 'weeks')
    .startOf('isoWeek')
    .add(days - 1, 'days')
    .valueOf()
}

admin.initializeApp();


exports.addDay = functions.https.onRequest((request, response) => {

  const date = createDate(3, 27)
  const formattedDate = moment(date).format('ddd Do MMM YYYY');
  response.send("Here are the value above: ", formattedDate)
  const locationRef = admin.firestore().collection("locations")
   // const d = new Date()
   // const n = d.getDay()
  const getLocations =
locationRef
 .get()
 .then(col => {
   const locations = []
   console.log(col)
   col.forEach(doc => {
     locations.push(doc.id)
   })
   return locations
 })
 .catch(error => {
  return error
 })

   Promise.resolve(getLocations)
    .then(values => {
      values.forEach(id => {
      locationRef
        .doc(id)
        .collection("dates")
        .doc(date.toString())
        .set({
          date: formattedDate,
          people: []
        })
      })
    // return response.send("Here are the value above: ", JSON.stringify(values))
    return values
    })
    .catch(error =>{
      response.send("Error::", error);
      return error
    })
   // .then(values => {
   //   response.send("Here are the values: ", values)
   //   return values
   // })


 // response.send("Hello from Firebase!");
 // console.log('Is this logged?')
});
