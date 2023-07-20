import {useState} from 'react';
import { Link, useNavigate } from "react-router-dom"
import './Signup.css'

function Signup(){
    const nav  = useNavigate()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [age, setAge] = useState('')

    function handleFirstName(event){
            setFirstName(event.target.value);
    }
    function handleLastName(event){
        setLastName(event.target.value);
    }
    function handleEmail(event){
        setEmail(event.target.value);
    }
    function handlePassword(event){
        setPassword(event.target.value);
    }
    function handleAge(event){
            setAge(event.target.value);
    }

    const onSignup = async() => {
        if(firstName == ''){
            alert('First name cannot be empty')
            return;
        }
        if(lastName == ''){
            alert('Last name cannot be empty')
            return;
        }
        if(email == ''){
            alert('Email cannot be empty')
            return;
        }        
        if(password == ''){
            alert('Password cannot be empty')
            return;
        }        
        if(age == ''){
            alert('Age cannot be empty')
            return;
        }  
        if(password.length < 6)      {
            alert('Password musthave at least 6 digits');
            return;
        }
        if(email.indexOf('@') == -1){
            alert('Invalid email')
            return 
        }
        
        const ageNum = parseInt(age)
        if(isNaN(ageNum)){
            alert('Invalid age')
            return 
        }
        if(ageNum < 18){
            alert('You must be greater 18 years old to signup')
            return;
        }

        const response = await fetch('http://127.0.0.1:5000/user', {
            method:'POST',
            headers:{'content-type':'application/json'},
            body: JSON.stringify({user:{firstName:firstName, lastName:lastName, email, password}})
        });
        const user = await response.json();
        if(user.msg){
            alert(user.msg)
        }else{
            localStorage.setItem('user', JSON.stringify(user))
            nav('/about');
        }
    }

    return(
        <div className="signup-container">
                <input type="text" placeholder="FIRST NAME" value={firstName} onChange={handleFirstName}/>
                <input type="text" placeholder="LAST NAME" value={lastName} onChange={handleLastName}/>
                <input type="email" placeholder="EMAIL" value={email} onChange={handleEmail}/>
                <input type="password" placeholder="PASSWORD" value={password} onChange={handlePassword}/>
                <input type="text" placeholder="AGE" value={age} onChange={handleAge}/>
                <button onClick={onSignup}>SIGNUP</button>
                {/* <button onClick={onGotoLogin}>GO TO LOGIN</button> */}
                <Link to="/"><span>LOGIN</span></Link>
        </div>
    )
}

export default Signup