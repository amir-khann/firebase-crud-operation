const firebase = require("firebase");
// import * as firebase from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyAUCCK0Om-6Nds8SFwTXsK6g41XyN4A_xA",
  authDomain: "cloud-demo-fbeea.firebaseapp.com",
  projectId: "cloud-demo-fbeea",
  storageBucket: "cloud-demo-fbeea.appspot.com",
  messagingSenderId: "188510254555",
  appId: "1:188510254555:web:28285598a96403ead0e3fe",
  measurementId: "G-K0DKWC8ZV1",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const Users = db.collection("Users");

const addUser = (email, password) =>
  firebase.auth().createUserWithEmailAndPassword(email, password);

const authenticate = (email, password) =>
  firebase.auth().signInWithEmailAndPassword(email, password);

const userProfile = () => {
  const user = firebase.auth().currentUser;

  if (user !== null) {
    return user;
  } else {
    return "user not found";
  }
};
const updateUserProfile = () => {
  const user = firebase.auth().currentUser;

  user
    .updateProfile({
      displayName: "jane Q. User",
      photoUrl: "https://example.com/jane-q-user/profile.jpg",
    })
    .then(() => {
      //update successfull
    })
    .catch((error) => {
      //An error occurred
    });
};

module.exports = {
  Users,
  addUser,
  authenticate,
  userProfile,
  updateUserProfile,
};
