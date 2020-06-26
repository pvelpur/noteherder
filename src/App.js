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
      currentNoteId: null,
      uid: null,
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
    })
  }

  //arrow functions bind 'this' (property initializer)
  setCurrentNote = (note) => {
    this.setState({currentNoteId:note.id})
  }

  resetCurrentNote = () => {
    this.setCurrentNote({id: null})
  }

  // Add a new note to this.state
  // objects are pass and asign by reference (setting var equal to something will be ref and will modify the original not make copy)
  saveNote = (note) => {
    // get a copy of notes
      //Use spread syntax
    const notes = {...this.state.notes} // applied to arrays as well

    if(!note.id) {
      note.id = Date.now()
    }

    // modify the notes to have more
      //not an array so cant use push
    notes[note.id] = note

    // set state again
    this.setState({notes})

    //set current note to the one being saved so it doesnt make a new id every time a key is pressed
    this.setCurrentNote(note)
  }

  removeCurrentNote = () => {
    const notes = {...this.state.notes}
    // delete notes[this.state.currentNote.id] //this is the right way to do it without firebase
    //with firebase
    notes[this.state.currentNoteId] = null
    this.setState({notes})
    this.resetCurrentNote()
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
    this.resetCurrentNote()
  }

  signOut = () => {
    auth.signOut() 
      //.then(() => this.setState({uid: null})) // signing out is a change to the auth state
  }

  render() {
    const actions = {
      //setCurrentNote: this.setCurrentNote,
      //resetCurrentNote: this.resetCurrentNote,
      saveNote: this.saveNote,
      removeCurrentNote: this.removeCurrentNote,
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
                    currentNoteId={this.state.currentNoteId}
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
