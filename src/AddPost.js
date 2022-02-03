import axios from 'axios';
import { useState } from 'react';
import './AddPost.css'

const AddPost = (props) => {
    const [postData, setPostData] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        let postData = {
            'username': 'adam',
            'password': '1234'
        }

        let axiosConfig = {
            'headers': {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + props.currentUser.jwt_token
            }
        };

        axios.post('https://akademia108.pl/api/social-app/post/add', postData, axiosConfig)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }



    return (
        <div className="AddPost">
            <form onSubmit={handleSubmit}>
                <textarea onChange={e => setPostData(e.target.value)} value={postData} placeholder='Tell us what you are thinking now!' className="post-input" name="post"></textarea>
                <button type="submit">Add</button>
            </form>
        </div>
    );
}

export default AddPost;