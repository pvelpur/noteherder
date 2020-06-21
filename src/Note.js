import React from 'react'

const Note = ({note, setCurrentNote}) => {
    // Data will be coming from outside of itself
    //state vs props 
    //state is for managing data internal to that component
    //props is for passing data into the component (like arguments)
    //to access, use this.props (ONLY IN A CLASS THO)

    //When u want something to happen when an event occurs, use attribute on jsx (camel casing)
    const handleClick = (ev) => {
        //ev isnt a raw DOM event like in regular JS, its a synthetic event
        // but we can use it pretty much the same way
        //console.log('Clickity click')
        setCurrentNote(note) //this would refer to 'props' unless we bind 'this' in app.js or bind it in constructor        
    }
    //handleClick despite being a function, it just a local variable in this instance since we in a function

    return (
        <a href='/#' onClick={handleClick}>
            <li>
                <div className="note">
                    <div className="note-title">
                        {note.title}
                    </div>
                    <div className="note-body">
                        <p> {note.body} </p>
                    </div>
                </div>
            </li>
        </a>
    )
}

export default Note