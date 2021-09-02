import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { signInWithGoogle, auth } from '../config/firebase'
import { authContext } from '../context/AuthProvider';




const Login = () => {
    let user=useContext(authContext);
    console.log(user);
    

    return (
    <>
    {user?<Redirect to="/"/>:""}
    <button onClick={() => 
        { signInWithGoogle(); }} 
        className="btn btn-primary">
            Login with Google
            </button>
    
   
    </>
    );
}

export default Login;