import { useState, useEffect } from "react";
import LatestPosts from "../LatestPosts";
import OlderPosts from "../OlderPosts";
import Loader from "../Loader";
import axios from "axios";
import AddPost from "../AddPost";

const Home = (props) => {
    const [postList, setPostList] = useState([]);
    const [olderPostList, setOlderPostList] = useState([]);
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

        axios.post('https://akademia108.pl/api/social-app/post/older-then', { 'date': '2021-05-31T10:12:07.000000Z' }, axiosConfig)
            .then(res => {
                setOlderPostList(res.data);
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
            {props.currentUser && <AddPost currentUser={props.currentUser} />}
            <LatestPosts postList={postList} handleButton={handleButton} buttonVisible={buttonVisible} />
            <OlderPosts olderPostList={olderPostList} />
        </div>
    );
}

export default Home;