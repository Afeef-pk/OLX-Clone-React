import React, { useState, useContext } from "react";
import { FirebaseContext } from "../../store/Context";
import {Link, useHistory } from "react-router-dom";
import Logo from "../../olx-logo.png";
import "./Login.css";
import Swal from 'sweetalert2';

function Login() {
  const history = useHistory()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { firebase } = useContext(FirebaseContext);

  const handleLogin = (e) => {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
      history.push('/')
    }).catch((error)=>{
      Swal.fire({
        icon: 'error',
        title: 'Invalid username or password',
        text: 'Please check your username and password and try again',
      });
    })
  };
  return (
    <div>
      <div className="loginParentDiv">
        <img width="350px" height="200px" src={Logo} alt='logo'></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <br />
        <h6 style={{textAlign:'center'}}>Don't have an account ? <span><Link to='/signup'> Signup</Link></span></h6>
      </div>
    </div>
  );
}

export default Login;
