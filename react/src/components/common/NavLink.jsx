import { useEffect, useState } from "react";
import axiosClient from "../../api/axios-client";
import { useAuthentContext } from "../../contexts/AuthentContext";
import { NavLink } from "react-router-dom";

function NavLinks() {
  const { user } = useAuthentContext(); // Récupération de l'utilisateur connecté
  const [loading, setLoading] = useState(false); // Indicateur de chargement
  const [departmentsData, setDepartmentsData] = useState([]); // Tableau pour stocker les départements
  const [error, setError] = useState(null); // État pour gérer les erreurs

  // Fonction pour récupérer la liste des départements
  const getPublication = async () => {
    setLoading(true); // Activer le mode chargement
    setError(null); // Réinitialiser les erreurs
    try {
      const response = await axiosClient.get("/user"); // Appel à l'API
      setDepartmentsData(response.data); // Mettre à jour les données des départements
    } catch (err) {
      console.error("Erreur lors de la récupération des départements:", err);
      setError("Impossible de charger les départements. Veuillez réessayer.");
    } finally {
      setLoading(false); // Désactiver le mode chargement
    }
  };

  // Charger les départements au montage du composant
  useEffect(() => {
    getPublication();
  }, []);

  return (
    <div>
      {/* Afficher un message d'erreur si une erreur est survenue */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Afficher un indicateur de chargement */}
      {loading ? (
        <p>Chargement...</p>
      ) : (
        // Liste des départements
        <ul>
          {departmentsData.length > 0 ? (
            departmentsData
              .filter((department) => department.id !== user.id) // Filtrer les départements
              .map((department) => (
                <li key={department.id} className="mb-2 p-2 border-b">
                  <NavLink
                    to={`/departments/${user.id}/${department.id}`}
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-500 font-semibold uppercase"
                        : "text-gray-700 hover:text-blue-500 uppercase"
                    }
                  >
                    {department.nom_departement}
                  </NavLink>
                </li>
              ))
          ) : (
            // Message si aucun département n'est trouvé
            <p>Aucun département trouvé.</p>
          )}
        </ul>
      )}
    </div>
  );
}

export default NavLinks;
