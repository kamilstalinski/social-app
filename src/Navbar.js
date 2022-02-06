import axios from 'axios';
import { NavLink } from 'react-router-dom';
import './Navbar.css'

const Navbar = (props) => {
    let currentUser = props.currentUser;

    const handleLogOut = () => {
        let headers = {
            'headers': {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + currentUser.jwt_token
            }
        }

        axios.post('https://akademia108.pl/api/social-app/user/logout', {}, headers)
            .then(res => {
                props.setCurrentUser(null);
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className="navbar-section">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <a href="/">Connectify</a>
                </div>
                <ul>
                    <NavLink to="/">Home</NavLink>
                    {!currentUser ? <NavLink to="signup">Sign Up</NavLink> : null}
                    {currentUser ? <button onClick={handleLogOut} className='log-out' to="login">Log Out</button> : <NavLink className='log-in' to="login">Login</NavLink>}
                </ul>
            </div>
        </div>
    );
}

export default Navbar;