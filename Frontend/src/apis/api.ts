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

// Fetch user data by email
export const getUserByEmail = async (email: string): Promise<IUserData> => {
  try {
    const response = await api.get<IUserData>(`/post?mail=${email}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
