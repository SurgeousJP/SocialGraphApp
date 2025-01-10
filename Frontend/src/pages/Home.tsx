import "ionicons/icons";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  addNewPost,
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
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [newPostText, setNewPostText] = useState(""); // New post text
  const userEmail = localStorage.getItem("userEmail");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery) {
      navigate(`/user/${searchQuery}`);
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery) {
      navigate(`/user/${searchQuery}`);
    }
  };

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
  const handleAddPost = async () => {
    if (!newPostText.trim()) return;

    try {
      await addNewPost({
        description: newPostText,
        email: userEmail ?? "",
        likes: 0,
      });
      setNewPostText("");
      setIsModalOpen(false);
      fetchPosts(userEmail ?? ""); // Refresh posts
    } catch (error) {
      console.error("Error adding new post:", error);
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyPress} // Trigger on Enter key
            />
            <ion-icon
              className="text-gray-500 cursor-pointer"
              name="search"
              size="small"
              onClick={handleSearch} // Trigger on icon click
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
              onClick={() => {
                navigate("/login");
                localStorage.removeItem("userEmail");
              }}
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
            <div
              onClick={() => setIsModalOpen(true)}
              className="focus:outline-none bg-gray-200 flex-1 rounded-3xl p-3 text-md"
            >
              <span className="text-gray-500">
                What are you thinking today?
              </span>
            </div>
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
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg mx-4 relative">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                Create a Post
              </h2>
              <textarea
                className="w-full border border-gray-200 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none shadow-sm"
                rows={5}
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
                placeholder="What's on your mind?"
              ></textarea>
              <div className="flex justify-end space-x-3">
                <button
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-sm hover:bg-gray-300 transition-all"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all"
                  onClick={handleAddPost}
                >
                  Post
                </button>
              </div>
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-all"
                onClick={() => setIsModalOpen(false)}
              >
                <ion-icon name="close-outline" size="large"></ion-icon>
              </button>
            </div>
          </div>
        )}
      </body>
    </div>
  );
};

export default Home;
