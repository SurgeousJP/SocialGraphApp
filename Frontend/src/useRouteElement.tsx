import { Navigate, useRoutes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";

export default function useRouteElement() {
  const routeElement = useRoutes([
    {
      element: <Home />,
      path: "/home",
    },
    {
      element: <UserProfile />,
      path: "/user",
    },
    {
      element: <Login />,
      path: "/login",
    },
    {
      path: "*", // This matches all paths
      element: <Navigate to="/home" replace />, // Redirect to login as the default route
    },
  ]);
  return routeElement;
}
