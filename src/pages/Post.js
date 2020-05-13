import React, {useState} from "react";

const Post = ({ match }) => {
  const [loading, setLoading] = useState(true);
  const [currentPost, setCurrentPost] = useState();

  const slug = match.params.slug;


  //firebase


  if(loading){
    return <h1>Loading......</h1>
  }

  return (
    <>
      <h1>This is a template for blog posts.</h1>
      <p>We'll get to this once we've hooked up Firebase!</p>
    </>
  );
};

export default Post;
