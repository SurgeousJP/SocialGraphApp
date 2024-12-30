import "ionicons/icons";
import Follower from "../components/Follower";

const Home = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="">
      <header className="bg-[#252728] sticky top-0 left-0 right-0 flex justify-between p-4 items-center border-box h-[72px] border-[#2d2e2f] border-b-[0.25px]">
        <div className="flex flex-row space-x-4 items-center">
          <img
            className="w-[40px] h-[40px] object-contain rounded-full"
            src="https://i.pinimg.com/736x/cd/0e/0d/cd0e0dbb19f35e33bb6e68b4f47d0db8.jpg"
          />
          <div className="flex space-x-2 items-center rounded-3xl p-2 px-4 bg-[#333334]">
            <input
              className="focus:outline-none bg-[#333334]"
              placeholder="Search users"
            />
            <ion-icon
              className="text-[#333334]"
              name="search"
              size="small"
            ></ion-icon>
          </div>
        </div>

        <div className="relative">
          <button className="px-4 py-2 bg-blue-500 cursor-pointer rounded-lg text-white">Sign out</button>
        </div>
      </header>
      <body className="bg-[#1c1c1d] flex flex-row items-start min-h-[100vh]">
        <section
          id="options"
          className="w-[300px] flex-1 sticky-aside left-0 pt-2 px-2 pl-4"
        >
          <div
            id="option-item"
            className="flex items-center space-x-3 p-4 hover:bg-[#333334] rounded-lg cursor-pointer"
          >
            <img
              src="https://pm1.aminoapps.com/8595/72348821f87067564056cddf94630fdef79d7ccbr1-696-696v2_uhq.jpg"
              className="w-[32px] h-[32px] rounded-full"
            />
            <span className="font-semibold">SurgeousJP</span>
          </div>
          <div
            id="option-item"
            className="flex items-center space-x-3 p-4 hover:bg-[#333334] rounded-lg cursor-pointer"
          >
            <ion-icon name="person-circle"></ion-icon>
            <span className="font-semibold">Your profile </span>
          </div>
        </section>
        <section
          id="content"
          className="mx-[375px] overflow-y-auto flex-1 mt-4 px-12"
        >
          <div className="flex flex-row flex-1 bg-[#252728] px-4 py-3 space-x-4 items-center rounded-lg mb-4">
            <img
              src="https://pm1.aminoapps.com/8595/72348821f87067564056cddf94630fdef79d7ccbr1-696-696v2_uhq.jpg"
              className="w-[40px] h-[40px] rounded-full"
            />
            <input
              className="focus:outline-none bg-[#484849] flex-1 rounded-3xl p-3 text-md text-[#ada79a]"
              placeholder="What are you thinking today ?"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col bg-[#252728] p-3 space-y-3 rounded-t-lg">
              <div className="flex flex-row items-center space-x-2">
                <img
                  src="https://pm1.aminoapps.com/8595/72348821f87067564056cddf94630fdef79d7ccbr1-696-696v2_uhq.jpg"
                  className="w-[40px] h-[40px] rounded-full"
                />
                <span className="text-md font-bold">Elysia</span>
              </div>
              <span className="text-md block">
                Don’t call me by the wrong name. Otherwise, I’ll be a little
                emotional.
              </span>
            </div>
            <img
              src="https://i.ytimg.com/vi/OxglpytZOuo/maxresdefault.jpg"
              className=""
            />
            <div className="flex flex-row justify-between rounded-b-lg py-2">
              <div className="flex flex-row items-center space-x-1">
                <img
                  className="w-[18px] h-[18px] rounded-full"
                  src="https://images.vexels.com/content/223246/preview/like-icon-flat-8f6a3f.png"
                />
                <span className="text-[#3aa5fd] font-medium">123</span>
              </div>
              <div className="flex flex-row space-x-1 items-center">
                <ion-icon
                  className="text-[#333334]"
                  name="thumbs-up"
                  size="small"
                ></ion-icon>
                <span>Like</span>
              </div>
            </div>
          </div>

          {/* {mockText} */}
        </section>
        <section
          id="options"
          className="w-[300px] flex-1 sticky-aside right-0 pt-4 pr-4"
        >
          <span className="text-md font-bold">Followers</span>
          <div className="flex flex-col gap-3 mt-4">
            {arr.map((item) => {
              return <Follower />;
            })}
          </div>
        </section>
      </body>
    </div>
  );
};

export default Home;
