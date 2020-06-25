import Rebase from 're-base'
import firebase from 'firebase/app'
import database from 'firebase/database'
import 'firebase/auth'

const app = firebase.initializeApp({
    apiKey: "YOUR API KEY",
    authDomain: "YOUT AUTH DOMAIN",
    databaseURL: "YOUR DATABASE URL",
    projectId: "YOUR PROJECT ID",
    storageBucket: "YOUR STORAGE BUCKET",
    messagingSenderId: "YOUR MESSAGING SENDER ID",
  })

  const db = firebase.database(app)

  export const googleProvider = new firebase.auth.GoogleAuthProvider
  export const githubProvider = new firebase.auth.GithubAuthProvider()
  export const auth = app.auth()
  
  export default Rebase.createClass(db)