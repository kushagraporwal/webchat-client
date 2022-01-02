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
            const res= await fetch(`https://web-chat11.herokuapp.com/${userid}/info`,{
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
            const res= await fetch(`https://web-chat11.herokuapp.com/${name._id}/connection`,{
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
            const res= await fetch(`https://web-chat11.herokuapp.com/${name._id}/connection`,{
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
            const res= await fetch('https://web-chat11.herokuapp.com/sendconn',{
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    finduser: finduser,
                    check:"OK"
                }),
                credentials: "include"
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
        <div className='container-fluid' style={{background: '#DFF1F7', }}>
        <h1 style={{fontSize: '30px'}}>Hello <span style={{fontSize: '40px', color: '#37CA0E', fontFamily: 'Secular One, sans-serif'}}>{userdata.username}</span></h1>
        <div className="row" style={{marginTop: '50px',height:'525px'}}>
            <div className="col-md-4" style={{borderRight: '7px solid black'}}>
            <div style={{backgroundColor: '#CFD3D0', padding:'10px', borderRadius: '5px', border: '5px solid black', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px'}}>
            <h1>Connections</h1>
            <div className="myBox" id='style-1'>
                {conn.map(name => (
                    <div className='li1'>
                <NavLink className="nav-link" to={`/chatpage/${userdata._id}/${name._id}`}>{name.username}</NavLink>
                </div>
            ))}
            </div>
            </div>
        </div>
        <div className="col-md-8" style={{justifyContent: 'center', marginTop: '100px'}}>
        <div style={{display:'inline-block',backgroundColor: '#D3F88D', padding:'10px', borderRadius: '8px', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px'}}>
        <h1 style={{marginLeft: '7px'}}>Notifications</h1>
        <div className="myBox2">
        {noti2.map(name => (
            <div>
        {name} <br/><br/>
        </div>
      ))}
      </div></div>
      <div style={{display:'inline-block', marginLeft:'70px', backgroundColor:'#FCDEB0', padding: '10px', borderRadius:'7px', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
      <h1>Incoming Requests</h1>
        {ir1.map(name => (<div>
            <li>{name.username}</li>
            <form method="PUT" style={{display: 'inline-block', marginRight: '10px'}}>
            <input type="submit" className='btn btn-success' name="submit" onClick={()=>accept(name)}/>
            </form>
            <form method="PATCH" style={{display: 'inline-block'}}>
            <input type="submit" name="submit" className='btn btn-danger'value="Decline" onClick={()=>decline(name)}/>
            </form>
            </div>
      ))}
            <div style={{marginTop: '100px'}}>
            <h2>Send New Request</h2>
      <form method="POST" >
        <input type="text" id="username" class="form-control" name="username" placeholder=" " value={user1} onChange={handleinput} required/>
        <input type="submit" name="submit" className="btn btn-dark" value="Send" onClick={send} style={{marginLeft: 'auto'}}/>
    </form>
    </div></div>
      </div>
      </div>
      </div>
        </>
    )
}

export default Info