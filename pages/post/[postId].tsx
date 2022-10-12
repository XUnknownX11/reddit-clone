import { useRouter } from "next/router";
import React from "react";
import { GET_POST_BY_POST_ID } from "../../graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import Post from "../../components/Post";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ADD_COMMENT } from "../../graphql/mutations";
import toast from "react-hot-toast";
import Avatar from "../../components/Avatar";
import ReactTimeago from "react-timeago";

type FromData = {
  comment: string;
};

function PostPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [addComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [GET_POST_BY_POST_ID, "getPostListByPostId"],
  });

  const { data } = useQuery(GET_POST_BY_POST_ID, {
    variables: {
      post_id: router.query.postId,
    },
  });
  const post: Post = data?.getPostListByPostId;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FromData> = async (data) => {
    // post comment here...
    console.log(data);

    const notification = toast.loading("Posting your comment");

    await addComment({
      variables: {
        post_id: router.query.postId,
        username: session?.user?.name,
        text: data.comment,
      },
    });

    setValue("comment", "");

    toast.success("Comment Posted!", { id: notification });
  };

  return (
    <div className="mx-auto my-7 max-w-5xl">
      <Head>
        <title>Reddit Clone</title>
        <link rel="icon" href="/reddit-icon.svg" />
      </Head>
      <Post post={post} />
      <div className="-mt-1 rounded-b-md border border-t-0 border-gray-300 bg-white p-5 pl-16">
        <p className="text-sm">
          Comment as{" "}
          <span className="text-[#FF4401] ">{session?.user?.name}</span>
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex space-y-2 flex-col"
        >
          <textarea
            {...register("comment")}
            disabled={!session}
            className="h-24 rounded-md border border-gray-200 p-2 pl-4 outline-none disabled:bg-gray-50"
            placeholder={
              session ? "what are your thoughts?" : "please sign in to comment."
            }
          />
          <button
            type="submit"
            className="rounded-full bg-[#FF4401] p-3 font-semibold text-white disabled:bg-gray-200"
          >
            {" "}
            Comment{" "}
          </button>
        </form>
      </div>
      <div className="-my-5 rounded-b-md border border-t-0 border-gray-300 bg-white py-5 px-10">
        <hr className="py-2" />
        {post?.comments.map((comment) => (
          <div
            className="relative flex items-center space-x-2 space-y-5"
            key={comment.id}
          >
            <hr className="absolute top-10 h-16 border left-7 z-0" />
            <div className="z-50">
              <Avatar seed={comment.username} />
            </div>
            <div className="flex flex-col">
              <p className="py-2 text-xs text-gray-400">
                <span className="font-semibold text-[#FF4401]">
                  {comment.username}
                </span>{" "}
                •
                <ReactTimeago className="pl-1" date={comment.created_at} />
              </p>
              <p>{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostPage;
