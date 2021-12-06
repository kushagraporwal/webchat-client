import React, { useEffect, useState, useContext } from 'react'
import {useHistory, useParams} from 'react-router-dom'
import { useLocation, NavLink } from "react-router-dom"
import {Usercontext} from '../App';

const Info = (props) => {
    const location = useLocation();
    const [userdata, setdata]= useState({});
    const [user1, setuser1] = useState("");
    const history= useHistory();
    const state = location.state;
    const {userid}= useParams();
    const {state1, dispatch} = useContext(Usercontext);
    const callinfo = async()=>{
        try{
            console.log('welcome');
            console.log(state);
            const res= await fetch(`/${userid}/info`,{
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type":"application/json"
                },
                credentials: "include"
            });
            const data= await res.json();
            if(data=="-2")
            {
                window.alert('You must be logged in first');
                history.push('/login');
            }
            else
            {
            setdata(data);
            }
            dispatch({type:"USER", payload:userid});
        }
        catch(err){
            console.log(err);
        }
    }

    const accept = async(name)=>{
        
        try{
            console.log("Hello");
            const res= await fetch(`/${name._id}/connection`,{
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type":"application/json"
                },
                credentials: "include"
            });
            const data= await res.json();
            console.log(data);
            window.location.reload();
            
        }
        catch(err){
            console.log(err);
        }
    }
    const decline = async(name)=>{
        
        try{
            console.log("Hello");
            const res= await fetch(`/${name._id}/connection`,{
                method: "PATCH",
                headers: {
                    Accept: "application/json",
                    "Content-Type":"application/json"
                },
                credentials: "include"
            });
            const data= await res.json();
            console.log(data);
            window.location.reload();
            
        }
        catch(err){
            console.log(err);
        }
    }

    let value;
    const handleinput= (e) =>{
        value= e.target.value;
        setuser1(value);
        console.log(user1);
    }

    const send =async(e)=>{
        e.preventDefault();
        console.log(user1);
        try{
            const finduser  = user1;
            console.log(user1);
            const res= await fetch('/sendconn',{
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    finduser: finduser,
                    check:"OK"
                })
            });
            const data= await res.json();
            console.log('req is');
            console.log(data);
            if(data=="-8")
            {
                window.alert('User not found!');
            }
            else
            {
                window.alert('Request sent successfully!!');
            }
            console.log(data);
            setuser1("");
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        callinfo();
    },[]);

    const connections= userdata.connections;
    const ir=userdata.incoming_request;
    const noti=userdata.announcements;
    var conn=new Array();
    var ir1= new Array();
    var noti1= new Array();
    var noti2= new Array();
    for(const property in connections)
    {
        conn.push(connections[property]);
    }
    for(const property in ir)
    {
        ir1.push(ir[property]);
    }
    for(const property in noti)
    {
        noti1.push(noti[property]);
    }
    for(let i=noti1.length-1;i>=0;i--)
    {
        noti2.push(noti1[i]);
    }
    return (
        <>
        <h1>Info page</h1>
        <h1>Hello {userdata.username}</h1>
        <h1>Notifications</h1>
        {noti2.map(name => (
            <div>
        <li>{name}</li>
        </div>
      ))}
        <h1>Connections</h1>
        {conn.map(name => (
            <div>
        <li>
        <NavLink className="nav-link" to={`/chatpage/${userdata._id}/${name._id}`}>{name.username}</NavLink>
        </li></div>
      ))}
      <form method="POST">
        <input type="text" id="username" class="form-control" name="username" placeholder=" " value={user1} onChange={handleinput} required/>
        <input type="submit" name="submit" className="form-submit" value="Send Request" onClick={send}/>
    </form>
      <h1>Incoming Requests</h1>
        {ir1.map(name => (<div>
            <li>{name.username}</li>
            <form method="PUT">
            <input type="submit" name="submit" className="form-submit" value="Accept" onClick={()=>accept(name)}/>
            </form>
            <form method="PATCH">
            <input type="submit" name="submit" className="form-submit" value="Decline" onClick={()=>decline(name)}/>
            </form>
            </div>
      ))}
      
      
        </>
    )
}

export default Info