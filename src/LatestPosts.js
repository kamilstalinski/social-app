import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHeart } from '@fortawesome/free-solid-svg-icons';
import './LatestPosts.css';

const LatestPosts = (props) => {
    let posts = props.postList.map(post => {

        return (
            <li key={post.id} className="post-container">
                <header className="post-header">
                    <div className="post-header-avatar">
                        <FontAwesomeIcon icon={faUser} className='avatar-icon'></FontAwesomeIcon>
                    </div>
                    <div className="post-header-info">
                        <h1>{post.user.username}</h1>
                        <h2>{post.created_at}</h2>
                    </div>
                </header>
                <p>{post.content}</p>
                <div className="post-like">
                    <FontAwesomeIcon icon={faHeart} className='like-icon'></FontAwesomeIcon>
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
            {props.buttonVisible ? <button className='load-more-btn' onClick={props.handleButton}>Load More</button> : null}
        </div>
    );
}

export default LatestPosts;