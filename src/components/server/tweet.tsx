import LikeButton from "@/components/client/like-button";
import { Like, Profile, type Tweet } from "@/lib/db/schema";
import { getLikesCount, isLiked } from "@/lib/supabase/queries";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";
import { AiOutlineRetweet } from "react-icons/ai";
import { BsChat, BsDot, BsThreeDots } from "react-icons/bs";
import { IoShareOutline, IoStatsChart } from "react-icons/io5";

dayjs.extend(relativeTime);

interface TweetProps {
  tweet: Tweet;
  profile: Profile;
  likes: Like[];
}

const TweetComponent = async ({ tweet, profile, likes }: TweetProps) => {
  const { count: likesCount } = await getLikesCount(tweet.id);
  const hasLiked = await isLiked(tweet.id);

  return (
    <div
      key={tweet.id}
      className="flex space-x-4 border-b-[0.5px] border-gray-600 p-2"
    >
      <div>
        <div className="h-10 w-10 rounded-full bg-slate-400" />
      </div>
      <div className="flex w-full flex-col">
        <div className="flex w-full items-center justify-between">
          <div className="flex w-full items-center space-x-1">
            {profile.fullName && (
              <div className="font-bold">{profile.fullName}</div>
            )}
            <div className="text-gray-500">@{profile.fullName}</div>
            <div className="text-gray-500">
              <BsDot />
            </div>
            <div className="text-gray-500">
              {dayjs(tweet.createdAt).fromNow()}
            </div>
          </div>
          <div>
            <BsThreeDots />
          </div>
        </div>
        <div className="text-base text-white">{tweet.text}</div>
        {/* <div className="mt-2 aspect-square h-96 w-full rounded-xl bg-slate-400"></div> */}
        <div className="mt-2 flex w-full items-center justify-around">
          <div className="cursor-pointer rounded-full p-2 hover:bg-white/10">
            <BsChat />
          </div>
          <div className="cursor-pointer rounded-full p-2 hover:bg-white/10">
            <AiOutlineRetweet />
          </div>
          <LikeButton
            tweet={tweet}
            likesCount={likesCount}
            isLiked={hasLiked}
          />
          <div className="cursor-pointer rounded-full p-2 hover:bg-white/10">
            <IoStatsChart />
          </div>
          <div className="cursor-pointer rounded-full p-2 hover:bg-white/10">
            <IoShareOutline />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetComponent;
