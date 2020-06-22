import React from 'react'

import './Main.css'
import Sidebar from './Sidebar'
import NoteList from './NodeList'
import NoteForm from './NoteForm'

const Main = (props) => {
    return(
        <div className="Main">
            <Sidebar 
                resetCurrentNote = {props.resetCurrentNote}
                signOut={props.signOut}
            />
            <NoteList 
                notes={props.notes}
                setCurrentNote={props.setCurrentNote}
            />
            <NoteForm
                notes={props.notes} 
                currentNoteId={props.currentNoteId}
                saveNote = {props.saveNote}
                removeCurrentNote={props.removeCurrentNote}
            />
        </div>
    )
}

export default Main