import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  followUser,
  getUserByEmail,
  getUserPostByEmail,
  IPost,
  isFollowUser,
  IUserData,
  unfollowUser,
} from "../apis/api";
import Banner from "../components/Banner";
import Post from "../components/Post";

const UserProfile = () => {
  const { mail } = useParams<{ mail: string }>();
  const [userData, setUserData] = useState<IUserData | null>(null);
  const [postData, setPostData] = useState<IPost[] | null>(null);
  const [isFollowing, setIsFollowing] = useState(false); // Follow state
  const [loading, setLoading] = useState(true);
  const [followLoading, setFollowLoading] = useState(false); // Loading state for follow actions

  const currentUserEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    if (mail) {
      // Fetch user data
      getUserByEmail(mail)
        .then((data) => {
          setUserData(data);
        })
        .catch((error) => {
          console.error("Error loading user data:", error);
        })
        .finally(() => setLoading(false));
    }
  }, [mail]);

  useEffect(() => {
    const checkFollowStatus = async () => {
      if (mail && currentUserEmail !== mail) {
        try {
          const result = await isFollowUser(mail);
          setIsFollowing(result);
        } catch (error) {
          console.error("Error checking follow status:", error);
        }
      }
    };
    checkFollowStatus();
  }, [mail, currentUserEmail]);

  useEffect(() => {
    if (mail) {
      // Fetch user posts
      getUserPostByEmail(mail)
        .then((data) => {
          setPostData(data);
        })
        .catch((error) => {
          console.error("Error loading user post:", error);
        });
    }
  }, [mail]);

  const handleFollow = async () => {
    setFollowLoading(true);
    try {
      if (isFollowing) {
        await unfollowUser(mail!);
        setIsFollowing(false);
      } else {
        await followUser(mail!);
        setIsFollowing(true);
      }
    } catch (error) {
      console.error("Error handling follow/unfollow:", error);
    } finally {
      setFollowLoading(false);
    }
  };

  if (!userData || !postData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Profile container with rounded corners and shadow */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <Banner />
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            {/* Avatar */}
            <div className="relative -mt-16 mb-4">
              <img
                src={userData.imageUrl}
                alt="Avatar"
                className="w-32 h-32 rounded-full border-4 border-white"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-black">
                {userData.firstName} {userData.lastName}
              </h1>
              <p className="text-lg text-gray-500">Web Developer</p>
            </div>
          </div>

          {/* Follow/Unfollow Button */}
          {currentUserEmail !== mail && (
            <button
              onClick={handleFollow}
              className={`px-4 py-2 font-medium text-white rounded-lg shadow ${
                isFollowing
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-blue-500 hover:bg-blue-600"
              } transition-all`}
              disabled={followLoading}
            >
              {followLoading
                ? "Processing..."
                : isFollowing
                ? "Unfollow"
                : "Follow"}
            </button>
          )}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-black">Posts</h2>
        <div className="space-y-4">
          {/* Map through user's posts and display them */}
          {postData.map((post) => (
            <Post
              key={post.id}
              post={post}
              authorEmail={userData.email}
              timeAgo={new Date()}
              postImage={"https://via.placeholder.com/600x300"}
              comments={0}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
