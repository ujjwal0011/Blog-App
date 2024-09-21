import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Select, Input, RTE } from "../index"; // Assume these are your UI components
import service from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
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
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const submit = async (data) => {
    if (!userData) {
      console.log("User data is not loaded yet");
      return;
    }

    const { name, $id } = userData;
    setIsLoading(true); // Set loading to true when submitting

    try {
      if (post) {
        const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;

        if (file) {
          await service.deleteFile(post.featuredImage);
        }

        const dbPost = await service.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : undefined,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      } else {
        const file = await service.uploadFile(data.image[0]);

        if (file) {
          const fileId = file.$id;
          data.featuredImage = fileId;
          const dbPost = await service.createPost({
            ...data,
            userId: $id,
            userName: name,
          });

          if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
          }
        }
      }
    } catch (error) {
      console.error("Error while creating or updating the post: ", error);
    } finally {
      setIsLoading(false); // Set loading to false after completion
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

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  // Skeleton loader UI
  const renderSkeleton = () => (
    <div className="animate-pulse space-y-6">
      <div className="h-8 bg-gray-800 rounded-lg"></div>
      <div className="h-8 bg-gray-800 rounded-lg"></div>
      <div className="h-32 bg-gray-800 rounded-lg"></div>
      <div className="h-8 bg-gray-800 rounded-lg"></div>
      <div className="h-12 bg-gray-700 rounded-lg"></div>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(75, 75, 75, 0.3) 1px, transparent 1px), 
                            linear-gradient(to bottom, rgba(75, 75, 75, 0.3) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      ></div>

      <div className="relative z-10 p-8 max-w-5xl mx-auto">
        {isLoading ? ( // Show skeleton while loading
          renderSkeleton()
        ) : (
          <form onSubmit={handleSubmit(submit)} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Input
                label="Title :"
                placeholder="Enter the post title"
                className="w-full bg-gray-900 border border-gray-700 focus:ring-blue-500 focus:border-blue-500 text-gray-300 rounded-lg"
                {...register("title", { required: true })}
              />
              <Input
                label="Slug :"
                placeholder="Auto-generated slug"
                className="w-full bg-gray-900 border border-gray-700 focus:ring-blue-500 focus:border-blue-500 text-gray-300 rounded-lg"
                {...register("slug", { required: true })}
                onInput={(e) => {
                  setValue("slug", slugTransform(e.currentTarget.value), {
                    shouldValidate: true,
                  });
                }}
              />
              <RTE
                label="Content :"
                name="content"
                control={control}
                defaultValue={getValues("content")}
              />
            </div>
            <div className="space-y-6">
              <Input
                label="Featured Image :"
                type="file"
                className="w-full bg-gray-900 border border-gray-700 focus:ring-blue-500 focus:border-blue-500 text-gray-300 rounded-lg"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", { required: !post })}
              />
              {post && (
                <div className="w-full mb-4">
                  <img
                    src={service.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="rounded-lg border border-gray-700 shadow-md"
                  />
                </div>
              )}
              <Select
                options={["active", "inactive"]}
                label="Status"
                className="w-full bg-gray-900 border border-gray-700 focus:ring-blue-500 focus:border-blue-500 text-gray-300 rounded-lg"
                {...register("status", { required: true })}
              />
              <Button
                type="submit"
                bgColor={post ? "bg-green-500" : "bg-blue-600"}
                className="w-full text-white font-semibold rounded-lg py-2 hover:bg-opacity-80"
              >
                {post ? "Update Post" : "Create Post"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default PostForm;
