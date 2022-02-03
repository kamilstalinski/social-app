import './SignUp.css'
import SignUpForm from '../SignUpForm';
import { Navigate } from 'react-router-dom';

const SignUp = (props) => {
    return (
        <div className="sign-up">
            {props.currentUser && <Navigate to='/' />}
            <SignUpForm />
        </div >
    );
}

export default SignUp;