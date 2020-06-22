import React from 'react'

import './Sidebar.css'
//using webpack for images (this way we can import images) 
import quill from './quill.svg'
import newHover from './new-hover.png'
import newIcon from './new.png'

const Sidebar = ({resetCurrentNote, signOut}) => {
    // ClassName for jsx (not a thing in html)
    return (
        <nav className="Sidebar">
            <div className="logo">
                <img src={quill} alt="Noteherder" />
            </div>
            <a 
                className="new-note"
                onClick = {resetCurrentNote}
                href= '/#'
            >
                <img 
                    src={newHover} 
                    alt="New note"
                />
                <img 
                    className="outline" 
                    src={newIcon} 
                    alt="New note"
                />
            </a>
            <div className="SignOut">
                <button onClick={signOut}>
                    <i className="fa fa-sign-out"></i>
                </button>
            </div>
        </nav>
  )
}

export default Sidebar