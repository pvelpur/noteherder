import React from 'react'

import './NoteList.css'
import Note from './Note'

const NoteList = ({ notes }) => {
    const sortNotes = (a, b) => {
      return (notes[b].updatedAt || 0) - (notes[a].updatedAt || 0)
    }

    // ['note-4', 'note-5']
    const noteIds = Object.keys(notes).sort(sortNotes) // look into Array sort javascript

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