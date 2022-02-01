import { useState } from "react/cjs/react.development";
import { NavLink, } from "react-router-dom";
import '../SignUpForm.css'
import axios from "axios";

const LogIn = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('')
    const [messageIsVisible, setMessageIsVisible] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault();

        let loginData = {
            "username": userName,
            "password": password,
            "ttl": 3600
        }

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }


        axios.post('https://akademia108.pl/api/social-app/user/login', loginData, headers)
            .then(res => {
                console.log(res.status);

                if (res.status === 201 && res.data.username) {
                    console.log('zły uzytkownik')
                    setMessage(<p className="login-error" style={{ textAlign: 'center' }}>{res.data.username}</p>);
                    setMessageIsVisible(true);
                }

                if (res.status === 201 && res.data.password) {
                    console.log('złe hasło')
                    setMessage(<p className="login-error" style={{ textAlign: 'center' }}>{res.data.password}</p>);
                    setMessageIsVisible(true);
                }

                if (res.data.error === true) {
                    setMessage(<p className="login-error" style={{ textAlign: 'center' }}>Username or password is incorect</p>);
                    setMessageIsVisible(true);
                }

                if (res.data.error === false) {
                    localStorage.setItem('user', res.data.jwt_token);
                    setUserName('');
                    setPassword('');
                }
            })
    }




    return (
        <div className="login-form">
            {messageIsVisible ? message : null}
            <h1>Log In</h1>
            <form className='form' onSubmit={handleSubmit}>
                <input onChange={e => setUserName(e.target.value)} value={userName} type="text" id='username' name='username' placeholder="Username" />
                <input onChange={e => setPassword(e.target.value)} value={password} type="password" id='password' name='password' placeholder="Password" />
                <button type="submit">Log In</button>
            </form>
            <p>First time in Connectify? Create account <NavLink className='sign-btn' to="/signup">here.</NavLink></p>
        </div>
    );
}

export default LogIn;