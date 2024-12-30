import React from "react";

const Follower = () => {
  return (
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
  );
};

export default Follower;
