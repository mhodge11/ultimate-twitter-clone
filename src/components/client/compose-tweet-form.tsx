"use client";

import { type AuthError, type PostgrestError } from "@supabase/supabase-js";
import React, { useRef } from "react";
import { toast } from "sonner";

interface ComposeTweetFormProps {
  serverAction: (
    formData: FormData
  ) => Promise<PostgrestError | AuthError | null | undefined>;
}

const ComposeTweetForm = ({ serverAction }: ComposeTweetFormProps) => {
  const resetRef = useRef<HTMLButtonElement>(null);

  const handleSubmitTweet = async (data: any) => {
    try {
      const error = await serverAction(data);

      if (error) return toast.error(error.message);

      toast.success("Tweet sent successfully!");

      resetRef.current?.click();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form action={handleSubmitTweet} className="flex h-full w-full flex-col">
      <input
        type="text"
        name="tweet"
        className="h-full w-full border-b-[0.5px] border-none border-gray-600 bg-transparent p-4 text-2xl outline-none placeholder:text-gray-600"
        placeholder="What's happening?"
      />
      <div className="flex w-full items-center justify-between">
        <div></div>
        <div className="w-full max-w-[100px]">
          <button
            type="submit"
            className="w-full rounded-full bg-twitterColor px-4 py-2 text-center text-lg font-bold transition duration-200 hover:bg-opacity-70"
          >
            Tweet
          </button>
          <button ref={resetRef} className="invisible" type="reset"></button>
        </div>
      </div>
    </form>
  );
};

export default ComposeTweetForm;
