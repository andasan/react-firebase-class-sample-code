import React from 'react';
import { Link } from "react-router-dom";
import preloader from "../hoc/preloader";

const BlogSummary = ({ blogPosts, loading }) => {
    return (
        <div>
            {blogPosts.map(blogPost => (
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
        </div>
    );
};

export default preloader(BlogSummary);