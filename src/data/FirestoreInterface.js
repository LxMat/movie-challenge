
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

    getUsers(){
        return this.firestore.collection('users').get()
        .catch((err) => {
            console.log('Error getting documents', err);
        });
    }

    addUser(name, set, score){

        const myStorage = window.localStorage;
        const uuidv1 = require('uuid/v1');

        console.log(myStorage.getItem('uuid'))
        const a = myStorage.getItem('uuid') === null ? myStorage.setItem('uuid', uuidv1()):null;
        //uuidv1(); // ⇨ '45745c60-7b1a-11e8-9c9c-2d42b21b1a3e'

        var docRef = this.firestore.collection('users').doc(myStorage.getItem('uuid'));

        let data = {name:name};
        data["Question set "+set] = score;

        docRef.set(data);
    }
    
}


const FI = new FirestoreInterface();
export default FI;