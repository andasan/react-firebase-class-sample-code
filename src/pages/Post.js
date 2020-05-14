import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { db } from "../firebase";
import useModal from 'react-hooks-use-modal';

const Post = ({ match, history,location }) => {
  console.log(match, history, location);
  const [loading, setLoading] = useState(true);
  const [currentPost, setCurrentPost] = useState();
  const [Modal, open, close, isOpen] = useModal('root', {
    preventScroll: true
  });

  const slug = match.params.slug;

  if (loading && !currentPost) {
    db
      .ref(`/posts/${slug}`)
      .once("value")
      .then(snapshot => {
        if (snapshot.val()) {
          setCurrentPost(snapshot.val());
        }
        setLoading(false);
      })
      .catch(err => console.error(err.message));
  }

  if (loading) {
    return <h1>Loading......</h1>
  }

  const postDoesNotExist = !currentPost;
  if (postDoesNotExist) {
    return <Redirect to="/404" />
  }

  const deletePost = () => {
    db
      .ref(`/posts/${slug}`)
      .remove()
      .then(()=> history.push(`/`))
      .catch(err => console.error(err.message))
  }

  return (
    <>
      <img src={currentPost.coverImage} width="100%" alt={currentPost.coverImageAlt} />
      <h1>{currentPost.title}</h1>
      <p>{currentPost.datePrettify}</p>
      <p>{currentPost.content}</p>
      <br />
      <Link to={`/edit/${currentPost.slug}`}>Edit</Link>
      &nbsp;
      <Link to="#" onClick={open}>Delete</Link>

      <Modal>
        <div className="modal">
          <h1>Oh nooooeesss</h1>
          <p>Are you sure you want to delete this post?</p>
          <div className="modal-buttons">
            <button onClick={close}>NO!</button>
            <button onClick={deletePost}>YUP!</button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Post;
