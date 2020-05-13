import React from "react";

const Post = ({ match }) => {
  const slug = match.params.slug;

  return (
    <>
      <h1>This is a template for blog posts.</h1>
      <p>We'll get to this once we've hooked up Firebase!</p>
    </>
  );
};

export default Post;
