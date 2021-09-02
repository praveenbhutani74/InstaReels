import { createContext,useEffect,useState } from "react";
import {auth} from "../config/firebase";
import { firestore } from "../config/firebase";

export const authContext=createContext();


let AuthProvider=(props)=>{
    console.log(props.children);

    let [user,setuser]=useState(null);
    let[loading,setloading]=useState(true);


    useEffect(()=>{
        let unsub=auth.onAuthStateChanged(async(user)=>{

            if(user){
                console.log(user);
                let {displayName,email,uid,photoURL } =user;
                setuser({displayName,email,uid,photoURL});

                let docRef=firestore.collection("users").doc(uid);

                let docSnap=await docRef.get();
                if(!docSnap.exists){
                    docRef.set({
                        displayName,
                        email,
                        photoURL
                      })
                }





            }
            else{
                setuser(null);

            }
            setloading(false);
        });

        return()=>{
            unsub();
        }

    },[]);

    return(


        <authContext.Provider value={user}>
            {!loading&&props.children}

        </authContext.Provider>
    )




}

export default AuthProvider;