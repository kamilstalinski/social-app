import { NavLink } from 'react-router-dom';
import './Navbar.css'

const Navbar = (props) => {
    let loggedIn = props.loggedIn;


    return (
        <div className="navbar-section">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <a href="">Connectify</a>
                </div>
                <ul>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="signup">Sign Up</NavLink>
                    <NavLink className='log-in' to="login">Login</NavLink>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;