import axios from "axios";
import { useEffect } from "react";

const RecommendedFollowers = (props) => {
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
    })

    return (
        <div className="RecommendedFollowers">
            <h1>People you may know</h1>
        </div>
    );
}

export default RecommendedFollowers;