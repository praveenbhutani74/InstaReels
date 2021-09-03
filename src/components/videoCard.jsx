import "./videoCard.css";
import React, { useContext, useEffect, useState } from 'react';
import { authContext } from "../context/AuthProvider";
import { firestore } from "../config/firebase";
const VideoCard = (props) => {

    let [playing, setPlaying] = useState(false);
    let[commentBoxOpen,setCommentBoxOpen]=useState(false);
    let[currUserComment,setCurruserComment]=useState("");
    let[comments,setComments]=useState([]);
    let user=useContext(authContext);

    let currentUserLiked;
    if(user){ currentUserLiked=props.data.likes.includes(user.uid);}

    useEffect(()=>{

        let f=async()=>{
            let commentArr=props.data.comments;
            console.log(commentArr);
            let arr=[];
            for(let i=0;i<commentArr.length;i++){
                let commentDoc=await firestore
                .collection("comments")
                .doc(commentArr[i])
                .get();

                arr.push(commentDoc.data());

            }

                setComments(arr);
        }
        f();
    },[props])

    return (
        <div className="video-card">
            <p className="video-card-username">{props.data.name}</p>
            <span className="video-card-music">
        <span className="material-icons">music_note</span>
        <marquee>some song</marquee>
      </span>

        <span   
        onClick={(e)=>{
            if(commentBoxOpen){
                setCommentBoxOpen(false);
            }
            else{
                setCommentBoxOpen(true);
            }
        }}
        
        className="material-icons-outlined video-card-comment">chat</span>
        <span  className="material-icons-outlined video-card-like"
        onClick={()=>{
            let likesArr=props.data.likes;

            if(currentUserLiked){
                likesArr=likesArr.filter((el)=> el != user.uid);
            }
            else{
                likesArr.push(user.uid);

            }
            firestore
            .collection("posts")
            .doc(props.data.id)
            .update({likes:likesArr})

        }}
        
        
        >
           {currentUserLiked ?"favorite":" favorite_border" }
            
            </span>

        {commentBoxOpen ?(
       
       <div className="video-card-comment-box"> 

        <div className="actual-comments">

            {comments.map((el)=>{
              
              return (
                  
                <div className="post-user-comment">
                <img src= {el.photo}/>
            
               
               <div>
                   <h4>{el.name}</h4>
                   <p>{el.comment}</p>
               </div>

            </div>

              );

            })}


        </div>
        
        <div className="comment-form">
        <input type="text"
            value={currUserComment}
            onChange={(e)=>setCurruserComment(e.currentTarget.value)}
        
        />
        <button 
            onClick={async()=>{

               let docRef=  await firestore.collection("comments").add({
                    name:user.displayName,
                    comment:currUserComment,
                    photo:user.photoURL
                });
                setCurruserComment("");
                let doc=await docRef.get();
                // console.log(doc);

                let commentId=doc.id;

                let postDoc=await firestore.collection("posts").doc(props.data.id).get();
                let postCommentArr=postDoc.data().comment;

                postCommentArr.push(commentId);
                
                await firestore.collection("posts").doc(props.data.id).update({
                    comments:postCommentArr
                })


            }}
        
        >Post</button>
        </div>
        </div>):""}
            <video
                onClick={(e) => {
                    if (playing) {
                        e.currentTarget.pause();
                        setPlaying(false);
                    } else {
                        e.currentTarget.play();
                        setPlaying(true);
                    }
                }}
                loop
                src={props.data.url}
                className="video-card-video"
            ></video>


        </div>


    );
}

export default VideoCard;