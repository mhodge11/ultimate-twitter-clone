"use server";

import { randomUUID } from "crypto";
import { type Database } from "@/lib/supabase.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const likeTweet = async (tweetId: string) => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError) {
    console.error(userError);
    return;
  }

  const { user } = userData;

  const { error } = await supabase
    .from("likes")
    .insert([{ tweet_id: tweetId, id: randomUUID(), user_id: user.id }]);

  if (error) console.error(error);
  else revalidatePath("/");
};

export const unlikeTweet = async (tweetId: string) => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError) {
    console.error(userError);
    return;
  }

  const { user } = userData;

  const { error } = await supabase
    .from("likes")
    .delete()
    .eq("tweet_id", tweetId)
    .eq("user_id", user.id);

  if (error) console.error(error);
  else revalidatePath("/");
};
