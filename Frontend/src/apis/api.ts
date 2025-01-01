import axios from "axios";

// Define the structure of the user data response
export interface IPost {
  id: number;
  description: string;
  likes: number;
  email: string;
}

export interface IUserData {
  id: number;
  email: string;
  imageUrl: string;
  firstName: string;
  lastName: string;
  following: string[];
  likedPosts: IPost[];
  myPosts: IPost[];
}

// Axios instance for making API calls
const api = axios.create({
  baseURL: "http://localhost:3000/rest/neo4j",
});

// Login user, get JWT token, and save email to local storage
export const login = async (
  email: string,
  password: string
): Promise<string> => {
  try {
    const response = await axios.post("http://localhost:3000/auth/login", {
      email,
      password,
    });
    const token = response.data; // Assuming the response body is the token

    // Save email to local storage on successful login
    localStorage.setItem("userEmail", email);

    return token;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

// Fetch user data by email
export const getUserByEmail = async (email: string): Promise<IUserData> => {
  try {
    const response = await api.get<IUserData>(`/user/getByMail/${email}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
export const getUserPostByEmail = async (email: string): Promise<IPost[]> => {
  try {
    const response = await api.get<IPost[]>(`/post?mail=${email}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching post data:", error);
    throw error;
  }
};
export const getFollowerPostByEmail = async (
  email: string
): Promise<IPost[]> => {
  try {
    const response = await api.get<IPost[]>(`/post/getFollowersPosts/${email}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching post data:", error);
    throw error;
  }
};

export const getAllFollowersByEmail = async (
  email: string
): Promise<IUserData[]> => {
  try {
    const response = await api.get<IUserData[]>(
      `/user/getAllFollowers/${email}`
    );
    console.log("Followers data:", response);

    return response.data;
  } catch (error) {
    console.error("Error fetching followers data:", error);
    throw error;
  }
};

export const likePost = async (
  email: string,
  postId: number,
  description: string,
  likes: number
): Promise<IPost> => {
  try {
    const response = await api.post(
      `/post/likePost?mail=${encodeURIComponent(email)}`,
      {
        id: postId,
        description,
        likes: likes + 1,
        email,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error liking the post:", error);
    throw error;
  }
};
