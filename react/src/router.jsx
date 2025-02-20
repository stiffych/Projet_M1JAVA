import { createBrowserRouter, Navigate } from "react-router-dom";
import Prof from "./views/Prof";
import App from "./views/App";
import Salle from "./views/salle";

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
      // {
      //   path: "/departments/:userId/:departmentId", // Route dynamique
      //   element: <Messages />, // Le composant pour afficher les messages d'un département
      // },
      // {
      //   path: "/profil/:userId", // Route dynamique
      //   element: <Profil />, // Le composant pour afficher les messages d'un département
      // },
      // {
      //   path: "*", // Route Not Found
      //   element: <NotFundPage />, // Page 404
      // },
      // {
      //   path: "/departments/:departmentId",
      //   element: <Rapports />,
      // },
    ],
  },
]);

export default router;
