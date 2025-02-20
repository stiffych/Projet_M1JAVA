import { useEffect, useState } from "react";
import DataTable from "../components/common/DataTable";
import axiosClient from "../api/axios-client";
import Modal from "../components/common/Modal";
import DepartementField from "../components/common/DepartementField";

function Departement() {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Fonction pour récupérer la liste des utilisateurs
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosClient.get("/user");
        setData(response.data);
      } catch (error) {
        console.error("Erreur de récupération:", error);
      }
    };
    fetchUsers();
  }, []);

  // Fonction pour afficher les détails d'un utilisateur
  const handleView = (item) => {
    alert(`Voir ${item.email}`);
  };

  // Fonction pour basculer l'état de la modal (ouverte ou fermée)
  const toggleModal = (state) => {
    setIsModalOpen(state);
  };

  // Fonction pour ouvrir le modal en mode édition
  const handleEdit = (item) => {
    console.log("Édition de l'utilisateur :", item); // Déboguer ici
    setCurrentUser(item);
    setIsModalOpen(true);
  };
  console.log("Édition de l'utilisateur data:", currentUser);

  // Fonction pour supprimer un utilisateur
  const handleDelete = async (item) => {
    const confirmed = window.confirm(
      `Êtes-vous sûr de vouloir supprimer ${item.email}?`
    );
    if (confirmed) {
      try {
        await axiosClient.delete(`/user/${item.id}`);
        setData(data.filter((i) => i.id !== item.id)); // Utilisation de `id` pour supprimer l'utilisateur
      } catch (error) {
        console.error("Erreur lors de la suppression:", error);
        alert("Une erreur est survenue lors de la suppression.");
      }
    }
  };

  // Fonction pour fermer la modal
  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentUser(null); // Réinitialiser l'utilisateur après la fermeture
  };

  // Fonction de soumission du formulaire (ajout ou modification)
  const handleSubmit = async (formData) => {
    try {
      if (currentUser) {
        // Mise à jour d'un utilisateur existant
        await handleSave(formData);
      } else {
        // Ajout d'un nouvel utilisateur
        const response = await axiosClient.post("/user", formData);
        setData((prevData) => [...prevData, response.data]); // Ajouter le nouvel utilisateur
        alert("Utilisateur ajouté !");
        handleModalClose(); // Fermer le modal après l'ajout
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout ou de la mise à jour:", error);
      alert("Une erreur est survenue.");
    }
  };

  // Fonction de sauvegarde lors de la mise à jour d'un utilisateur
  const handleSave = async (formData) => {
    try {
      await axiosClient.put(`/user/${currentUser.id}`, formData); // Mettre à jour l'utilisateur avec les données du formulaire
      setData((prevData) =>
        prevData.map((user) =>
          user.id === currentUser.id ? { ...user, ...formData } : user
        )
      );
      alert("Utilisateur modifié!");
      handleModalClose();
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      alert("Une erreur est survenue lors de la mise à jour.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tableau des utilisateurs</h1>

      <button
        onClick={() => {
          setCurrentUser(null); // Réinitialiser l'utilisateur pour l'ajout
          setIsModalOpen(true);
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
        Ajouter un utilisateur
      </button>

      <DataTable
        data={data}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Modal pour l'ajout ou l'édition */}
      <Modal isOpen={isModalOpen} toggleModal={toggleModal}>
        <h2>
          {currentUser ? "Modifier l'utilisateur" : "Ajouter un utilisateur"}
        </h2>

        {currentUser && (
          <DepartementField
            isEdit={true} // Mode édition activé
            onSubmit={handleSubmit}
            userToEdit={currentUser} // Passer les données initiales si en mode édition
          />
        )}

        {!currentUser && (
          <DepartementField
            isEdit={false} // Mode ajout activé
            onSubmit={handleSubmit}
            userToEdit={{}} // Passer un objet vide pour l'ajout
          />
        )}

        <button
          onClick={handleModalClose} // Utilisation de la fonction pour fermer le modal
          className="absolute top-[-10px] right-0 mt-4 px-4 py-2">
          X
        </button>
      </Modal>
    </div>
  );
}

export default Departement;
