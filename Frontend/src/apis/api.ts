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

export interface AddPostRequest {
  description: string;
  likes?: number; // Default to 0 if not provided
  email: string;
}

// Axios instance for making API calls
const api = axios.create({
  baseURL: "http://localhost:3000/rest/neo4j",
});

export const addNewPost = async (postData: AddPostRequest): Promise<void> => {
  try {
    await api.post(`/post/addPost`, postData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Post added successfully!");
  } catch (error) {
    console.error("Error adding new post:", error);
    throw error;
  }
};

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

// add interceptor that log request
api.interceptors.request.use((config) => {
  console.log("Request:", config);
  return config;
});

export const register = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  imageUrl: string
): Promise<string> => {
  try {
    const response = await api.post("/user/addUser", {
      email,
      imageUrl,
      firstName,
      lastName,
      password,
    });

    const token = response.data; // Assuming the response body is the token
    return token;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};
// src/apis/api.ts
export const uploadImage = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post(
      "http://localhost:3000/media/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("Image uploaded successfully:", response.data);
    // Assuming the response contains a URL to the uploaded image
    const imageUrl = response.data.url;
    return imageUrl;
  } catch (error) {
    console.error("Error during image upload:", error);
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
export const unlikePost = async (
  email: string,
  postId: number,
  description: string,
  likes: number
): Promise<IPost> => {
  try {
    const response = await api.post(
      `/post/dislikePost?mail=${encodeURIComponent(email)}`,
      {
        id: postId,
        description,
        likes: likes - 1,
        email,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error unliking the post:", error);
    throw error;
  }
};
// Fetch all users by a specific post ID
export const getAllUsersByPostId = async (
  postId: number
): Promise<IUserData[]> => {
  try {
    const response = await api.get<IUserData[]>(`/user?postId=${postId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users by post ID:", error);
    throw error;
  }
};
export const isFollowUser = async (email: string): Promise<boolean> => {
  try {
    const userEmail = localStorage.getItem("userEmail");
    const response = await api.get<boolean>(
      `/follows/isFollowing/${userEmail}/${email}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching is following:", error);
    throw error;
  }
};

export const followUser = async (email: string): Promise<string> => {
  try {
    const userEmail = localStorage.getItem("userEmail");
    const response = await api.post<string>(
      `/follows/users/${userEmail}/follow/${email}`
    );
    return response.data;
  } catch (error) {
    console.error("Error folowing:", error);
    throw error;
  }
};
export const unfollowUser = async (email: string): Promise<string> => {
  try {
    const userEmail = localStorage.getItem("userEmail");
    const response = await api.delete<string>(
      `/follows/users/${userEmail}/unfollow/${email}`
    );
    return response.data;
  } catch (error) {
    console.error("Error unfolowing:", error);
    throw error;
  }
};
