import "ionicons/icons";
import { mockText } from "../constants/mockdata";

const Home = () => {
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
          <img
            id="account"
            className="w-[40px] h-[40px] object-contain rounded-full"
            src="https://i.pinimg.com/736x/cd/0e/0d/cd0e0dbb19f35e33bb6e68b4f47d0db8.jpg"
          />
          <div></div>
        </div>
      </header>
      <body className="bg-[#1c1c1d] flex flex-row items-start min-h-[100vh]">
        <section
          id="options"
          className="w-[300px] flex-1 sticky-aside left-0 pt-2 px-2"
        >
          <div
            id="option-item"
            className="flex items-center space-x-3 p-4 hover:bg-[#333334] rounded-lg"
          >
            <img
              src="https://pm1.aminoapps.com/8595/72348821f87067564056cddf94630fdef79d7ccbr1-696-696v2_uhq.jpg"
              className="w-[32px] h-[32px] rounded-full"
            />
            <span className="font-semibold">SurgeousJP</span>
          </div>
          <div
            id="option-item"
            className="flex items-center space-x-3 p-4 hover:bg-[#333334] rounded-lg"
          >
            <ion-icon name="people-outline" className="text-[32px]"></ion-icon>
            <span className="font-semibold">Followers</span>
          </div>
        </section>
        <section id="content" className="mx-[300px] overflow-y-auto flex-1">
          {mockText}
        </section>
        <section id="options" className="w-[300px] flex-1 sticky-aside right-0">
          <span>Followers</span>
        </section>
      </body>
    </div>
  );
};

export default Home;
