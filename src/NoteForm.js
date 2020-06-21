import React, { Component } from 'react'

import './NoteForm.css'

class NoteForm extends Component {
    //Can lookup controlled vs uncontrolled (keyword ref) inputs => we are using controlled

    handleChanges = (ev) => {
        //console.log(ev.target.name)
        const note = {...this.props.currentNote} // Grab a copy of currentNote

        //Note is a object and ev.target.name is a string so need to use []
        note[ev.target.name] = ev.target.value
        //Save the note to notelist
        this.props.saveNote(note)
    }

    render() {

        const {currentNote} = this.props

        return (
            <div className="NoteForm">
                <div className="form-actions">
                    <button 
                        type="button"
                        onClick={this.props.removeCurrentNote}
                    >
                        <i className="fa fa-trash-o"></i>
                    </button>
                </div>
                <form>
                    <p>
                        <input
                            type="text"
                            name="title"
                            placeholder="Title your note"
                            value={currentNote.title}
                            onChange={this.handleChanges}
                        />
                    </p>
                    
                    <textarea 
                        name="body"
                        value={currentNote.body}
                        onChange={this.handleChanges}
                    ></textarea>
                </form>
            </div>
        )
    }
}

export default NoteForm