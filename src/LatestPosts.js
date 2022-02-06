import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHeart, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import ReactTimeAgo from 'react-time-ago'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import './LatestPosts.css';
import { useState } from 'react';

const LatestPosts = (props) => {



    let posts = props.postList.map(post => {
        let currentUser = props.currentUser;

        const handleDelete = () => {
            console.log('działa', post.id)

            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + currentUser.jwt_token
            }

            const deletePost = id => {
                props.setPostList(posts => {
                    console.log(posts)
                    let filteredPosts = posts.filter(post => post.id !== id)

                    return filteredPosts
                })
            }

            axios.post('https://akademia108.pl/api/social-app/post/delete', { "post_id": post.id }, headers)
                .then(res => {
                    console.log(res.data);
                })
        }


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
                <FontAwesomeIcon onClick={handleDelete} icon={faTrashAlt} className='delete-icon'></FontAwesomeIcon>
                <p>{post.content}</p>
                <div className="post-like">
                    <FontAwesomeIcon icon={faHeart} className={'like-icon'}></FontAwesomeIcon>
                    <p>{post.likes.length}</p>
                </div>
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