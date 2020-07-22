import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDREtqKGyNMYtdZcQCmdYrezUh7bobKIS0",
    authDomain: "madebymom-db.firebaseapp.com",
    databaseURL: "https://madebymom-db.firebaseio.com",
    projectId: "madebymom-db",
    storageBucket: "madebymom-db.appspot.com",
    messagingSenderId: "1083404188554",
    appId: "1:1083404188554:web:d825e4c09ec52807b5e673",
    measurementId: "G-6FYJ92SDZ1"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth){
        return;
    }
    console.log('before firestore');
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    console.log('after firestore');
    if(!snapShot.exists){
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('Error in creating doc', error.message);
        }
    }
    return userRef;
}
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;