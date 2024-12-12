import { renderRoutes, routes } from "./routes/routes";

const App = () => {
  return <div>{renderRoutes(routes)}</div>;
};

export default App;
