import React, {useState} from 'react';
import { db } from "../firebase";

const Edit = ({match, history}) => {
    const slugParams = match.params.slug;
    const [loading, setLoading] = useState(true);

    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [coverImageAlt, setCoverImageAlt] = useState("");
    const [content, setContent] = useState("");

    if(loading){
        db
            .ref(`/posts/${slugParams}`)
            .once("value")
            .then(snapshot => {
                if(snapshot.val()){
                    const currentPost = snapshot.val();
                    setTitle(currentPost.title);
                    setSlug(currentPost.slug);
                    setCoverImage(currentPost.coverImage);
                    setCoverImageAlt(currentPost.coverImageAlt);
                    setContent(currentPost.content);
                }
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                console.error(err.message);
            });
    }

    const editPost = () => {
        // console.log(title, slug, coverImage, coverImageAlt, content);
        const date = generateDate()
        const editedPost = {
            title,
            dateFormatted: date.formatted,
            datePrettify: date.pretty,
            slug,
            coverImage,
            coverImageAlt,
            content
        }
        db
            .ref(`posts/${slug}`)
            .set(editedPost)
            .then(() => history.push('/'))
            .catch(err => console.error(err.message));
    }

    const generateDate = () => {
        const now = new Date();
        const option = { month: "long", day: "numeric", year: "numeric" };

        const year = now.getFullYear();

        let month = now.getMonth() + 1;
        if(month < 10){
            month = `0${month}`;
        }

        let day = now.getDate();
        if(day < 10){
            day = `0${day}`;
        }

        return {
            formatted: `${year}-${month}-${day}`,
            pretty: now.toLocaleDateString("en-US", option)
        }
    }

    if(loading){
        return <div>Loading.....</div>
    }

    return (
        <div>
            <h1>Edit post</h1>
           <section>
               <label htmlFor="title-field">Title</label>
               <input 
                    id="title-field" 
                    value={title} 
                    type="text" 
                    onChange={({target: {value}}) => {
                        setTitle(value);
                    }}/>

               <label htmlFor="cover-image-field">Cover Image</label>
               <input 
                    id="cover-image-field"
                    value={coverImage}
                    type="text" 
                    onChange={({target: {value}}) => {
                    setCoverImage(value);
                }} />

               <label htmlFor="cover-image-alt-field">Cover Image Alt</label>
               <input 
                    id="cover-image-field-alt"
                    value={coverImageAlt}
                    type="text" 
                    onChange={({target: {value}}) => {
                        setCoverImageAlt(value);
                    }} />

               <label htmlFor="content-field">Content</label>
               <textarea
                    id="content-field"
                    type="text"
                    value={content}
                    onChange={({target: {value}}) => {
                        setContent(value);
                    }}
               />

               <button onClick={editPost}>Edit</button>
           </section>
        </div>
    );
};

export default Edit;