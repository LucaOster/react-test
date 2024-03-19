import axios from 'axios';
import swal from "sweetalert";
import { Navigate , useNavigate} from 'react-router-dom';
import React, { useState } from "react";

import logosrc from "@assets/logo.png";
import smalllogsrc from "@assets/smalllogo.png";
import favorsrc from "@assets/favicon.ico";
import eyesrc from "@assets/eye.svg";
import eyeoff from "@assets/eye-off.svg";


import '@styles/App.scss';


function Login() {
    const [changeicon, setChangeIcon] = useState(false);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);
    const navigate = useNavigate();

    function handleLoginClick() {
        if (isValidEmail && email !== "" && password !== "") {
            onClick();
        } else {
            alert("Please enter a valid email address");
        }
    }

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        setIsValidEmail(validateEmail(newEmail));
    };

    const validateEmail = (input) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(input);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isValidEmail) {
            console.log("Submitted email:", email);
        } else {
            console.log("Invalid email:", email);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
        setChangeIcon(!changeicon);
    };
    const onClick = () => {
        axios.post("http://192.168.80.12:5000/login/",
            { user: { username: email, password: password} }
        ).then((res) => {
            if (res.data.message === "Login successfully") {
                swal({
                text: res.data.message,
                icon: "success",
                type: "success"
                }).then(() => {
                    navigate("/dashboard");
                });
            } else {
                swal({
                text: res.data.message,
                icon: "error",
                type: "error"
                })
            }
        });
    }

    const onChange = (e) => {
        const {name, value} = e.target;
        if (name === 'username') {
            setUsername(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    }
        
    return (
        <div className='login-container'>
            <div className='small-logo-container'>
                <img src={smalllogsrc} className='smalllogo'></img>
            </div>
            
            <div className='logo-container'>
                <img src={logosrc} className='imagestyle'></img>
            </div>

            <img src={favorsrc} className='favorlogo'></img>
            
            <div className='inputstyle'>
                <p className='pstyle'>Sign in to Vaultik</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter your email"
                        value={email}
                        onChange={handleEmailChange}
                        className='inputtagstyle'
                    />
                    {!isValidEmail && (
                        <p style={{ color: "red" }}>Please enter a valid email address</p>
                    )}
                    {(email == "") && (
                        <p style={{ color: "red" }}>Please enter password</p>
                    )}
                </form>
                <div className='password-container'>
                    <input
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                        onChange={onChange}
                        name='password'
                        className='inputtagstyle'
                        style={{border:0, margin:0}}
                        required
                    />
                    <img
                        src={ changeicon ? eyeoff : eyesrc}
                        alt="Eye Icon"
                        className='eye-icon'
                        onClick={togglePasswordVisibility}
                    />
                
                </div>
                {(password == "") && (
                    <p style={{ color: "red" }}>Please enter password</p>
                )}
                <p className='forgotstyle'>Forgot password?</p>
                <button onClick={handleLoginClick} className='buttonstyle' >Log in</button>
            </div>
        </div>
    );
}
export default Login;