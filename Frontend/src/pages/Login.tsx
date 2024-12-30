// src/pages/FacebookLoginPage.tsx
import React from "react";

const Login: React.FC = () => {
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
          <form className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Email or Phone Number"
                className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Log In
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
            <button className="bg-green-500 text-white py-3 px-6 rounded-md hover:bg-green-600 transition duration-300">
              Create New Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
