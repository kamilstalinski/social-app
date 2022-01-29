import { useState, useEffect } from "react";
import LatestPosts from "../LatestPosts";
import Loader from "../Loader";
import axios from "axios";

const Home = () => {
    const [postList, setPostList] = useState([]);
    const [loaderVisible, setLoaderVisible] = useState(true);

    useEffect(() => {
        getPostData();
        setLoaderVisible(false)
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
            })
    }

    return (
        <div className="Home">
            {loaderVisible ? <Loader /> : null}
            <LatestPosts postList={postList} />
            <button>Load More</button>
        </div>
    );
}

export default Home;