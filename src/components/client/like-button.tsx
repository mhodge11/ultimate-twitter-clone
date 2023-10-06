"use client";

import { type Tweet } from "@/lib/db/schema";
import { likeTweet, unlikeTweet } from "@/lib/supabase/mutations";
import React, { useTransition } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface LikeButtonProps {
  tweet: Tweet;
  likesCount: number | null;
  isLiked: boolean;
}

const LikeButton = ({ tweet, likesCount, isLiked }: LikeButtonProps) => {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      disabled={isPending}
      onClick={() =>
        startTransition(() =>
          isLiked ? unlikeTweet(tweet.id) : likeTweet(tweet.id)
        )
      }
      className="flex cursor-pointer items-center gap-2 rounded-full p-2 hover:bg-white/10"
    >
      {likesCount ?? 0}
      {isLiked ? <AiFillHeart className="text-red-500" /> : <AiOutlineHeart />}
    </button>
  );
};

export default LikeButton;
