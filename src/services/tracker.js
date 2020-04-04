
import Vue from 'vue'
import firebase from 'firebase'


Vue.mixin({
    beforeCreate() {
        const options = this.$options;
        if (options.db)
            this.$db = options.db;
        else if (options.parent && options.parent.$db)
            this.$db = options.parent.$db;
    }
});

export default function makeDb() {
    var config = {
        apiKey: "AIzaSyDDQtVKWDkaVwdBCYHs85axtC9OE8AyhMM",
        authDomain: "petstrack-d0008.firebaseapp.com",
        databaseURL: "https://petstrack-d0008.firebaseio.com",
        projectId: "petstrack-d0008",
        storageBucket: "petstrack-d0008.appspot.com",
        messagingSenderId: "429355315126"
    };
    firebase.initializeApp(config);
    return firebase.firestore();
}
