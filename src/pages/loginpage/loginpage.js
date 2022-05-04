import React from 'react';
import './loginpage.css';
import { Link } from "react-router-dom";
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const Loginpage = () => {
  const navigate = useNavigate();
  let username;
  let password;

  const handleUsernameChange = (e) => {
    username = e.target.value;
  }

  const handlePasswordChange = (e) => {
    password = e.target.value;
  }

  const onSubmit = (e) => {
    e.preventDefault()
    //console.log(username, password);
    fetch ('http://localhost:8000/api/verify', {
      method: 'post',
      headers: {
        'Accept'      : 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify({
        "username": username,
        "password": password
      })
    }).then(function(response) {
      return response.json();
    }).then(function(data) {
      //console.log(data.data.status)
      if(data.data.status){
        //document.cookie = "";
        //clear all cookies
        let foo = "user=" + username + "&password=" + password + "&id=" + data.data.id;
        //console.log(foo);
        document.cookie = foo;
        console.log(document.cookie);
        navigate('/');
      }
  })}

  return (
    <>
      <Navbar/>
      <div className='login-bg'/>
      <div className='yeet-1-txt'>Join the marketplace!</div>
      <div className='yeet-2-txt'>Join GAZZ-Kun!</div>
      <div className='log-register-bg'/>
      <Link to='/register' activeStyle>
        <div className='log-register-title'>Register</div>
      </Link>
      <div className='normal-signin-bg'/>
      <Link to='/' activeStyle>
        <div className='normal-signin' onClick={onSubmit}>Sign In</div>
      </Link>
      <div className='google-signin-bg'/>
      <div className='google-signin'>Sign In with google</div>
      <div className='user-bg'/>
      <input type="text" placeholder="Enter username" className='user-txt' onChange={handleUsernameChange}>
      </input>
      <div className='user-title'>Username</div>
      <div className='forgor'>Forgor password?</div>
      <div className='pass-bg'/>
      <input type="text" placeholder="Enter password" className='pass-txt' onChange={handlePasswordChange}>
      </input>
      <div className='pass-title'>Password</div>
      <Footer/>
    </>
  )
}

export default Loginpage;