import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHeart, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import ReactTimeAgo from 'react-time-ago'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import './LatestPosts.css';
import { useState } from 'react';
import Like from './Like';

const LatestPosts = (props) => {

    let currentUser = props.currentUser;

    const [loggedInUser, setLoggedInUser] = useState(true);
    const [isLiked, setIsLiked] = useState()


    const headers = {
        'headers': {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + currentUser.jwt_token
        }
    }

    const handleDelete = (id, username) => {

        const deletePost = id => {
            props.setPostList(posts => {
                let filteredPosts = posts.filter(post => post.id !== id);
                return filteredPosts;
            })
        }

        axios.post('https://akademia108.pl/api/social-app/post/delete', { "post_id": id }, headers)
            .then(res => {
                if (currentUser.username === username) {
                    deletePost(id);
                } else {
                    console.log('Unauthorized')
                }
            })
    }

    const handleLike = post => {
        axios.post(!isLiked ? 'https://akademia108.pl/api/social-app/post/like' : 'https://akademia108.pl/api/social-app/post/dislike', { 'post_id': post.id }, headers)
            .then(res => {
                setIsLiked(res.data.liked);
                console.log(res.data.message)
            })
    }

    let posts = props.postList.map(post => {
        TimeAgo.addLocale(en)
        return (
            <li key={post.id} className="post-container">
                <header className="post-header">
                    <div className="post-header-avatar">
                        <FontAwesomeIcon icon={faUser} className='avatar-icon'></FontAwesomeIcon>
                    </div>
                    <div className="post-header-info">
                        <h1>{post.user.username}</h1>
                        <ReactTimeAgo className='date' date={Date.parse(post.created_at)} locale='en-UK' timeStyle='round-minute' />
                    </div>
                </header>
                {!loggedInUser ? null : <FontAwesomeIcon onClick={() => handleDelete(post.id, post.user.username)} icon={faTrashAlt} className='delete-icon'></FontAwesomeIcon>}
                <p>{post.content}</p>
                <Like post={post} isLiked={isLiked} handleLike={handleLike} currentUser={currentUser} />
            </li>
        )
    })

    return (
        <div className="LatestPosts">
            <ul className="post-list">
                {posts}
            </ul>
            <button className='load-more-btn' onClick={props.handleButton}>Load More</button>
        </div>
    );
}

export default LatestPosts;