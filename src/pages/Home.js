import { useState, useEffect } from "react";
import LatestPosts from "../LatestPosts";
import Loader from "../Loader";
import axios from "axios";
import AddPost from "../AddPost";
import RecommendedFollowers from "../RecommendedFollowers";

const Home = (props) => {
    const [postList, setPostList] = useState([]);
    const [loaderVisible, setLoaderVisible] = useState(true);
    const [buttonVisible, setButtonVisible] = useState(true);

    useEffect(() => {
        getPostData();
        setButtonVisible(false);
    }, [])

    const getPostData = () => {
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        axios.post('https://akademia108.pl/api/social-app/post/latest', axiosConfig)
            .then(res => {
                setPostList(res.data);
                setLoaderVisible(false);
                setButtonVisible(true)
            })
    }

    const getOlderPostData = () => {
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        axios.post('https://akademia108.pl/api/social-app/post/older-then', { 'date': postList[postList.length - 1].created_at }, axiosConfig)
            .then(res => {
                setPostList(postList.concat(res.data));
            })
            .catch(err => {
                console.error(err);
            })
    }

    const handleButton = () => {
        getOlderPostData();
        setButtonVisible(false);
    }


    return (
        <div className="Home" style={{ marginTop: '20px' }}>
            {loaderVisible ? <Loader /> : null}
            {props.currentUser && <RecommendedFollowers currentUser={props.currentUser} />}
            {props.currentUser && <AddPost currentUser={props.currentUser} postList={postList} setPostList={setPostList} />}
            <LatestPosts postList={postList} setPostList={setPostList} currentUser={props.currentUser} handleButton={handleButton} buttonVisible={buttonVisible} />
        </div>
    );
}

export default Home;