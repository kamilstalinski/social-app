import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHeart } from '@fortawesome/free-solid-svg-icons';
import './LatestPosts.css';
import Loader from './Loader';

const LatestPosts = (props) => {
    console.log(props.postList)

    let posts = props.postList.map(post => {

        const elapsedTime = () => {
            let actualDate = Date();
            let postDate = post.created_at;

            console.log(actualDate)
        }

        elapsedTime()

        return (
            <li key={post.id} className="post-container">
                <div className="post-header">
                    <div className="post-header-avatar">
                        <FontAwesomeIcon icon={faUser} className='avatar-icon' ></FontAwesomeIcon>
                    </div>
                    <div className="post-header-info">
                        <h1>{post.user.username}</h1>
                        <h2>{post.created_at}</h2>
                    </div>
                </div>
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
        </div>
    );
}

export default LatestPosts;