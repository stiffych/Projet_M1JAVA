import { useState, useEffect } from "react";
import axiosClient from "../api/axios-client";
import Modal from "../components/common/Modal";
import SalleCard from "../components/common/SalleCard";

function Salle() {
  const [loading, setLoading] = useState(false);
  const [salleData, setsalleData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectsalle, setSelectsalle] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    codesal: "",
    designation: "",
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [Deletesalle, setDeletesalle] = useState(null);

  // Récupérer les salle
  const getsalle = () => {
    setLoading(true);
    axiosClient
      .get("/salles")
      .then(({ data }) => {
        setsalleData(data); // Mettre à jour les salle
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des salle :", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const openModalModif = (salle) => {
    setSelectsalle(salle);
    setFormData({
      codesal: salle.codesal,
      nom: salle.nom,
      prenom: salle.prenom,
      designation: salle.designation,
    });
    setIsModalOpen(true);
  };

  const opendModalSuppr = (salle) => {
    setDeletesalle(salle);
    setIsDeleteModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsDeleteModalOpen(false);
    setDeletesalle(null);
    setSelectsalle(null);
  };

  // Gestion des changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const request = selectsalle
      ? axiosClient.put(`/salleMod/${selectsalle.id}`, formData)
      : axiosClient.post("/salle", formData);
    request
      .then(() => {
        getsalle(); // Rafraîchir les salle après ajout
        closeModal(); // Fermer le modal
        setFormData({
          codesal: "",
          nom: "",
          prenom: "",
          designation: "",
        }); // Réinitialiser le formulaire
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout de la salle :", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleDelet = () => {
    setLoading(true);
    axiosClient
      .delete(`/deletesalle/${Deletesalle.id}`)
      .then(() => {
        getsalle();
        closeModal();
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression du salle", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getsalle(); // Charger les salle au chargement du composant
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">salles</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Ajouter
        </button>
      </div>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {salleData.map((salle) => (
            <SalleCard
              key={salle.id}
              id={salle.id}
              codesal={salle.codesal}
              designation={salle.designation}
              onDelete={opendModalSuppr}
              onEdit={openModalModif}
            />
          ))}
        </div>
      )}

      {/* Modal d'ajout de salle */}
      <Modal isOpen={isModalOpen} toggleModal={setIsModalOpen}>
        <h2 className="text-xl font-bold mb-4">
          {selectsalle ? "Modifier un salleesseur" : "Ajouter un salleesseur"}
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            code
          </label>
          <input
            type="text"
            name="codesal"
            value={formData.codesal}
            onChange={handleChange}
            className="w-full border rounded p-2 mb-4"
            required
          />
          <label className="block text-sm font-medium text-gray-700 mb-2">
            designation
          </label>
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            className="w-full border rounded p-2 mb-4"
            required
          />

          <div className="flex justify-end space-x-4 mt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              {selectsalle ? "Modifier" : "Ajouter"}
            </button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isDeleteModalOpen} toggleModal={closeModal}>
        <h2 className="text-xl font-bold mb-4">
          Êtes-vous sûr de vouloir supprimer ce salle ?
        </h2>
        <div className="flex justify-end space-x-4 mt-4">
          <button
            type="button"
            onClick={closeModal}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">
            non
          </button>
          <button
            type="button"
            onClick={handleDelet}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            oui, supprimer
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Salle;
