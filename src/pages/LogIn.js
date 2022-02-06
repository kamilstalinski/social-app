import { useState } from "react/cjs/react.development";
import { Navigate, NavLink } from "react-router-dom";
import '../SignUpForm.css'
import axios from "axios";

const LogIn = (props) => {
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

                if (res.status === 201 && res.data.username) {
                    setMessage(<p className="login-error" style={{ textAlign: 'center' }}>{res.data.username}</p>);
                    setMessageIsVisible(true);
                }

                if (res.status === 201 && res.data.password) {
                    setMessage(<p className="login-error" style={{ textAlign: 'center' }}>{res.data.password}</p>);
                    setMessageIsVisible(true);
                }

                if (res.data.error === true) {
                    setMessage(<p className="login-error" style={{ textAlign: 'center' }}>Username or password is incorect</p>);
                    setMessageIsVisible(true);
                }

                if (res.data.error === false) {
                    localStorage.setItem('user', JSON.stringify(res.data));
                    props.setCurrentUser(res.data);
                    setUserName('');
                    setPassword('');
                    // navigate('/');
                }
            });
    }




    return (
        <div className="login-form">
            {props.currentUser && <Navigate to='/' />}
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