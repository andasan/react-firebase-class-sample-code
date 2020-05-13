import React, {useState} from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";

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

  if(loading){
    return <h1>Loading.... </h1>
  }
  return (
    <>
      <h1>Blog posts</h1>
      <br/>
      {blogPosts && blogPosts.map(blogPost => (
        <section key={blogPost.slug} className="card">
          <img src={blogPost.coverImage} alt={blogPost.coverImageAlt} />
          <div className="card-content">
            <h2>
              <Link to={`/${blogPost.slug}`}>{blogPost.title}</Link> &mdash;{" "}
              <span className="card-date">{blogPost.datePrettify}</span>
            </h2>
            <span
              dangerouslySetInnerHTML={{
                __html: `${blogPost.content.substring(0, 200)}...`
              }}
            ></span>
            <Link to={`/${blogPost.slug}`}>Continue reading...</Link>
          </div>
        </section>
      ))}
    </>
  );
};

export default Home;
