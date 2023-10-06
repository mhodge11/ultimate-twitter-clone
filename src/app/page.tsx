import LeftSidebar from "@/components/left-sidebar";
import MainComponent from "@/components/main-component";
import RightSection from "@/components/right-section";

const Home = async () => {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-black text-white">
      <div className="relative flex h-full w-full max-w-[100vw] justify-center md:max-w-[95vw] lg:max-w-[90vw] xl:max-w-[80vw]">
        <LeftSidebar />
        <MainComponent />
        <RightSection />
      </div>
    </div>
  );
};

export default Home;
