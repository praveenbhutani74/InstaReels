import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import {auth} from "../config/firebase"
import { authContext } from '../context/AuthProvider';



const Home = () => {
    let user=useContext(authContext)
    return ( <>

    {(user)?"":<Redirect to="login"/>}
     <button onClick={()=>{
        auth.signOut();
    }}>Logout</button>
    
    <h1>Home</h1></> );
}
 
export default Home;