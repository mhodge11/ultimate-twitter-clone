import { BsSearch } from "react-icons/bs";

const RightSection = () => {
  return (
    <section className="sticky top-0 hidden h-screen w-[30%] flex-col items-stretch overflow-scroll p-4 xl:flex">
      <div className="relative w-full">
        <input
          id="searchBox"
          className="peer w-full rounded-full border-none bg-neutral-800 py-4 pl-14 pr-4 outline-none focus:ring-2 focus:ring-inset focus:ring-twitterColor"
          type="text"
          placeholder="Search Twitter"
        />
        <label
          htmlFor="searchBox"
          className="absolute left-0 top-0 flex h-full items-center justify-center p-4 text-gray-500 peer-focus:text-twitterColor"
        >
          <BsSearch className="h-5 w-5" />
        </label>
      </div>
      <div className="my-4 flex flex-col rounded-xl bg-neutral-900">
        <h3 className="p-4 text-2xl font-bold">What&apos;s happening</h3>
        <div>
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="p-4 transition duration-200 last:rounded-b-xl hover:bg-white/10"
            >
              <div className="text-lg font-bold">Trending Item {i + 1}</div>
              <div className="text-sm text-neutral-400">35.4k</div>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-4 flex flex-col rounded-xl bg-neutral-900">
        <h3 className="p-4 text-2xl font-bold">Who to follow</h3>
        <div>
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 transition duration-200 last:rounded-b-xl hover:bg-white/10"
            >
              <div className="flex items-center space-x-2">
                <div className="h-10 w-10 rounded-full bg-neutral-600"></div>
                <div className="flex flex-col">
                  <div className="font-bold text-white">Other User</div>
                  <div className="text-xs text-gray-500">@otheruser1232</div>
                </div>
              </div>
              <div>
                <button className="rounded-full bg-white px-6 py-2 text-sm font-bold text-neutral-950">
                  Follow
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSection;
