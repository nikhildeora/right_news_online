import { useRouter } from "next/router";
import { AuthContext } from "../context/auth_context";
import { sanityClient } from "../sanity_client";
import { v4 as uuidv4 } from 'uuid';
import { useForm } from "react-hook-form";
import BreadcrumbOne from "../components/common/breadcrumb/breadcrumb-one";


export default function CreateBlog() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => console.log(data);

    return (
        <div>
            <BreadcrumbOne title={"Create a Blog"} />
            <div className="section fugu-section-padding">
                <div className="container">
                    <div className="fugu-contact-wrap  wow fadeInUpX">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="fugu-input-field">
                                <label>Blog Title</label>
                                <input
                                    type="text"
                                    placeholder="Your Blog Title*"
                                    {...register("blogtitle", { required: true })}
                                    aria-invalid={errors.blogtitle ? "true" : "false"}
                                />
                                {errors.blogtitle?.type === "required" && (
                                    <p role="alert" className="error">
                                        Blog Title is required
                                    </p>
                                )}
                            </div>
                            <div className="fugu-input-field">
                                <label>Blog Image</label>
                                <input
                                    type="file"
                                    placeholder="Your Blog Image*"
                                    accept="image/*"
                                    {...register("blogImage", { required: true })}
                                    aria-invalid={errors.blogImage ? "true" : "false"}
                                />
                                {errors.blogImage?.type === "required" && (
                                    <p role="alert" className="error">
                                        Blog Image is required
                                    </p>
                                )}
                            </div>
                            <div className="fugu-input-field">
                                <label>Blog Video</label>
                                <input
                                    type="file"
                                    placeholder="Your Blog Video*"
                                    accept="video/*"
                                    {...register("blogVideo", { required: true })}
                                    aria-invalid={errors.blogVideo ? "true" : "false"}
                                />
                                {errors.blogVideo?.type === "required" && (
                                    <p role="alert" className="error">
                                        Mobile Number is required
                                    </p>
                                )}
                            </div>
                            <div className="fugu-input-field">
                                <label>Write Blog Short Description</label>
                                <textarea
                                    name="textarea"
                                    placeholder="Write Blog Short Description*"
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
                                <label>Write Blog Long Description</label>
                                <textarea
                                    name="textarea"
                                    placeholder="Write Blog Long Description*"
                                    {...register("longDescription", { required: true })}
                                    aria-invalid={errors.longDescription ? "true" : "false"}
                                ></textarea>
                                {errors.longDescription?.type === "required" && (
                                    <p role="alert" className="error">
                                        Long Description is required
                                    </p>
                                )}
                            </div>
                            <div className="fugu-input-field">
                                <label>Blog Category</label>
                                <select
                                    name="select"
                                    placeholder="Select Blog Category*"
                                    {...register("blogCategory", { required: true })}
                                    aria-invalid={errors.blogCategory ? "true" : "false"}
                                >
                                    {/* <option value={""}>Select One</option> */}
                                    <option value={"nikhil"}>Nikhil</option>
                                    <option value={"raj"}>Raj</option>
                                    <option value={"awesome"}>aswesome</option>
                                </select>
                                {errors.blogCategory?.type === "required" && (
                                    <p role="alert" className="error">
                                        Blog Category is required
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