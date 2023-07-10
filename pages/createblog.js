import { useRouter } from "next/router";
import { AuthContext } from "../context/auth_context";
import { sanityClient } from "../sanity_client";
import { Editor } from '@tinymce/tinymce-react';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from "react-hook-form";
import BreadcrumbOne from "../components/common/breadcrumb/breadcrumb-one";
import { useEffect, useState, useRef } from "react";

export default function CreateNews() {
    const editorRef = useRef(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [allCategories, setAllCategories] = useState([]);

    useEffect(()=>{
      sanityClient.fetch(`*[_type=="catagories"]{
        _id,
        catagoryName 
      }`)
      .then((res)=>setAllCategories(res))
      .catch((err)=>console.log("error while fetching categories",err))
    },[]);

    const createNewNews = (newsData) =>{
   
        let newStr = newsData.newstitle.toLowerCase();
        let ArrOfTitle = newStr.trim().split(" ");
        let slugStr = ArrOfTitle.join("-");
       
        let newsObj = {
           _type : "news",
           _id : uuidv4(),
           newsTitle : newsData.newstitle,
           newsShortDescription : newsData.shortDescription,
           newsCatagory : {
             _type : "reference",
             _ref : newsData.newsCategory
           },
           slug : {
            current : slugStr,
            _type : "slug"
           },
           newsLongDescription : [],
           newsImage : {
             _type : "image",
             asset : {
                _ref : "reference id of image",
                _type : "reference"
             }
           },
           newsVideo : {
            _type : "file",
            asset : {
                _ref : "reference id of video",
                _type  : "reference"
            }
           }
        }
        const extractElements = (input) => {
            const elementPattern = /<(\w+)>(.*?)<\/\1>/g;
            const longDescription = [];
          
            let match;
            while ((match = elementPattern.exec(input)) !== null) {
              const [, tag, text] = match;
              longDescription.push(
                {
                    _key : uuidv4(),
                    _type : "block",
                    children : [{
                        _key : uuidv4(),
                        _type : "span",
                        text : text
                    }],
                    markDefs : [],
                    style : tag=='p'?'normal':tag
                });
            }
          
            return longDescription
          };
          newsObj.newsLongDescription8 = extractElements(editorRef.current.getContent())
        sanityClient.assets.upload("file",newsData.newsVideo[0])
        .then((res)=>{
            newsObj.newsVideo.asset._ref = res._id;
        })
        .then(()=>{
            sanityClient.assets.upload("image",newsData.newsImage[0])
            .then((res)=>{
                newsObj.newsImage.asset._ref = res._id;
            })
            .then(()=>{
                sanityClient.create(newsObj)
                .then((res)=>{
                    console.log("news created succesfully",res);
                })
                .catch((err)=>console.log("error while creating news",err))
            })
            .catch((err)=>console.log("error while upload image",err))
        })
        .catch((err)=>console.log("error while upload video",err))
        
        console.log("create blog",newsData)
    } ;

    return (
        <div>
            <BreadcrumbOne title={"Create a News"} />
            <div className="section fugu-section-padding">
                <div className="container">
                    <div className="fugu-contact-wrap  wow fadeInUpX">
                        <form onSubmit={handleSubmit(createNewNews)}>
                            <div className="fugu-input-field">
                                <label>News Title</label>
                                <input
                                    type="text"
                                    placeholder="Your News Title*"
                                    {...register("newstitle", { required: true })}
                                    aria-invalid={errors.newstitle ? "true" : "false"}
                                />
                                {errors.newstitle?.type === "required" && (
                                    <p role="alert" className="error">
                                        News Title is required
                                    </p>
                                )}
                            </div>
                            <div className="fugu-input-field">
                                <label>News Image</label>
                                <input
                                    type="file"
                                    placeholder="Your News Image*"
                                    accept="image/*"
                                    {...register("newsImage", { required: true })}
                                    aria-invalid={errors.newsImage ? "true" : "false"}
                                />
                                {errors.newsImage?.type === "required" && (
                                    <p role="alert" className="error">
                                        News Image is required
                                    </p>
                                )}
                            </div>
                            <div className="fugu-input-field">
                                <label>News Video</label>
                                <input
                                    type="file"
                                    placeholder="Your News Video*"
                                    accept="video/*"
                                    {...register("newsVideo", { required: true })}
                                    aria-invalid={errors.newsVideo ? "true" : "false"}
                                />
                                {errors.newsVideo?.type === "required" && (
                                    <p role="alert" className="error">
                                        News Video is required
                                    </p>
                                )}
                            </div>
                            <div className="fugu-input-field">
                                <label>Write News Short Description</label>
                                <textarea
                                    name="textarea"
                                    placeholder="Write News Short Description*"
                                    {...register("shortDescription", { required: true })}
                                    aria-invalid={errors.shortDescription ? "true" : "false"}
                                ></textarea>
                                {errors.shortDescription?.type === "required" && (
                                    <p role="alert" className="error">
                                        Short Description is required
                                    </p>
                                )}
                            </div>
                            <div className="fugu-input-field">
                                <label>Write News Long Description</label>
                                <Editor
    onInit={(evt, editor) => editorRef.current = editor}
    initialValue="<p>This is the initial content of the editor.</p>"
    init={{
    height: 500,
    menubar: false,
    plugins: [
       'a11ychecker','advlist','advcode','advtable','autolink','checklist','export',
       'lists','link','image','charmap','preview','anchor','searchreplace','visualblocks',
       'powerpaste','fullscreen','formatpainter','insertdatetime','media','table','help','wordcount'
    ],
    toolbar: 'undo redo | casechange blocks | bold italic backcolor | ' +
       'alignleft aligncenter alignright alignjustify | ' +
       'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
    }}
/>
                                {errors.longDescription?.type === "required" && (
                                    <p role="alert" className="error">
                                        Long Description is required
                                    </p>
                                )}
                            </div>
                            <div className="fugu-input-field">
                                <label>News Category</label>
                                <select
                                    name="select"
                                    placeholder="Select News Category*"
                                    {...register("newsCategory", { required: true })}
                                    aria-invalid={errors.newsCategory ? "true" : "false"}
                                >
                                    {allCategories.length && allCategories?.map((el)=>{
                                        return (
                                            <option key={el._id} value={el._id}>{el.catagoryName}</option>
                                        )
                                    })}
                                </select>
                                {errors.newsCategory?.type === "required" && (
                                    <p role="alert" className="error">
                                        News Category is required
                                    </p>
                                )}
                            </div>
                            <button id="fugu-input-submit" type="submit">
                                Create
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}


