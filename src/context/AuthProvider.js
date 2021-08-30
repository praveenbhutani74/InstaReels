import { createContext,useEffect,useState } from "react";
import {auth} from "../config/firebase";

export const authContext=createContext();


let AuthProvider=(props)=>{

    let [user,setuser]=useState(null);
    let[loading,setloading]=useState(true);


    useEffect(()=>{
        let unsub=auth.onAuthStateChanged((user)=>{

            if(user){
                let {displayName,email,uid,photoUrl } =user;
                setuser({displayName,email,uid,photoUrl });


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