import { createBrowserRouter, Navigate } from "react-router-dom";
// import AuthGuard from "./components/AuthGuard";
import App from "./views/App";
// import Login from "./views/auth/Login";
// import NotFundPage from "./components/NotFundPage";
// import Messages from "./views/messages"; // Composant Messages
// import Profil from "./views/profil";
// import Departement from "./views/Departement";
// import Rapports from "./views/rapports";
import Prof from "./views/Prof";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Navigate to="/prof" /> },
      { path: "/prof", element: <Prof /> },
      //     {
      //       path: "/departement", // Route dynamique
      //       element: <Departement />, // Le composant pour afficher les messages d'un département
      //     },
      //     {
      //       path: "/departments/:userId/:departmentId", // Route dynamique
      //       element: <Messages />, // Le composant pour afficher les messages d'un département
      //     },
      //     {
      //       path: "/profil/:userId", // Route dynamique
      //       element: <Profil />, // Le composant pour afficher les messages d'un département
      //     },
      //     {
      //       path: "*", // Route Not Found
      //       element: <NotFundPage />, // Page 404
      //     },
      //     {
      //       path: "/departments/:departmentId",
      //       element: <Rapports />,
      //     },
    ],
  },
]);

export default router;
