import React, { Component } from 'react'
import RichTextEditor from 'react-rte'

import './NoteForm.css'

class NoteForm extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            editorValue: RichTextEditor.createEmptyValue(),
        }
    }

    // componentWillReceiveProps = (nextProps) => {
    //     console.log({
    //         currentProps: this.props,
    //         nextProps
    //     })
    // }

    //Can lookup controlled vs uncontrolled (keyword ref) inputs => we are using controlled

    handleChanges = (ev) => {
        //console.log(ev.target.name)
        const note = {...this.props.currentNote} // Grab a copy of currentNote

        //Note is a object and ev.target.name is a string so need to use []
        note[ev.target.name] = ev.target.value
        //Save the note to notelist
        this.props.saveNote(note)
    }

    handleEditorChanges = (editorValue) => {
        this.setState({ editorValue })
        const note = {...this.props.currentNote} // Grab a copy of currentNote
        note.body = editorValue.toString('html')
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
                    
                    <RichTextEditor 
                        name="body"
                        value={this.state.editorValue}
                        onChange={this.handleEditorChanges}
                    ></RichTextEditor >
                </form>
            </div>
        )
    }
}

export default NoteForm