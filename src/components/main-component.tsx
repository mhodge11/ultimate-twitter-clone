import ComposeTweet from "@/components/server/compose-tweet";
import Tweet from "@/components/server/tweet";
import { getTweets } from "@/lib/supabase/queries";

const MainComponent = async () => {
  const { data, error } = await getTweets();

  return (
    <main className="flex h-full w-[500px] flex-col border-l-[0.5px] border-r-[0.5px] border-gray-600">
      <h1 className="sticky top-0 z-10 bg-black/10 p-6 text-3xl font-bold backdrop-blur">
        Home
      </h1>
      <div className="relative flex h-32 items-stretch space-x-4 border-b-[0.5px] border-t-[0.5px] border-gray-600 p-4">
        <div className="h-10 w-10 flex-none rounded-full bg-slate-400"></div>
        <ComposeTweet />
      </div>
      <div className="flex flex-col">
        {error && <div>Tweets unavailable: {error.message}</div>}
        {data &&
          data.map(({ tweets, likes, profiles }) => (
            <Tweet
              key={tweets.id}
              tweet={tweets}
              likes={likes}
              profile={profiles}
            />
          ))}
      </div>
    </main>
  );
};

export default MainComponent;
