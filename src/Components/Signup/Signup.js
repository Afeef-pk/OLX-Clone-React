import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { FirebaseContext } from "../../store/Context";
import Logo from "../../olx-logo.png";
import "./Signup.css";
import Swal from 'sweetalert2';

export default function Signup() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { firebase } = useContext(FirebaseContext);
  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };
  const handleNameChange = (event) => {
    setUsername(event.target.value);
    if (event.target.value !== "") {
      setNameError("");
    }
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    if (event.target.value !== "") {
      setEmailError("");
    }
  };
  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
    if (event.target.value > 10) {
      setPhoneError("");
    }
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (event.target.value > 6) {
      setPasswordError("");
    }
  };
  const handleSignup = (e) => {
    e.preventDefault();
    if (username === "") {
      setNameError("Please enter your name.");
      return;
    }
    if (email === "") {
      setEmailError("Please enter your email.");
      return;
    }
    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email.");
      return;
    }
    if (phone.length < 10) {
      setPhoneError("Please enter 10 digits");
      return;
    }
    if (password.length < 6) {
      setPasswordError("Password minimum 6 digit");
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result.user.updateProfile({ displayName: username }).then(() => {
          firebase
            .firestore()
            .collection("users")
            .add({
              id: result.user.uid,
              username: username,
              phone: phone,
            })
            .then(() => {
              history.push("/");
            });
        });
      }).catch(()=>{
        Swal.fire({
          icon: 'error',
          title: 'Email Already Registered',
        });
      })
  };
  return (
    <React.Fragment>
      <div className="signupParentDiv">
        <img width="350px" height="180px" src={Logo} alt="logo"></img>
        <form onSubmit={handleSignup}>
          <label htmlFor="fname">Username</label>
          <input
            className="input"
            type="text"
            value={username}
            onChange={handleNameChange}
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          {nameError && <p style={{ color: "red" }}>{nameError}</p>}
          <br />
          <label htmlFor="fname">Email</label>
          <input
            className="input"
            type="email"
            value={email}
            onChange={handleEmailChange}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          {emailError && <p style={{ color: "red" }}>{emailError}</p>}
          <br />
          <label htmlFor="lname">Phone</label>
          <input
            className="input"
            type="number"
            value={phone}
            onChange={handlePhoneChange}
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          {phoneError && <p style={{ color: "red" }}>{phoneError}</p>}
          <br />
          <label htmlFor="lname">Password</label>
          <input
            className="input"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
          <br />
          <button>Signup</button>
        </form>
        <br />
        <h6 style={{textAlign:'center'}}>Already have an account ? <span><Link to='/login'> Login</Link></span></h6>
      </div>
    </React.Fragment>
  );
}
