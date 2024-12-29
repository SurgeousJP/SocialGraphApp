const Avatar = () => {
  return (
    <div className="relative -mt-[3.25rem] ml-5 mb-4 flex items-center space-x-6">
      <img
        src="https://scontent.fsgn5-8.fna.fbcdn.net/v/t1.6435-1/125939937_1046051429169656_2277350585966110602_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeGBu8783_mNUHas3gML3pcTBLzJgl6OKa0EvMmCXo4prWoQ6Tys-TNr1rPMu6k2V3phUccEhk8v6MVI2yvBbLr0&_nc_ohc=bg0Bdxvxk4IQ7kNvgECcV-l&_nc_zt=24&_nc_ht=scontent.fsgn5-8.fna&_nc_gid=ALv_ha1YNpn15rG5NcnBTbK&oh=00_AYC7dcTktyG67KXWeY9Sbcgk2ZU5Atb5IaBpBwIdAQ4kDg&oe=67987597"
        alt="Avatar"
        className="w-32 h-32 rounded-full border-4 border-white"
      />
      <div>
        <h1 className="text-3xl font-bold">John Doe</h1>
        <p className="text-lg text-gray-500">Web Developer</p>
      </div>
    </div>
  );
};

export default Avatar;
