import { useEffect, useState } from "react";
import { getUserByEmail, IUserData } from "../apis/api";
import Banner from "../components/Banner";
import Post from "../components/Post";

// UserProfile component to display user data
const UserProfile = () => {
  const [userData, setUserData] = useState<IUserData | null>(null);

  useEffect(() => {
    // Fetch user data using the email
    getUserByEmail("Firefly@example.com")
      .then((data) => {
        setUserData(data); // Set user data in state
      })
      .catch((error) => {
        console.error("Error loading user data:", error);
      });
  }, []);

  if (!userData) {
    return <div>Loading...</div>; // Show loading state until user data is fetched
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
            <h1 className="text-3xl font-bold">
              {userData.firstName} {userData.lastName}
            </h1>
            <p className="text-lg text-gray-500">Web Developer</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold">Posts</h2>
        <div className="space-y-4">
          {/* Map through user's posts and display them */}
          {userData.myPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md p-4">
              <Post
                post={post}
                author={`${userData.firstName} ${userData.lastName}`}
                authorImage={userData.imageUrl}
                timeAgo={new Date()}
                postImage={"https://via.placeholder.com/600x300"}
                comments={200}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
