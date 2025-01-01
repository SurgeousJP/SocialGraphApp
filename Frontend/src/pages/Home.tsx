import "ionicons/icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserByEmail, IPost, IUserData } from "../apis/api";
import Follower from "../components/Follower";

const Home = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [user, setUser] = useState<IUserData | null>(null);
  const [post, setPost] = useState<IPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");

    if (userEmail) {
      // Fetch user data using the API
      fetchUserData(userEmail);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserData = async (email: string) => {
    try {
      setLoading(true); // Set loading to true before making the request
      const userData = await getUserByEmail(email);
      setUser(userData); // Set user data in state
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error fetching user data:", error);
      setLoading(false); // Set loading to false if there's an error
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
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-500 cursor-pointer rounded-lg text-white"
          >
            Sign in
          </Link>
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
            <span className="font-semibold">Your profile</span>
          </div>
        </section>

        <section
          id="options"
          className="w-[300px] flex-1 sticky-aside right-0 pt-4 pr-4"
        >
          <span className="text-md font-bold text-gray-800">Followers</span>
          <div className="flex flex-col gap-3 mt-4">
            {arr.map((item) => {
              return <Follower key={item} />;
            })}
          </div>
        </section>
      </body>
    </div>
  );
};

export default Home;
