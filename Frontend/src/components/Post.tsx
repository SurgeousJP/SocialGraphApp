import { useEffect, useState } from "react";
import {
  getAllUsersByPostId,
  getUserByEmail,
  IPost,
  likePost,
  unlikePost,
} from "../apis/api";

// Interface for the Post component props
interface PostProps {
  post: IPost;
  authorEmail: string;
  timeAgo: Date;
  postImage: string;
  comments: number;
}

const Post = ({ post: { description, likes, id }, authorEmail }: PostProps) => {
  const [authorName, setAuthorName] = useState<string>("");
  const [authorImage, setAuthorImage] = useState<string>("");
  const [postLikes, setPostLikes] = useState<number>(likes);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    const fetchUsersByPostId = async () => {
      try {
        const users = await getAllUsersByPostId(id);
        console.log("Post", id, "Liked user", users);

        // Check if the current user has liked the post
        const userEmail = localStorage.getItem("userEmail");
        if (userEmail) {
          const likedByCurrentUser = users.some(
            (user) => user.email === userEmail
          );
          setIsLiked(likedByCurrentUser);
        }
      } catch (error) {
        console.error("Error fetching users by post ID:", error);
      }
    };

    fetchUsersByPostId();
  }, [id]);

  const handleLikePost = async () => {
    const userEmail = localStorage.getItem("userEmail");

    if (userEmail) {
      setIsLoading(true);
      try {
        if (isLiked) {
          await unlikePost(userEmail, id, description, postLikes);
          setPostLikes(postLikes - 1);
          setIsLiked(false);
        } else {
          await likePost(userEmail, id, description, postLikes);
          setPostLikes(postLikes + 1);
          setIsLiked(true);
        }
      } catch (error) {
        console.error("Error handling like/unlike post:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

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
          <span className="text-blue-500 font-medium">{postLikes}</span>
        </div>
        <button
          onClick={handleLikePost}
          className={`flex flex-row space-x-1 items-center ${
            isLiked ? "text-blue-500" : "text-gray-500"
          } ${isLoading ? "cursor-not-allowed" : ""}`}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="loader" /> // You can use a CSS loader or spinner
          ) : (
            <ion-icon name={isLiked ? "thumbs-up" : "thumbs-up"} size="small" />
          )}
          <span>Like</span>
        </button>
      </div>
    </div>
  );
};

export default Post;
