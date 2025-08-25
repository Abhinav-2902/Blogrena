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
      const file = data.image?.[0] ? await objService.uploadFile(data.image[0]) : null;
      if (file) objService.deleteFile(post.featuredImage);

      const dbPost = await objService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) navigate(`/post/${dbPost.$id}`);
    } else {
      const file = await objService.uploadFile(data.image[0]);
      if (file) {
        data.featuredImage = file.$id;
        const dbPost = await objService.createPost({ ...data, userId: userData.$id });
        if (dbPost) navigate(`/post/${dbPost.$id}`);
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s+/g, "-");
    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") setValue("slug", slugTransform(value.title), { shouldValidate: true });
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl shadow-xl transition-colors duration-300">
      <form onSubmit={handleSubmit(submit)} className="flex flex-col md:flex-row gap-8">
        {/* Left side */}
        <div className="w-full md:w-2/3 space-y-6">
          <Input
            label="Title"
            placeholder="Enter the post title"
            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg p-4 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 transition"
            {...register("title", { required: true })}
          />
          <Input
            label="Slug"
            placeholder="Automatically generated from title"
            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg p-4 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 transition"
            {...register("slug", { required: true })}
            onInput={(e) => setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })}
          />
          <RTE label="Content" name="content" control={control} defaultValue={getValues("content")} />
        </div>

        {/* Right side */}
        <div className="w-full md:w-1/3 space-y-6">
          <Input
            label="Featured Image"
            type="file"
            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
          />
          {post && (
            <div className="w-full h-auto overflow-hidden rounded-lg border-2 border-gray-300 dark:border-gray-700 shadow-inner">
              <img
                src={objService.getFileView(post.featuredImage)}
                alt={post.title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}
          <Select
            options={["active", "inactive"]}
            label="Status"
            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
            {...register("status", { required: true })}
          />
          <Button
            type="submit"
            bgColor={post ? "bg-green-600" : "bg-blue-600"}
            className="w-full py-3 text-lg font-semibold text-white rounded-lg shadow-lg hover:opacity-90 transition-all duration-200"
          >
            {post ? "Update Post" : "Submit Post"}
          </Button>
        </div>
      </form>
    </div>
  );
}
