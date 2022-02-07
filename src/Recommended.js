import axios from "axios";
import { useEffect, useState } from "react";
import './Recommended.css'

const Recommended = (props) => {
    let currentUser = props.currentUser;
    const [recommendations, setRecommendations] = useState();


    useEffect(() => {
        const headers = {
            'headers': {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + currentUser.jwt_token
            }
        }

        axios.post('https://akademia108.pl/api/social-app/follows/recommendations', {}, headers)
            .then(res => {
                let recommendations = res.data.map(user => {
                    return (

                        <div key={user.id} className="recommendation">
                            <img src={user.avatar_url} alt="avatar" />
                            <h2>{user.username}</h2>
                            <button>Follow</button>
                        </div>

                    )
                })
                setRecommendations(recommendations)
            })
    }, [])



    return (
        <div className="Recommended">
            <h1>People you may know</h1>
            <div className="recommendation-container">
                {recommendations}
            </div>
        </div >
    );
}

export default Recommended;