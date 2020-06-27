import React, { Component } from 'react'
import base, {auth} from './base'
import {Route, Switch, Redirect} from 'react-router-dom'

import './App.css'
import Main from './Main'
import SignIn from './SignIn'

// We set the initial state for a component through the constructor
// we make changes to it by setState

class App extends Component {
  constructor() {
    super()

    //this.setCurrentNote = this.setCurrentNote.bind(this)

    this.state = {
      notes: {},
      uid: null,
      firebaseNotesSynced: false, // haven't synced at start (cuz firebase takes a little bit of time)
    }
  }

  //react lifecycle methods
  UNSAFE_componentWillMount(){
    this.getUserFromLocalStorage()
    auth.onAuthStateChanged((user) => {
      if(user){
        //signed in
        this.handleAuth(user)
      }
      else{
        //signed out
        //this.setState({uid: null})
        this.handleUnauth();
      }
    })
  }
  
  getUserFromLocalStorage = () => {
    const uid = localStorage.getItem('uid')
    if(!uid) return
    this.setState({ uid })
  }

  syncNotes = () => {
    this.bindingRef = base.syncState(`notes/${this.state.uid}`, {
      context: this, // what object the state is on
      state: 'notes', //which property to sync
      then: () => this.setState({firebaseNotesSynced: true}),
    })
  }

  //arrow functions bind 'this' (property initializer)

  // Add a new note to this.state
  // objects are pass and asign by reference (setting var equal to something will be ref and will modify the original not make copy)
  saveNote = (note) => {
    const timestamp = Date.now()
    // get a copy of notes
      //Use spread syntax
    const notes = {...this.state.notes} // applied to arrays as well

    let shouldRedirect = false

    if(!note.id) {
      note.id = timestamp
      shouldRedirect = true
    }

    note.updatedAt = timestamp

    // modify the notes to have more
      //not an array so cant use push
    notes[note.id] = note

    // set state again
    this.setState({notes})

    //set current note to the one being saved so it doesnt make a new id every time a key is pressed
    //this.setCurrentNote(note)
    if(shouldRedirect) {
      this.props.history.push(`/notes/${note.id}`)
    }
  }

  removeNote = (note) => {
    const notes = {...this.state.notes} //get a copy
    // delete notes[this.state.currentNote.id] //this is the right way to do it without firebase
    //with firebase
    notes[note.id] = null

    this.setState({notes})
    //this.resetCurrentNote()
    this.props.history.replace(`/notes`) //with routing, automatically clears form
  }

  signedIn = () => {
    return this.state.uid
  }

  handleAuth = (user) => {
    localStorage.setItem('uid', user.uid)
    this.setState({uid: user.uid}, this.syncNotes) //calls syncNotes after it finishes setting the state
  }

  handleUnauth = () => {
    localStorage.removeItem('uid')
    if(this.bindingRef){
      base.removeBinding(this.bindingRef)
    }

    this.setState({uid: null, notes: {}})
    //this.resetCurrentNote()
  }

  signOut = () => {
    auth.signOut() 
      //.then(() => this.setState({uid: null})) // signing out is a change to the auth state
  }

  render() {
    const actions = {
      saveNote: this.saveNote,
      removeNote: this.removeNote,
      signOut: this.signOut
    }

    return (
      <div className="App">
        <Switch>
          <Route 
            path="/sign-in"
            render={() => (
              this.signedIn()
                ? <Redirect to="/notes" />
                : <SignIn />
            )}
          />
          <Route 
            path='/notes' 
            render={() => (
              this.signedIn()
                ? <Main 
                    notes={this.state.notes}
                    firebaseNotesSynced={this.state.firebaseNotesSynced} 
                    {...actions} //passes in both of the props (spread syntax)
                  />
                : <Redirect to="/sign-in"/>
            )}
          />
          <Route 
            render={() => <Redirect to="/notes"/>}
          />
        </Switch>
        
        {/* {this.signedIn() ? 
          <Main 
            notes={this.state.notes} 
            currentNoteId={this.state.currentNoteId}
            {...actions} //passes in both of the props (spread syntax)
          /> : <SignIn />
        } */}
        
      </div>
    )
  }
}

export default App
