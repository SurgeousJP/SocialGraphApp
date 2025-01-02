import "ionicons/icons";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAllFollowersByEmail,
  getFollowerPostByEmail,
  getUserByEmail, // Make sure to import the new function
  IPost,
  IUserData,
} from "../apis/api";
import Follower from "../components/Follower";
import Post from "../components/Post";

const Home = () => {
  const [user, setUser] = useState<IUserData | null>(null);
  const [posts, setPosts] = useState<IPost[] | null>(null);
  const [followers, setFollowers] = useState<IUserData[] | null>(null); // Add state for followers
  const [loading, setLoading] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [loadingFollowers, setLoadingFollowers] = useState(false); // Add state for loading followers
  const userEmail = localStorage.getItem("userEmail");
  const navigate = useNavigate();

  useEffect(() => {
    if (userEmail) {
      fetchUserData(userEmail);
      fetchPosts(userEmail);
      fetchFollowers(userEmail); // Fetch followers when the user data is fetched
    } else {
      navigate("/login");
      setLoading(false);
    }
  }, []);

  const fetchUserData = async (email: string) => {
    try {
      setLoading(true);
      const userData = await getUserByEmail(email);
      setUser(userData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setLoading(false);
    }
  };

  const fetchPosts = async (email: string) => {
    try {
      setLoadingPosts(true);
      const postsData = await getFollowerPostByEmail(email);
      setPosts(postsData);
      setLoadingPosts(false);
    } catch (error) {
      console.error("Error fetching posts data:", error);
      setLoadingPosts(false);
    }
  };

  const fetchFollowers = async (email: string) => {
    try {
      setLoadingFollowers(true);
      const followersData = await getAllFollowersByEmail(email);
      setFollowers(followersData);
      setLoadingFollowers(false);
    } catch (error) {
      console.error("Error fetching followers data:", error);
      setLoadingFollowers(false);
    }
  };

  return (
    <div className="">
      <header className="bg-white sticky top-0 left-0 right-0 flex justify-between p-4 items-center border-box h-[72px] border-b border-gray-300">
        <div className="flex flex-row space-x-4 items-center">
          <img
            className="w-[40px] h-[40px] object-contain rounded-full"
            src={user?.imageUrl}
            alt="User Avatar"
          />

          <div className="flex space-x-2 items-center rounded-3xl p-2 px-4 bg-gray-200">
            <input
              className="focus:outline-none bg-gray-200"
              placeholder="Search users"
            />
            <ion-icon
              className="text-gray-500"
              name="search"
              size="small"
            ></ion-icon>
          </div>
        </div>

        <div className="relative">
          {!userEmail ? (
            <Link
              to="/login"
              className="px-4 py-2 bg-blue-500 cursor-pointer rounded-lg text-white"
            >
              Sign in
            </Link>
          ) : (
            <button
              onClick={() => localStorage.removeItem("userEmail")}
              className="px-4 py-2 bg-blue-500 cursor-pointer rounded-lg text-white"
            >
              Sign out
            </button>
          )}
        </div>
      </header>

      <body className="bg-gray-100 flex flex-row items-start min-h-[100vh]">
        <section
          id="options"
          className="w-[300px] flex-1 sticky-aside left-0 pt-2 px-2 pl-4"
        >
          <div
            id="option-item"
            className="flex items-center space-x-3 p-4 hover:bg-gray-200 rounded-lg cursor-pointer"
          >
            <img
              src={user?.imageUrl}
              className="w-[32px] h-[32px] rounded-full"
              alt="Avatar"
            />
            <span className="font-semibold">
              {user?.firstName} {user?.lastName}
            </span>
          </div>
          <div
            id="option-item"
            className="flex items-center space-x-3 p-4 hover:bg-gray-200 rounded-lg cursor-pointer"
          >
            <ion-icon name="person-circle"></ion-icon>
            <Link to={`/user/${userEmail}`} className="font-semibold">
              Your profile
            </Link>
          </div>
        </section>

        <section
          id="content"
          className="mx-64 overflow-y-auto flex-1 mt-4 px-16"
        >
          {/* Post Input Section */}
          <div className="flex flex-row flex-1 bg-white px-4 py-3 space-x-4 items-center rounded-lg mb-4 shadow-sm">
            <img
              src={user?.imageUrl}
              alt="Author Avatar"
              className="w-[40px] h-[40px] rounded-full"
            />
            <input
              className="focus:outline-none bg-gray-200 flex-1 rounded-3xl p-3 text-md text-gray-700"
              placeholder="What are you thinking today?"
            />
          </div>

          <div className="space-y-4">
            {loadingPosts ? (
              <p>Loading posts...</p>
            ) : (
              posts?.map((post) => (
                <Post
                  key={post.id}
                  post={post}
                  authorEmail={post.email}
                  timeAgo={new Date()}
                  postImage={"https://via.placeholder.com/600x300"}
                  comments={0}
                />
              ))
            )}
          </div>
        </section>

        <section
          id="options"
          className="w-[300px] flex-1 sticky-aside right-0 pt-4 pr-4"
        >
          <span className="text-md font-bold text-gray-800">Followers</span>
          <div className="flex flex-col gap-3 mt-4">
            {loadingFollowers ? (
              <p>Loading followers...</p>
            ) : (
              followers?.map((follower) => (
                <Link to={`/user/${follower.email}`}>
                  <Follower
                    key={follower.email}
                    name={`${follower.firstName} ${follower.lastName}`}
                    imageUrl={follower.imageUrl}
                  />
                </Link>
              ))
            )}
          </div>
        </section>
      </body>
    </div>
  );
};

export default Home;
