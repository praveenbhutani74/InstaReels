import "./videoCard.css";
import React, { useState } from 'react';
const VideoCard = (props) => {

    let [playing, setPlaying] = useState(false);
    let[commentBoxOpen,setCommentBoxOpen]=useState(false);


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
        <span  className="material-icons-outlined video-card-like">favorite_border</span>


        {commentBoxOpen?<div className="video-card-comment-box">
        <div className="actual-comments">
            <div className="post-user-comment">
               
                <img src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" />
           
                <div>
                <h3>user name</h3>
            <p>This is actual comment</p>
            </div>
            </div>
           
            
        </div>
        <div className="comment-form">
        <input type="text" />
        <button>Post</button>
        </div>
        </div>:""}
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