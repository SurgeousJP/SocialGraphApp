import { useEffect, useState } from "react";
import { getUserByEmail, IPost } from "../apis/api";

interface PostProps {
  post: IPost;
  authorEmail: string;
  timeAgo: Date;
  postImage: string;
  comments: number;
}

const Post = ({ post: { description, likes }, authorEmail }: PostProps) => {
  const [authorName, setAuthorName] = useState<string>("");
  const [authorImage, setAuthorImage] = useState<string>("");

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        const userData = await getUserByEmail(authorEmail);
        setAuthorName(`${userData.firstName} ${userData.lastName}`);
        setAuthorImage(userData.imageUrl);
      } catch (error) {
        console.error("Error fetching author data:", error);
      }
    };

    fetchAuthorData();
  }, [authorEmail]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col bg-white p-3 space-y-3 rounded-t-lg shadow-sm">
        {/* Post Header */}
        <div className="flex flex-row items-center space-x-2">
          <img
            src={authorImage || "default-avatar-url.jpg"} // Fallback to a default avatar
            alt="Author Avatar"
            className="w-[40px] h-[40px] rounded-full"
          />
          <span className="text-md font-bold">
            {authorName.toUpperCase() || "Loading..."}
          </span>
        </div>
        {/* Post Description */}
        <span className="text-md block text-gray-700">
          {description.toUpperCase()}
        </span>
      </div>

      {/* Post Actions */}
      <div className="flex flex-row justify-between rounded-b-lg py-2 bg-white shadow-sm px-3">
        {/* Likes */}
        <div className="flex flex-row items-center space-x-1">
          <img
            className="w-[18px] h-[18px] rounded-full"
            src="https://images.vexels.com/content/223246/preview/like-icon-flat-8f6a3f.png"
            alt="Like Icon"
          />
          <span className="text-blue-500 font-medium">{likes}</span>
        </div>
        {/* Action Buttons */}
        <div className="flex flex-row space-x-1 items-center">
          <ion-icon
            className="text-gray-500"
            name="thumbs-up"
            size="small"
          ></ion-icon>
          <span>Like</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
