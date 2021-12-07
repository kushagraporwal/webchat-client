import React, { useEffect, useState, useContext } from 'react'
import {useHistory} from 'react-router-dom'
import {Usercontext} from '../App';

const Logout = () => {
    const {state, dispatch} = useContext(Usercontext);
    const history= useHistory();
    const callinfo = async()=>{
        try{
            const res= await fetch('https://web-chat11.herokuapp.com/logout',{
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type":"application/json"
                },
                credentials: "include"
            });
            const data= await res.json();
            console.log(data);
            dispatch({type:"USER", payload:false});
            window.alert('You are successfully logged out');
            history.push("/");
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        callinfo();
    },[]);
    return (
        <div>
            
        </div>
    )
}

export default Logout
