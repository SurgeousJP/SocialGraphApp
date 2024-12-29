import useRouteElement from "./useRouteElement";

export default function App() {
  const routeElement = useRouteElement();
  return <div>{routeElement}</div>;
}
