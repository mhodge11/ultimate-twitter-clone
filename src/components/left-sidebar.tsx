import Link from "next/link";
import { BiHomeCircle, BiUser } from "react-icons/bi";
import { BsBell, BsBookmark, BsThreeDots, BsTwitter } from "react-icons/bs";
import { HiOutlineHashtag } from "react-icons/hi";
import { HiEnvelope } from "react-icons/hi2";

const NAVIGATION_ITEMS = [
  {
    title: "",
    icon: BsTwitter,
  },
  {
    title: "Home",
    icon: BiHomeCircle,
  },
  {
    title: "Explore",
    icon: HiOutlineHashtag,
  },
  {
    title: "Notifications",
    icon: BsBell,
  },
  {
    title: "Messages",
    icon: HiEnvelope,
  },
  {
    title: "Bookmarks",
    icon: BsBookmark,
  },
  {
    title: "Profile",
    icon: BiUser,
  },
];

const LeftSidebar = () => {
  return (
    <section className="sticky top-0 hidden h-screen w-[23%] flex-col items-stretch p-4 lg:flex">
      <div className="flex h-full flex-col items-stretch space-y-4">
        {NAVIGATION_ITEMS.map((item) => (
          <Link
            className="flex w-fit items-center justify-start space-x-2 rounded-full px-6 py-2 text-2xl transition duration-200 hover:bg-white/10"
            href={`/${item.title.toLowerCase()}`}
            key={item.title}
          >
            <div>
              <item.icon />
            </div>
            {item.title && <div>{item.title}</div>}
          </Link>
        ))}
        <button className="w-full rounded-full bg-twitterColor px-6 py-4 text-center text-2xl font-bold transition duration-200 hover:bg-opacity-70">
          Tweet
        </button>
      </div>
      <button className="flex w-full items-center justify-between space-x-2 rounded-full bg-transparent px-6 py-4 text-center transition duration-200 hover:bg-white/10">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-slate-400"></div>
          <div className="text-left text-xs">
            <div className="font-semibold">Club of Coders</div>
            <div>@clubofcoderscom</div>
          </div>
        </div>
        <div>
          <BsThreeDots />
        </div>
      </button>
    </section>
  );
};

export default LeftSidebar;
