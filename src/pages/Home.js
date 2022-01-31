import { useState, useEffect } from "react";
import LatestPosts from "../LatestPosts";
import OlderPosts from "../OlderPosts";
import Loader from "../Loader";
import axios from "axios";

const Home = () => {
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
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        axios.post('https://akademia108.pl/api/social-app/post/older-then', axiosConfig)
            .then(res => {
                setOlderPostList(res.data);

            })
            .catch((error) => {
                console.error(error);
            })
    }

    const handleButton = () => {
        console.log('działa')
        getOlderPostData();
        setButtonVisible(false);
    }


    return (
        <div className="Home">
            {loaderVisible ? <Loader /> : null}
            <LatestPosts postList={postList} handleButton={handleButton} buttonVisible={buttonVisible} />
            <OlderPosts olderPostList={olderPostList} />
        </div>
    );
}

export default Home;