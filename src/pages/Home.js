import React, {useState} from "react";
import { db } from "../firebase";
import BlogSummary from "./BlogSummary";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [blogPosts, setBlogPosts] = useState([]);

  if(loading && !blogPosts.length){
    db
    .ref("/posts")
    .orderByChild("dateFormatted")
    .once("value")
    .then(snapshot => {
      console.log(snapshot.val());
      const snapshotVal = snapshot.val();
      let posts = [];
      for(let i in snapshotVal){
        posts.push(snapshotVal[i]);
      }
      const newestFirst = posts.reverse();
      setBlogPosts(newestFirst);
      setLoading(false);
    })
  }

  // if(loading){
  //   return <h1>Loading.... </h1>
  // }
  return (
    <>
      <h1>Blog posts</h1>
      <br/>
      {blogPosts && <BlogSummary blogPosts={blogPosts} loading={loading} />}
    </>
  );
};

export default Home;
