import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import {auth} from "../config/firebase"
import { authContext } from '../context/AuthProvider';
import "./home.css";
import VideoCard from './videoCard.jsx';


const Home = () => {
    let user=useContext(authContext)
    return ( <>

    {(user)?"":<Redirect to="login"/>}

    <div className="video-container">
        <VideoCard/>
        <VideoCard/>
    </div>
     <button className="home-logout-btn" onClick={()=>{
        auth.signOut();
    }}>Logout</button>
    
    </> );
}
 
export default Home;