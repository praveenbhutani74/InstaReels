import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import {auth, firestore, storage} from "../config/firebase"
import { authContext } from '../context/AuthProvider';
import "./home.css";
import VideoCard from './videoCard.jsx';


const Home = () => {
    let user=useContext(authContext);
    let [posts,setPosts]=useState([]);

    useEffect(()=>{
        let unsub= firestore.collection("posts").onSnapshot((querySnapshot)=>{
            let docArr=querySnapshot.docs;

            let arr=[];
            for(let i=0;i<docArr.length;i++){
                arr.push({
                    id:docArr[i].id,
                    ...docArr[i].data(),
                });
            }
            setPosts(arr);
        })

        return()=>{
            unsub();
        }

    })


    return ( <>

    {(user)?"":<Redirect to="login"/>}

    <div className="video-container">
        {posts.map((element)=>{
            return <VideoCard key={element.id} data={element}/>
        })}
    </div>
     <button className="home-logout-btn" onClick={()=>{
        auth.signOut();
    }}>Logout</button>

    <input  type="file" 

        onClick={(e)=>{
            e.currentTarget.value=null;
        }}

        onChange={(e)=>{
        let videoObj=e.currentTarget.files[0];
        let {displayName,size,type}=videoObj;

        size=size/1000000;
        if(size>10){
            alert("file size exceeds 10mb ");
            return;
        }
        type=type.split("/")[0];
        if(type!=="video"){
            alert("plase upload a video file");
            return;
        }
        let uploadTask=storage.ref(`/posts/${user.uid}/${Date.now()+"-"+displayName}`).put(videoObj);

        uploadTask.on("state_changed",f1,f2,f3);

        function f1(snapshot){
            console.log(snapshot);
        }
        function f2(error){
            console.log(error);
        }
        function f3(){
           uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
                console.log(url);

                firestore.collection("posts").add({
                    name:user.displayName,
                    url,
                    likes:[],
                    comment:[],
                })  
            });
        }

    }}
    />

    </> );
}
 
export default Home;