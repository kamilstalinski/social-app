import { useState, useEffect } from "react";
import LatestPosts from "../LatestPosts";
import axios from "axios";

const Home = () => {
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        getPostData();
    }, [])

    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };

    const getPostData = () => {
        axios.post('https://akademia108.pl/api/social-app/post/latest', axiosConfig)
            .then(res => {
                let posts = res.data;
                // console.log(posts);


                let newPostList = [];
                Object.keys(posts).forEach(post => {
                    let newPost = posts[post];

                    let newPostObj = {
                        content: newPost.content,
                        time: newPost.updated_at,
                        user: newPost.user
                    }

                    newPostList.push(newPostObj)
                })

                setPostList(newPostList)
            })
    }
    console.log(postList)

    return (
        <div className="Home">
            <h1>Latest Posts:</h1>
            <LatestPosts postList={postList} />
        </div>
    );
}

export default Home;