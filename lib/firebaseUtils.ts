import firebase from "firebase/app";
import "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyA8KvluLfxg1HImMtsAMKOyAsSx60_c5hI",
  authDomain: "quizreactnative.firebaseapp.com",
  databaseURL: "https://quizreactnative.firebaseio.com",
  projectId: "quizreactnative",
  storageBucket: "quizreactnative.appspot.com",
  messagingSenderId: "1023507180759",
  appId: "1:1023507180759:web:e503cce6242a2d1ac45492",
  measurementId: "G-EP1ZZ9JJC8",
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

export const getLeaderBoard = () => {
  return new Promise((resolve, reject) => {
    firestore.collection("LeaderBoard").onSnapshot((snapshot) => {
      const updatedData = snapshot.docs.map((doc) => doc.data());
      resolve(updatedData);
    }, reject);
  });
};
