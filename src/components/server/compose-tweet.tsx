import { randomUUID } from "crypto";
import ComposeTweetForm from "@/components/client/compose-tweet-form";
import { type Database } from "@/lib/supabase.types";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import React from "react";

const ComposeTweet = () => {
  async function submitTweet(formData: FormData) {
    "use server";

    const tweet = formData.get("tweet");
    if (!tweet) return;

    const supabase = createServerActionClient<Database>({ cookies });

    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) return userError;

    const { error: updateProfileError } = await supabase.from("tweets").insert({
      profile_id: userData.user.id,
      text: tweet.toString(),
      id: randomUUID(),
    });

    if (updateProfileError) return updateProfileError;

    revalidatePath("/");

    return null;
  }

  return <ComposeTweetForm serverAction={submitTweet} />;
};

export default ComposeTweet;
