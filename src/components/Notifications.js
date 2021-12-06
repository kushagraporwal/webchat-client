import React, { useEffect, useState } from 'react'
import {useHistory} from 'react-router-dom'
import { useLocation, NavLink, useParams } from "react-router-dom"

const Notifications = () => {
    const history= useHistory();
    const {name1}= useParams();
    const [userdata, setdata]= useState({});
    const callinfo = async()=>{
        try{
            console.log('welcome2');
            const res= await fetch(`/${name1}/notifications`,{
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type":"application/json"
                },
                credentials: "include"
            });
            const data= await res.json();
            if(data=='-2')
            {
                window.alert('You must be logged in first');
                history.push('/login');
            }
            else
            {
            setdata(data);
            }
            console.log(data);
            //console.log(data);
        }
        catch(err){
            console.log(err);
        }
    }
    useEffect(() => {
        callinfo();
    },[]);

    console.log(userdata);
    const noti= userdata.announcements;
    var anno= ["", ""];
    var anno1= ["", ""];
    var name=userdata.username;
    if(noti)
    {
        anno=noti;
        anno1.length=0;
        for(let i=anno.length-1;i>=0;i--)
    {
        anno1.push(anno[i]);
    }
    }
    var user="user"
    if(name)
    {
        user=name;
    }
    return (
        <div>
            <h1>Notifications</h1>
            <h2>{user}</h2>
            {anno1.map(name => (
            <div>
            <li>{name}</li>
            </div>
      ))}
        </div>
    )
}

export default Notifications
