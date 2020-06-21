import Rebase from 're-base'
import firebase from 'firebase/app'
import database from 'firebase/database'

const app = firebase.initializeApp()

const db = firebase.database(app)

export default Rebase.createClass(db)