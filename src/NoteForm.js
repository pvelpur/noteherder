import React, { Component } from 'react'
import RichTextEditor from 'react-rte'

import './NoteForm.css'

class NoteForm extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            note: this.blankNote(),
            rteValue: RichTextEditor.createEmptyValue(),
        }
    }

    //Function to clear out form
    blankNote = () => {
        return {
            id: null,
            title: '',
            body: '',
        }
    }

    //Whenever we are about to receive new props
    componentWillReceiveProps = (nextProps) => {
        const nextId = nextProps.currentNoteId

        //Need the 'or' in case we delete a note and the nextid is null
        const note = nextProps.notes[nextId] || this.blankNote() // if first case is satisfied it won't even check the second

        let rteValue = this.state.rteValue
        if(rteValue.toString('html') !== note.body) {
            rteValue = RichTextEditor.createValueFromString(note.body, 'html')
        }

        this.setState({ note, rteValue })
        
    }

    //Can lookup controlled vs uncontrolled (keyword ref) inputs => we are using controlled

    handleChanges = (ev) => {
        //console.log(ev.target.name)
        const note = {...this.state.note} // Grab a copy of currentNote

        //Note is a object and ev.target.name is a string so need to use []
        note[ev.target.name] = ev.target.value
        
        //Save the note to notelist
        this.setState({note}, () => {this.props.saveNote(note)})

    }

    handleEditorChanges = (rteValue) => {
        const note = {...this.state.note} // Grab a copy of currentNote
        note.body = rteValue.toString('html')
        this.setState({ rteValue, note }, () => this.props.saveNote(note))
    }

    render() {

        //const {currentNote} = this.props

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
                            value={this.state.note.title}
                            onChange={this.handleChanges}
                        />
                    </p>
                    
                    <RichTextEditor 
                        name="body"
                        value={this.state.rteValue}
                        onChange={this.handleEditorChanges}
                    ></RichTextEditor >
                </form>
            </div>
        )
    }
}

export default NoteForm