import { useState } from 'react';
import axios from 'axios';
import Loader from './Loader';
import './SignUpForm.css';


const SignUpForm = () => {


    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const [userNameErr, setUserNameErr] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');

    const [registrationSuccessVisible, setRegistrationSuccessVisible] = useState(false);
    const [registrationFailedVisible, setRegistrationFailedVisible] = useState(false);
    const [loaderVisible, setLoaderVisible] = useState(false);
    const [errors, setErrors] = useState(false);
    const [message, setMessage] = useState('')


    const handleSubmit = (e) => {

        e.preventDefault();
        const isValid = formValidation();

        let postData = {
            username: userName,
            email: email,
            password: password
        };

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        if (isValid) {
            setLoaderVisible(true);
            //axios.post
            axios.post(
                'https://akademia108.pl/api/social-app/user/signup',
                postData,
                axiosConfig)
                .then((res) => {
                    console.log("RESPONSE RECEIVED: ", res);
                    let data = res.data;

                    if (data.signedup) {
                        setRegistrationSuccessVisible(true);
                        setRegistrationFailedVisible(false);
                        setUserName('');
                        setEmail('');
                        setPassword('');
                        setPassword2('');
                    } else {
                        setRegistrationFailedVisible(true)
                        if (data.message.username) {
                            setMessage(data.message.username);
                        } else if (data.message.email) {
                            setMessage(data.message.email);
                        }
                    }
                    setLoaderVisible(false)
                })
                .catch((err) => {
                    setRegistrationSuccessVisible(false)
                    console.log("AXIOS ERROR: ", err);
                })
        };

    };

    //Form validation
    const formValidation = () => {

        let userNameErr = '';
        let emailErr = '';
        let passwordErr = '';

        const containNumAndSpecial = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;
        const is6CharLong = /^(?=.{6,})/;
        // const emailRegex = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

        let isValid = true;

        if (userName === '') {
            userNameErr = 'Username cannot be empty';
            isValid = false;
            setErrors(true)
        } else if (userName.includes(' ')) {
            userNameErr = 'Username cannot contain blank characters';
            isValid = false;
            setErrors(true)
        } else if (userName.length < 4) {
            userNameErr = 'Username is too short';
            isValid = false;
            setErrors(true)
        }


        if (email === '') {
            emailErr = 'Email address cannot be empty';
            isValid = false;
            setErrors(true)
        }
        // } else if (!emailRegex.test(email)) {
        //     emailErr = 'Email adress is incorect';
        //     isValid = false;
        //     setErrors(true)
        // }

        //mail validation

        if (!is6CharLong.test(password)) {
            passwordErr = 'Password must have at least 6 characters'
            isValid = false;
            setErrors(true)
        } else if (!containNumAndSpecial.test(password)) {
            passwordErr = 'Password must contain at least one number and one of special characters "!@#$%"'
            isValid = false;
            setErrors(true)
        } else if (password !== password2) {
            passwordErr = 'Password fields have to be the same';
            isValid = false;
            setErrors(true)
        }

        setUserNameErr(userNameErr);
        setEmailErr(emailErr);
        setPasswordErr(passwordErr);
        return isValid;
    }


    return (

        <div className="sign-up-form">
            {registrationSuccessVisible ? <div className='registration-success'>Registration completed!</div> : null}
            {registrationFailedVisible ? <div className='registration-failed'>{message}</div> : null}
            <h1>Join Our community!</h1>
            <form className='form' onSubmit={handleSubmit}>
                <input onChange={e => setUserName(e.target.value)} value={userName} type="text" id='username' name='username' placeholder="Username" />
                {errors ? <p className='errors'>{userNameErr}</p> : null}

                <input onChange={e => setEmail(e.target.value)} value={email} type="email" id='email' name='email' placeholder="E-mail" />
                {errors ? <p className='errors'>{emailErr}</p> : null}

                <input onChange={e => setPassword(e.target.value)} value={password} type="password" id='password' name='password' placeholder="Password" />
                {errors ? <p className='errors'>{passwordErr}</p> : null}

                <input onChange={e => setPassword2(e.target.value)} value={password2} type="password" id='password2' name='password2' placeholder="Confirm Password" />
                <button type="submit">Sign Up</button>

                {loaderVisible ? <Loader /> : null}
            </form>

        </div>
    );
}

export default SignUpForm;