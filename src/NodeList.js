import React from 'react'

import './NoteList.css'
import Note from './Note'

const NoteList = ({ notes }) => {

    // ['note-4', 'note-5']
    const noteIds = Object.keys(notes)

    //component is a tag (<Note />)
    // to pass props into it, itll look like an html attribute
    return (
        <div className="NoteList">
          <h3>Notes</h3>
          <ul id="notes">
            {noteIds.map((noteId) => (
                <Note 
                    
                    key={noteId} 
                    note={notes[noteId]}
                />
            ))}
          </ul>
        </div>
    )
}

export default NoteList