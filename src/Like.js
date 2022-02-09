
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

const Like = (props) => {
    const [likesNum, setLikesNum] = useState(props.post.likes.length)
    const [className, setClassName] = useState('')

    useEffect(() => {
        for (let i = 0; i < props.post.likes.length; i++) {
            if (props.post.likes[i].id !== props.currentUser.id) {
                console.log('like dodany')
            }
        }
    }, [props.handleLike])


    return (
        <div className="post-like">
            <FontAwesomeIcon onClick={() => props.handleLike(props.post)} icon={faHeart} className={'like-icon'}></FontAwesomeIcon>
            <p>{likesNum}</p>
        </div>
    );
}

export default Like;