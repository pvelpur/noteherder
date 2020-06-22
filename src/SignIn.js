import React from 'react'

import './SignIn.css'
import {auth, googleProvider} from './base'

const SignIn = () => {

    const authenticate = () => {
        auth
            .signInWithPopup(googleProvider)
            //.then(handleAuth) // dont need this with lifecycle method (onAuthStateChanged)
    }

    return (
        <div className="SignIn">
            <h1>SIGNIN!</h1>
            <button onClick={authenticate}>Sign In</button>
        </div>
    )}

export default SignIn