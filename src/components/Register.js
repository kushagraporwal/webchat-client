import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
const Register = () => {
    const history= useHistory();
    const [user, setuser] = useState({
        email:"", username:"",  password:""});

    let name, value;
    const handleinput= (e) =>{
        name= e.target.name;
        value= e.target.value;
        setuser({...user, [name]:value});
    }
    const postdata= async(e) =>{
        //console.log();
        e.preventDefault();
        const {email, username, password}  = user;
        //console.log(email);
        //console.log(username);
        if(email===""||username===""||password==="")
        {
            window.alert("Data is empty");
        }
        else{
        const res= await fetch("/register", {
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email:email,
                username:username,
                password:password,
                check:"OK"
            })
        });
        const data= await res.json();
        console.log('data of register is');
        console.log(data);
        if(data=='-8')
        {
            window.alert("OOPS! Given username or emial already exists");
            setuser("");
        }
        else
        {
        window.alert("Registeration successfull");
        history.push("/login");
        }
    }
    }
    
    return (
        <>
        <h1>Register</h1>
        <form method="POST" class="validated-form" noValidate>
    <div class="mb-3">
        <label for="email" class="form-label">Email </label>
            <input type="email" id="email" class="form-control" name="email" value={user.email} onChange={handleinput} required/>
    </div>
    <div class="mb-3">
        <label for="username" class="form-label">Username</label>
            <input type="text" id="username" class="form-control" name="username" value={user.username} onChange={handleinput} required/>
    </div>
    <div class="mb-3">
        <label for="password" class="form-label">Password</label>
            <input type="password" id="password" class="form-control" name="password" value={user.password} onChange={handleinput} required/>
    </div>
    <div className="form-group form-button">
        <input type="submit" name="submit" className="form-submit" value="Register" onClick={postdata}/>
    </div>
    </form>
    </>
    )
}

export default Register
