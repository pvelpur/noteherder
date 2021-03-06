import React from 'react'
import { NavLink } from 'react-router-dom'

const Note = ({ note }) => {
    // Data will be coming from outside of itself
    //state vs props 
    //state is for managing data internal to that component
    //props is for passing data into the component (like arguments)
    //to access, use this.props (ONLY IN A CLASS THO)

    //When u want something to happen when an event occurs, use attribute on jsx (camel casing)
    // const handleClick = (ev) => {
    //     //ev isnt a raw DOM event like in regular JS, its a synthetic event
    //     // but we can use it pretty much the same way
    //     //console.log('Clickity click')
    //     setCurrentNote(note) //this would refer to 'props' unless we bind 'this' in app.js or bind it in constructor        
    // }
    //handleClick despite being a function, it just a local variable in this instance since we in a function

    return (
        <NavLink to={`/notes/${note.id}`}>
            <li>
                <div className="note">
                    <div className="note-title">
                        {note.title}
                    </div>
                    <div 
                        className="note-body"
                        dangerouslySetInnerHTML={{ __html: note.body }} //lol, this is because of the rich text editor stores as html
                    >
                    </div>
                </div>
            </li>
        </NavLink>
    )
}

export default Note