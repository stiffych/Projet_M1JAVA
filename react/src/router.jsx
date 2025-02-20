import { createBrowserRouter, Navigate } from "react-router-dom";
import Prof from "./views/Prof";
import App from "./views/App";
import Salle from "./views/salle";
import Occuper from "./views/Occuper";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Navigate to="/prof" /> },
      { path: "/prof", element: <Prof /> },
      {
        path: "/salle",
        element: <Salle />, // Le composant pour afficher les salles
      },
      {
        path: "/occuper",
        element: <Occuper />,
      },
    ],
  },
]);

export default router;
