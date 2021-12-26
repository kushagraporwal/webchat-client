import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import img1 from '../images/reg1.jpg'
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
        <div className='container' id='regcont'>
        <h1>Register</h1>
        <div className='row'>
        <div class="col-sm-5" style={{textAlign: 'center'}}>
            <img src={img1} alt="" className='i1'/>
        </div>
        <div class="col-sm-7">
        <form method="POST" class="validated-form" noValidate className='f1'>
    <div class="form-group">
        <label for="email" class="form-label">Email </label>
            <input type="email" id="email" class="form-contr" name="email" value={user.email} onChange={handleinput} required/>
    </div>
    <div class="form-group">
        <label for="username" class="form-label">Username</label>
            <input type="text" id="username" class="form-contr" name="username" value={user.username} onChange={handleinput} required/>
    </div>
    <div class="form-group">
        <label for="password" class="form-label">Password</label>
            <input type="password" id="password" class="form-contr" name="password" value={user.password} onChange={handleinput} required/>
    </div>
    <div class="form-group">
        <label for="cpassword" class="form-label">Confirm Password</label>
            <input type="password" class="form-contr" required/>
    </div>
    <div className="form-group form-button">
        <button type="submit" name="submit"  className="btn btn-dark" id="regbt" value="Register" onClick={postdata}>Register</button>
    </div>
    </form>
    <p className='par1'>Have an Account? <a href="/login">Login</a></p>
    </div>
    </div>
    </div>
    </>
    )
}

export default Register
