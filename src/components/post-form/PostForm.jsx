import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import objService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await objService.uploadFile(data.image[0]) : null;

            if (file) {
                objService.deleteFile(post.featuredImage);
            }

            const dbPost = await objService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await objService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await objService.createPost({ ...data, userId: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-lg transition-colors duration-300">
            <form onSubmit={handleSubmit(submit)} className="flex flex-col md:flex-row gap-6">
                {/* Left side of the form (Title, Slug, Content) */}
                <div className="w-full md:w-2/3 space-y-6">
                    <Input
                        label="Title"
                        placeholder="Enter the post title"
                        className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg p-3 transition-colors duration-300"
                        {...register("title", { required: true })}
                    />
                    <Input
                        label="Slug"
                        placeholder="Automatically generated from title"
                        className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg p-3 transition-colors duration-300"
                        {...register("slug", { required: true })}
                        onInput={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                        }}
                    />
                    <RTE label="Content" name="content" control={control} defaultValue={getValues("content")} />
                </div>

                {/* Right side of the form (Image, Status, Submit Button) */}
                <div className="w-full md:w-1/3 space-y-6">
                    <Input
                        label="Featured Image"
                        type="file"
                        className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg p-3"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })}
                    />
                    {post && (
                        <div className="w-full h-auto overflow-hidden rounded-lg border-2 border-gray-300 dark:border-gray-600">
                            <img
                                src={objService.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    )}
                    <Select
                        options={["active", "inactive"]}
                        label="Status"
                        className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg p-3"
                        {...register("status", { required: true })}
                    />
                    <Button
                        type="submit"
                        bgColor={post ? "bg-green-600" : "bg-blue-600"}
                        className="w-full py-3 text-lg font-semibold text-white rounded-lg 
                         hover:bg-opacity-90 transition-all duration-200"
                    >
                        {post ? "Update Post" : "Submit Post"}
                    </Button>
                </div>
            </form>
        </div>
    );
}