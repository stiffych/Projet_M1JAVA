import { useEffect, useState } from "react";
import axiosClient from "../../api/axios-client";
import { NavLink } from "react-router-dom";
import { useAuthentContext } from "../../contexts/AuthentContext"; // Importer le contexte pour obtenir l'utilisateur connecté

function AdminDepartments() {
  const [loading, setLoading] = useState(false); // Indicateur de chargement
  const [departments, setDepartments] = useState([]); // Liste des départements
  const [error, setError] = useState(null); // État pour les erreurs
  const { user } = useAuthentContext(); // Obtenir les informations de l'utilisateur connecté

  // Fonction pour récupérer les départements
  const fetchDepartments = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosClient.get("/user"); // Endpoint pour récupérer tous les utilisateurs

      // Filtrer les départements en fonction du rôle de l'utilisateur connecté
      const filteredDepartments =
        user.role === "admin"
          ? response.data.filter((dept) => dept.id !== user.id) // Admin : Tous les départements sauf le sien
          : response.data.filter((dept) => dept.role === "admin"); // Utilisateurs simples : Seulement les départements admin

      setDepartments(filteredDepartments);
    } catch (err) {
      console.error("Erreur lors de la récupération des départements :", err);
      setError("Impossible de charger les départements. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  // Charger les départements au montage du composant
  useEffect(() => {
    fetchDepartments();
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
          {departments.length > 0 ? (
            departments.map((department) => (
              <li key={department.id} className="mb-2 p-2 border-b">
                <NavLink
                  to={`/departments/${department.id}`}
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-500 font-semibold uppercase"
                      : "text-gray-700 hover:text-blue-500 uppercase"
                  }>
                  {department.nom_departement}
                </NavLink>
              </li>
            ))
          ) : (
            <p>Aucun département trouvé.</p>
          )}
        </ul>
      )}
    </div>
  );
}

export default AdminDepartments;
