
const FIREBASE_KEY = process.env.REACT_APP_FIREBASE;
class FirestoreInterface {
    constructor(){

        const firebase = require("firebase/app");
        require("firebase/firestore");
        var config = {
            apiKey: FIREBASE_KEY,
            authDomain: "test-f51e3.firebaseapp.com",
            databaseURL: "https://test-f51e3.firebaseio.com",
            projectId: "test-f51e3",
            storageBucket: "test-f51e3.appspot.com",
            messagingSenderId: "30829949784"
        };
        this.firebaseApp = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
        this.firestore = this.firebaseApp.firestore();

    }

    getNames(){
        return this.firestore.collection('users').get()
        .catch((err) => {
            console.log('Error getting documents', err);
        });
    }

    addName(name){
        var docRef = this.firestore.collection('users').doc("test");
        docRef.set({
            name:name
          });
    }
    
}

const FI = new FirestoreInterface();
export default FI;