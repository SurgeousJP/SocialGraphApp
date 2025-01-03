// src/pages/FacebookLoginPage.tsx
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register, uploadImage } from "../apis/api";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState(""); // State for first name
  const [lastName, setLastName] = useState(""); // State for last name
  const [image, setImage] = useState<File | null>(null); // State for image
  const [imageUrl, setImageUrl] = useState<string | null>(null); // State to store the uploaded image URL
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false); // Toggling between login and register
  const [loading, setLoading] = useState(false); // Loading state for registration
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    if (userEmail) {
      navigate("/home");
    }
  }, [navigate, userEmail]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await login(email, password);
      console.log("Login successful, token:", token);
      navigate("/home"); // Redirect to home page
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError(err.response?.data);
        console.error("Login failed:", err.response?.data || err.message);
      } else {
        setError("Invalid email or password. Please try again.");
        console.error("Login failed:", err);
      }
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageUrl) {
      setError("Please upload a profile image.");
      return;
    }
    console.log("Registering with image URL:", imageUrl);

    setLoading(true); // Start loading

    try {
      const token = await register(
        email,
        password,
        firstName,
        lastName,
        imageUrl // Pass the uploaded image URL
      );
      console.log("Registration successful, token:", token);
      navigate("/home"); // Redirect to home page
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError(err.response?.data);
        console.error(
          "Registration failed:",
          err.response?.data || err.message
        );
      } else {
        setError("An error occurred during registration. Please try again.");
        console.error("Registration failed:", err);
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Handle image upload immediately after picking a file
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    if (file) {
      setImage(file);
      try {
        setLoading(true); // Show loading indicator while uploading the image
        const uploadedImageUrl = await uploadImage(file);
        setImageUrl(uploadedImageUrl); // Set the uploaded image URL
        setError(""); // Clear any previous error
        console.log("Image uploaded successfully:", uploadedImageUrl);
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          setError(err.response?.data);
          console.error(
            "Image upload failed:",
            err.response?.data || err.message
          );
        } else {
          setError("Image upload failed. Please try again.");
          console.error("Image upload failed:", err);
        }
      } finally {
        setLoading(false); // Hide loading indicator
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="w-full max-w-4xl flex bg-white shadow-lg rounded-md overflow-hidden">
        <div className="w-1/2 bg-blue-500 text-white p-10 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">facebook</h1>
          <p className="text-lg">
            Connect with friends and the world around you on Facebook.
          </p>
        </div>

        <div className="w-1/2 p-10 flex flex-col justify-center">
          <form
            className="space-y-6"
            onSubmit={isRegistering ? handleRegister : handleLogin}
          >
            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

            <div>
              <input
                type="text"
                placeholder="Email or Phone Number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {isRegistering && (
              <>
                <div>
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange} // Upload immediately after picking the image
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-300"
              disabled={loading} // Disable button while loading
            >
              {loading ? (
                <div
                  className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                  role="status"
                >
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
              ) : isRegistering ? (
                "Sign Up"
              ) : (
                "Log In"
              )}
            </button>
          </form>

          <div className="text-center mt-4">
            <a href="#" className="text-blue-500 text-sm hover:underline">
              Forgotten password?
            </a>
          </div>

          <div className="flex items-center mt-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsRegistering((prev) => !prev)} // Toggle between login and registration
              className="bg-green-500 text-white py-3 px-6 rounded-md hover:bg-green-600 transition duration-300"
            >
              {isRegistering
                ? "Already have an account? Log In"
                : "Create New Account"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
