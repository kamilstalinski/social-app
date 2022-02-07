import axios from "axios";
import { useEffect } from "react";
import './Recommended.css'

const Recommended = (props) => {
    let currentUser = props.currentUser;

    useEffect(() => {
        const headers = {
            'headers': {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + currentUser.jwt_token
            }
        }

        axios.post('https://akademia108.pl/api/social-app/follows/recommendations', headers)
            .then(res => {
                console.log(res)
            })
    }, [])

    return (
        <div className="Recommended">
            <h1>People you may know</h1>
            <div className="recommendation-container">
                <div className="recommendation">
                    <img src="https://akademia108.pl/api/social-app/img/avatar1.png" alt="avatar" />
                    <h2>Username</h2>
                    <button>Follow</button>
                </div>
                <div className="recommendation">
                    <img src="https://akademia108.pl/api/social-app/img/avatar1.png" alt="avatar" />
                    <h2>Username</h2>
                    <button>Follow</button>
                </div>
                <div className="recommendation">
                    <img src="https://akademia108.pl/api/social-app/img/avatar1.png" alt="avatar" />
                    <h2>Username</h2>
                    <button>Follow</button>
                </div>
            </div>
        </div>
    );
}

export default Recommended;