import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getUserByEmail,
  getUserPostByEmail,
  IPost,
  IUserData,
} from "../apis/api";
import Banner from "../components/Banner";
import Post from "../components/Post";

// UserProfile component to display user data
const UserProfile = () => {
  const { mail } = useParams<{ mail: string }>();
  const [userData, setUserData] = useState<IUserData | null>(null);
  const [postData, setPostData] = useState<IPost[] | null>(null);

  useEffect(() => {
    if (mail) {
      // Fetch user data using the email from the URL
      getUserByEmail(mail)
        .then((data) => {
          console.log("User data:", data);
          setUserData(data); // Set user data in state
        })
        .catch((error) => {
          console.error("Error loading user data:", error);
        });
    }
  }, [mail]);

  useEffect(() => {
    if (mail) {
      getUserPostByEmail(mail)
        .then((data) => {
          console.log("User post:", data);
          setPostData(data);
        })
        .catch((error) => {
          console.error("Error loading user post:", error);
        });
    }
  }, [mail]);

  if (!userData || !postData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Profile container with rounded corners and shadow */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <Banner />
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
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-black">Posts</h2>
        <div className="space-y-4">
          {/* Map through user's posts and display them */}
          {postData.map((post) => (
            <Post
              post={post}
              author={`${userData.firstName} ${userData.lastName}`}
              authorImage={userData.imageUrl}
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
