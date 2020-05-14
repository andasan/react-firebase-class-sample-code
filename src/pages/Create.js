import React, {useState} from 'react';
import slugify from 'react-slugify';
import { db } from "../firebase";

const Create = ({history}) => {
    const [title, setTitle] = useState("");
    // const [slug, setSlug] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [coverImageAlt, setCoverImageAlt] = useState("");
    const [content, setContent] = useState("");

    const createPost = () => {
        console.log(title, coverImage, coverImageAlt, content);
        
        const date = generateDate();
        const slugged = generateSlug();
        const newPost = {
            title,
            dateFormatted:date.formatted,
            datePrettify:date.pretty,
            slug: slugged,
            coverImage,
            coverImageAlt,
            content
        };
        db
            .ref(`posts/${slugged}`)
            .set(newPost)
            .then(()=> history.push(`/`))
            .catch(err => console.error(err.message))
    }

    const generateSlug = () => {
        const slugger = slugify(title);
        // console.log("slugged: ", slugger);
        // setSlug(slugger);
        return slugger;
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

    return (
        <div>
           <h1>Create a new post</h1>
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

               <button onClick={createPost}>Edit</button>
           </section>
        </div>
    );
};

export default Create;