import React, {useState} from "react";
import { Redirect } from "react-router-dom";
import { db } from "../firebase";

const Post = ({ match }) => {
  const [loading, setLoading] = useState(true);
  const [currentPost, setCurrentPost] = useState();

  const slug = match.params.slug;

  if(loading && !currentPost){
    db
    .ref(`/posts/${slug}`)
    .once("value")
    .then(snapshot => {
      if(snapshot.val()){
        setCurrentPost(snapshot.val());
      }
      setLoading(false);
    })
    .catch(err => console.error(err.message));
  }

  if(loading){
    return <h1>Loading......</h1>
  }

  const postDoesNotExist = !currentPost;
  if(postDoesNotExist) {
    return <Redirect to="/404" />
  }

  return (
    <>
      <img src={currentPost.coverImage} width="100%" alt={currentPost.coverImageAlt} />
      <h1>{currentPost.title}</h1>
      <p>{currentPost.datePrettify}</p>
      <p>{currentPost.content}</p>
    </>
  );
};

export default Post;
