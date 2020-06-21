import React, { Component } from 'react'

import './App.css'
import Main from './Main'

// We set the initial state for a component through the constructor
// we make changes to it by setState

class App extends Component {
  constructor() {
    super()

    //this.setCurrentNote = this.setCurrentNote.bind(this)

    this.state = {
      notes: {},
      currentNote: this.blankNote(),
    }
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
    delete notes[this.state.currentNote.id]
    this.setState({notes})
    this.resetCurrentNote()
  }

  render() {
    const actions = {
      setCurrentNote: this.setCurrentNote,
      resetCurrentNote: this.resetCurrentNote,
      saveNote: this.saveNote,
      removeCurrentNote: this.removeCurrentNote
    }

    return (
      <div className="App">
        <Main 
          notes={this.state.notes} 
          currentNote={this.state.currentNote}
          {...actions} //passes in both of the props (spread syntax)
        />
      </div>
    )
  }
}

export default App
