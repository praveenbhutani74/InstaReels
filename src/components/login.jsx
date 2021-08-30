import React, { useEffect } from 'react';
import { signInWithGoogle, auth } from '../config/firebase'




const Login = () => {
    useEffect(() => {

        auth.onAuthStateChanged((user)=>{
            console.log(user);
        })

    })
    return (
    <>
    <button onClick={() => 
        { signInWithGoogle(); }} 
        className="btn btn-primary">
            Login with Google
            </button>
    
    <button onClick={()=>{
        auth.signOut();
    }}>Logout</button>
    </>
    );
}

export default Login;