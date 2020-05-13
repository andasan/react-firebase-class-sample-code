import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const blogPosts = [
    {
      title: "My Second Blog Post",
      content:
        "<p>The Long Trail Ale is a big fan of some Pilsner. When you see a spudgun toward the Honey Brown, it means that a Lone Star living with a Strohs panics. If the Red Stripe related to a Hefeweizen trades baseball cards with another Full Sail IPA, then a black velvet hibernates. When a Keystone toward a Sam Adams earns enough for a beer, a Stella Artois rejoices. When you see some surly malt, it means that a Kashmir IPA ceases to exist.</p>",
      coverImage: "https://source.unsplash.com/collection/190727/1600x900",
      coverImageAlt: "Another random image",
      slug: "my-second-blog-post",
      dateFormatted: "2300-08-07",
      datePrettify: "August 7th, 2300"
    },
    {
      title: "My First Blog Post",
      content:
        "<p>Most people believe that the tipsy Dos Equis requires assistance from a frozen Hefeweizen, but they need to remember how slyly the twisted malt prays. Indeed, a Dos Equis writes a love letter to a freight train. The intoxicatedly wet steam engine gets stinking drunk, or a line dancer thoroughly makes a pact with a barely drunk Imperial Stout. A shot completely makes a pact with the nearest miller light. Now and then, another shot cooks cheese grits for some Honey Brown toward a Coors.</p>",
      coverImage: "https://source.unsplash.com/collection/190728/1600x900",
      coverImageAlt: "A random image",
      slug: "my-first-blog-post",
      dateFormatted: "2300-08-01",
      datePrettify: "August 1st, 2300"
    }
  ];

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
            <p
              dangerouslySetInnerHTML={{
                __html: `${blogPost.content.substring(0, 200)}...`
              }}
            ></p>
            <Link to={`/${blogPost.slug}`}>Continue reading...</Link>
          </div>
        </section>
      ))}
    </>
  );
};

export default Home;
