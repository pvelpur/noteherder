import React, { Component } from 'react'
import base from './base'

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
      currentNote: this.blankNote(),
      uid: null,
    }
  }

  //react lifecycle methods
  componentDidMount(){
    base.syncState(`notes`, {
      context: this, // what object the state is on
      state: 'notes', //which property to sync
    })
  }

  //arrow functions bind 'this' (property initializer)
  setCurrentNote = (note) => {
    this.setState({currentNote:note})
  }


  //Function to clear out form
  blankNote = () => {
    return {
        id: null,
        title: '',
        body: '',
      }
  }

  resetCurrentNote = () => {
    this.setCurrentNote(this.blankNote())
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
    notes[this.state.currentNote.id] = null
    this.setState({notes})
    this.resetCurrentNote()
  }

  signedIn = () => {
    return this.state.uid
  }

  handleAuth = () => {
    this.setState({uid: 'pvelpur'})
  }

  signOut = () => {
    this.setState({uid: null})
  }

  render() {
    const actions = {
      setCurrentNote: this.setCurrentNote,
      resetCurrentNote: this.resetCurrentNote,
      saveNote: this.saveNote,
      removeCurrentNote: this.removeCurrentNote,
      signOut: this.signOut
    }

    return (
      <div className="App">
        {this.signedIn() ? 
          <Main 
            notes={this.state.notes} 
            currentNote={this.state.currentNote}
            {...actions} //passes in both of the props (spread syntax)
          /> : <SignIn handleAuth={this.handleAuth}/>
        }
        
      </div>
    )
  }
}

export default App
