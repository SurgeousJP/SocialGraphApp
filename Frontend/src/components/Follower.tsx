interface FollowerProps {
  name: string;
  imageUrl: string;
}

const Follower = ({ name, imageUrl }: FollowerProps) => {
  return (
    <div
      id="option-item"
      className="flex items-center space-x-3 p-4 hover:bg-[#dfdfe0] rounded-lg cursor-pointer"
    >
      <img src={imageUrl} className="w-[32px] h-[32px] rounded-full" />
      <span className="font-semibold">{name}</span>
    </div>
  );
};

export default Follower;
