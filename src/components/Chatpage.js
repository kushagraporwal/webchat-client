import React, { useEffect, useState, useContext } from 'react'
import {useHistory} from 'react-router-dom'
import { useLocation, NavLink, useParams } from "react-router-dom"
import {Usercontext} from '../App';
import Cryptr from 'cryptr'

const Chatpage = () => {
    const history= useHistory();
    const {name1, name2}= useParams();
    const [message, setmessage] = useState("");
    const [username1, setusername1] = useState("");
    const [username2, setusername2] = useState("");
    const [userdata, setdata]= useState({});
    const [userdata3, setdata3]= useState({});
    const {state, dispatch} = useContext(Usercontext);
    const cryptr = new Cryptr('myTotalySecretKey');
    const callinfo = async()=>{
        try{
            console.log('welcome2');
            const res= await fetch(`https://web-chat11.herokuapp.com/${name1}/chat/${name2}`,{
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
            else{
                const res3= await fetch(`https://web-chat11.herokuapp.com/${name1}/message/${name2}`,{
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type":"application/json"
                    },
                    credentials: "include"
                });
                const data3= await res3.json();
                setdata3(data3);
            setdata(data);
            const res2= await fetch(`https://web-chat11.herokuapp.com/${name1}/detail/${name2}`,{
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type":"application/json"
                },
                credentials: "include"
            });
            dispatch({type:"USER", payload:name1});
            const user1 = await res2.json();
            console.log('state is');
            console.log(state);
            setusername1(user1.un1);
            setusername2(user1.un2);
        }
            //console.log(data);
        }
        catch(err){
            console.log(err);
        }
    }
    let value;
    const handleinput= (e) =>{
        value= e.target.value;
        setmessage(value);
    }
    const send = async(e)=>{
        e.preventDefault();
        try{
            //console.log('welcome2');
            const message1  = message;
            const res= await fetch(`https://web-chat11.herokuapp.com/${name1}/chat/${name2}`,{
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    message1: message1,
                    check:"OK"
                }),
                credentials: "include"
            });
            const data= await res.json();
            
            //console.log('message is');
            //console.log(data);
            //setmessage(" ");
            // setdata(data);
            
            dispatch({type:"USER", payload:name1});
            window.location.reload();
            
        }
        catch(err){
            console.log(err);
        }
    }

    const delet = async(name)=>{
        
        try{
            console.log("Hello");
            const res= await fetch(`https://web-chat11.herokuapp.com/${name._id}/delete`,{
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
            dispatch({type:"USER", payload:name1});
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        callinfo();
    },[]);
    
    //console.log('userdata is');
    //console.log(userdata);
    console.log('message info');
    console.log(userdata3);
    const messageinfo= userdata.message;
    var ir1= ['Hello','World'];
    var user1= new Array();
    var user2= new Array();
    var ir3= ['Hello','World'];
    var user3= new Array();
    var message1= new Array();
    var message2= new Array();
    if(messageinfo)
    {
        ir1=messageinfo;
        ir1.map(name => (
            user1.push(name.sender)
        ));
        user1.map(name => (
        (name1==name._id ? user2.push('You') : user2.push(String(name.username)))
        ));
        message1=userdata3;
        ir3.length=0;
        for(let i=ir1.length-1;i>=0;i--)
        {
            ir3.push(ir1[i]);
        }
        for(let i=user2.length-1;i>=0;i--)
        {
            user3.push(user2[i]);
        }
        for(let i=message1.length-1;i>=0;i--)
        {
            message2.push(message1[i]);
        }
    }
    //console.log(ir1);
    //console.log(ir3);
    //console.log(user3);
    
var i=0;
var j=0;
    return (
        <div>
            <h1>{username1} {username2}</h1>
            <form method="POST">
        <textarea name="sentmessage" id="" cols="30" rows="10" value={message} onChange={handleinput}></textarea>
        <button onClick={send}>Submit</button>
        </form>
        {ir3.map(name => (
            <div>
            <li>{user3[i++]}</li>
            <li>{message2[j++]}</li>
            <p>{name.time}  {(name.date)}</p>
            <div>{((name.reciever==name2&&name.del==false) ? <form method="PUT"><input type="submit" name="submit" className="form-submit" value="Delete" onClick={()=>delet(name)}/></form> : <br/>)}</div>
            <br/>
            </div>
      ))}
       </div>
    )
}

export default Chatpage
