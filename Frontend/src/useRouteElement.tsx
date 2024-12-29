import { useRoutes, Navigate } from "react-router-dom";
import Home from "./pages/Home";

export default function useRouteElement() {
  const routeElement = useRoutes([
    {
      element: <Home />,
      path: "/home",
    },
    {
      path: "*", // This matches all paths
      element: <Navigate to="/home" replace />, // Redirect to login as the default route
    },
  ]);
  return routeElement;
}
