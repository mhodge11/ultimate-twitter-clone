"use server";

import { db } from "@/lib/db";
import { likes, profiles, tweets } from "@/lib/db/schema";
import { type Database } from "@/lib/supabase.types";
import {
  createServerComponentClient,
  User,
} from "@supabase/auth-helpers-nextjs";
import { and, desc, eq, exists } from "drizzle-orm";
import { cookies } from "next/headers";

export type Tweet = Database["public"]["Tables"]["tweets"]["Row"] & {
  profiles: Pick<
    Database["public"]["Tables"]["profiles"]["Row"],
    "full_name" | "username"
  >;
};

export const getTweets = async () => {
  try {
    const supabase = createServerComponentClient<Database>({ cookies });

    const { data: userData } = await supabase.auth.getUser();

    let user: User | null = null;

    if (userData?.user?.id) ({ user } = userData);

    const res = await db
      .select({
        tweets,
        likes,
        profiles,
        ...(user?.id
          ? {
              hasLiked: exists(
                db
                  .select()
                  .from(likes)
                  .where(
                    and(eq(likes.tweetId, tweets.id), eq(likes.userId, user.id))
                  )
              ),
            }
          : {}),
      })
      .from(tweets)
      .leftJoin(likes, eq(tweets.id, likes.tweetId))
      .innerJoin(profiles, eq(tweets.profileId, profiles.id))
      .orderBy(desc(tweets.createdAt));

    return { data: res, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};

export const getLikesCount = async (tweetId: string) => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data, count, error } = await supabase
    .from("likes")
    .select("id", { count: "exact" })
    .eq("tweet_id", tweetId);

  return { data, count, error };
};

export const isLiked = async (tweetId: string) => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError) return false;

  const { user } = userData;

  const { data } = await supabase
    .from("likes")
    .select("id")
    .eq("tweet_id", tweetId)
    .eq("user_id", user.id)
    .single();

  if (data?.id) return true;
  return false;
};
