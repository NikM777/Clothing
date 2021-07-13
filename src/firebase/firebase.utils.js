import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCv_wLgCRIAQ_SkcshBp8dpDT1GUPH2uhU",
    authDomain: "crwn-db-67b2b.firebaseapp.com",
    projectId: "crwn-db-67b2b",
    storageBucket: "crwn-db-67b2b.appspot.com",
    messagingSenderId: "811332910206",
    appId: "1:811332910206:web:285884436ae25baa8c6c2f",
    measurementId: "G-36W98QFT9W"
  };

 export const createUserProfileDocument = async (userAuth, additionalData) => {
      if(!userAuth) return;

      const userRef = firestore.doc(`users/${userAuth.uid}`);
      const snapshot = userRef.get();

      if(!snapshot.exists) {
        const {displayName, email} = userAuth;
        const createAt = new Date();

        try {
            await userRef.set({
              displayName,
              email,
              createAt,
              ...additionalData,
            })
        } catch(error) {
            console.log('error creating user', error.message);
        }
      }

     return userRef;
 }




firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

