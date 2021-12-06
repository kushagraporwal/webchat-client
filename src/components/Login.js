import React, {useState, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {Usercontext} from '../App';

const Login = () => {

    const {state, dispatch} = useContext(Usercontext);
    const history= useHistory();
    const [user, setuser] = useState({
        username:"",  password:""});

    let name, value;
    const handleinput= (e) =>{
        name= e.target.name;
        value= e.target.value;
        setuser({...user, [name]:value});
    }
    const postdata= async(e) =>{
        //console.log();
        e.preventDefault();
        const {username, password}  = user;
        //console.log(email);
        //console.log(username);
        if(username===""||password==="")
        {
            window.alert("Data is empty");
        }
        else{
        const res= await fetch("/login", {
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username:username,
                password:password,
                check:"OK"
            })
        });
        const data= await res.json();
        console.log(data);
        if(data=="-8")
        {
            window.alert("OOPS! Invalid username or emial");
            setuser({username:"", password:""});
        }
        //window.alert("Login successfull");
        //history.push("/info");
        else
        {
            const user= data._id;
            dispatch({type:"USER", payload:user});
        history.push({
            pathname: `/${user}/info`,
            state: data,
          });
        }
    }
    }
    return (
        <>
        <h2>Login Page</h2>
    <form action="/login" method="POST" className="validated-form" noValidate>
        <div classNmae="mb-3">
            <label for="username" class="form-label">Username</label>
                <input type="text" id="username" className="form-control" name="username" value={user.username} onChange={handleinput} required/>
        </div>
        <div className="mb-3">
            <label for="password" class="form-label">Password</label>
                <input type="password" id="password" className="form-control" name="password" value={user.password} onChange={handleinput} required/>
        </div>
        <div className="form-group form-button">
        <input type="submit" name="submit" className="form-submit" value="Login" onClick={postdata}/>
    </div>
    </form>
        </>
    )
}

export default Login
