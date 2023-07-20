import {useState, useEffect} from 'react';
import { Link, useNavigate } from "react-router-dom"
import './Login.css'

function Login(){
    const nav = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // send HTTP with email & password to server
    const onLogin = async () => {
        //TODO login to server
        if(email == '' || password == ''){
            alert('please fill email and password');
            return;
        }
        const response = await fetch('http://127.0.0.1:5000/login', {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({email:email, password: password})
        })
        const data = await response.json();
        if(response.status < 400){
            localStorage.setItem('user', JSON.stringify(data))
            nav('/about');
        }else{
            alert(data.msg)
        }
    }

    function handelEmailChange(event){
        setEmail(event.target.value)
    }
    function handelPasswordChange(event){
        setPassword(event.target.value)
    }

    useEffect(()=> {
        localStorage.removeItem('user')
    }, [])
    return(
        <div className="login-container">
            <h3>Login</h3>
            <p>welcome to out site, please login to continue or click the sign up button to register</p>
            <input placeholder="EMAIL" value={email} onChange={handelEmailChange} />
            <input type="password" placeholder="PASSWORD" value={password} onChange={handelPasswordChange} />
            <button onClick={onLogin}>LOGIN</button>
            <Link to="/signup"><span>Sign up</span></Link>
        </div>
    )
}


export default Login;