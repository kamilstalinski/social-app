import { useState, useEffect } from 'react';
import axios from 'axios';

import './SignUpForm.css';



const SignUpForm = (props) => {

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const [userNameErr, setUserNameErr] = useState({});
    const [emailErr, setEmailErr] = useState({});
    const [passwordErr, setPasswordErr] = useState({});
    const [password2Err, setPassword2Err] = useState({});


    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = formValidation();

        let postData = {
            username: userName,
            email: email,
            password: password
        };
        console.log(postData)

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        if (isValid) {
            //axios.post
            axios.post(
                'https://akademia108.pl/api/social-app/user/signup',
                postData,
                axiosConfig)
                .then((res) => {
                    console.log("RESPONSE RECEIVED: ", res);
                })
                .catch((err) => {
                    console.log("AXIOS ERROR: ", err);
                })
        };

        setUserName('');
        setEmail('');
        setPassword('');
        setPassword2('')
    };

    //Form validation

    const formValidation = () => {

        const userNameErr = {};
        const emailErr = {};
        const passwordErr = {};

        let containNumAndSpecial = /^(?=.*[0-9])(?=.*[!@#$%^&*])/
        let is6CharLong = /^(?=.{6,})/

        let isValid = true;

        if (userName === '') {
            userNameErr.userNameEmpty = 'Username cannot be empty';
            isValid = false;
        }

        if (userName.includes(' ')) {
            userNameErr.userNameWhiteSpace = 'Username cannot contain blank characters';
            isValid = false;
        }

        if (userName.length < 4) {
            userNameErr.userNameShort = 'Username is too short';
            isValid = false;
        }

        if (!email.includes('@')) {
            emailErr.emailMissingAt = 'Email address is missing "@"'
            isValid = false;
        }

        if (email === '') {
            emailErr.emailEmpty = 'Email address cannot be empty';
            isValid = false;
        }

        if (!is6CharLong.test(password)) {
            passwordErr.passwordLength = 'Password must have at least 6 characters'
            isValid = false;
        }

        if (!containNumAndSpecial.test(password)) {
            passwordErr.passwordSpecialChar = 'Password must contain at least one number and one of special characters "!@#$%"'
            isValid = false;
        }

        if (password !== password2) {
            passwordErr.passwordIsWrong = 'Password fields have to be the same';
            isValid = false;
        }

        setUserNameErr(userNameErr);
        setEmailErr(emailErr);
        setPasswordErr(passwordErr);
        return isValid;
    }


    return (
        <div className="sign-up-form">
            <h1>Join Our community!</h1>
            <form className='form' onSubmit={handleSubmit}>
                <input onChange={e => setUserName(e.target.value)} value={userName} type="text" id='username' name='username' placeholder="Username" />
                <input onChange={e => setEmail(e.target.value)} value={email} type="email" id='email' name='email' placeholder="E-mail" />
                <input onChange={e => setPassword(e.target.value)} value={password} type="password" id='password' name='password' placeholder="Password" />
                <input onChange={e => setPassword2(e.target.value)} value={password2} type="password" id='password2' name='password2' placeholder="Confirm Password" />
                <button type="submit">Sign Up</button>
                {Object.keys(userNameErr).map((key) => {
                    return <div className='errors'>*{userNameErr[key]}</div>
                })}
                {Object.keys(emailErr).map((key) => {
                    return <div className='errors'>*{emailErr[key]}</div>
                })}
                {Object.keys(passwordErr).map((key) => {
                    return <div className='errors'>*{passwordErr[key]}</div>
                })}
            </form>
        </div>
    );
}

export default SignUpForm;