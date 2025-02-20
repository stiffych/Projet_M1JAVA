import { useState, useEffect } from "react";
import axiosClient from "../api/axios-client";
import Modal from "../components/common/Modal";
import OccuperCard from "../components/common/OccuperCard";
import SalleCard from "../components/common/SalleCard";
import ProfCard from "../components/common/ProfCard";

function Occuper() {
  const [loading, setLoading] = useState(false);
  const [occuperData, setoccuperData] = useState([]);
  const [profData, setProfData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectoccuper, setSelectoccuper] = useState(null);
  const [salleData, setsalleData] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    codesal: "",
    codeProf: "",
    date: "",
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [Deleteoccuper, setDeleteoccuper] = useState(null);

  // Récupérer les occuper
  const getoccuper = () => {
    setLoading(true);
    axiosClient
      .get("/occupers")
      .then(({ data }) => {
        setoccuperData(data); // Mettre à jour les occuper
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des occuper :", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  // Récuperer salle
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
  // récuperer les prof quoi
  const getProf = () => {
    setLoading(true);
    axiosClient
      .get("/profs")
      .then(({ data }) => {
        setProfData(data); // Mettre à jour les prof
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des prof :", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  ////////
  const openModalModif = (occuper) => {
    setSelectoccuper(occuper);
    setFormData({
      codesal: occuper.codesal,
      nom: occuper.nom,
      prenom: occuper.prenom,
      codeProf: occuper.codeProf,
    });
    setIsModalOpen(true);
  };

  const opendModalSuppr = (occuper) => {
    setDeleteoccuper(occuper);
    setIsDeleteModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsDeleteModalOpen(false);
    setDeleteoccuper(null);
    setSelectoccuper(null);
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
    const request = selectoccuper
      ? axiosClient.put(`/occuperMod/${selectoccuper.id}`, formData)
      : axiosClient.post("/occuper", formData);
    request
      .then(() => {
        getoccuper(); // Rafraîchir les occuper après ajout
        closeModal(); // Fermer le modal
        setFormData({
          codesal: "",
          codeProf: "",
          date: "",
        }); // Réinitialiser le formulaire
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout de la occuper :", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleDelet = () => {
    setLoading(true);
    axiosClient
      .delete(`/deleteoccuper/${Deleteoccuper.id}`)
      .then(() => {
        getoccuper();
        closeModal();
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression du occuper", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getoccuper();
    getsalle();
    getProf(); // Charger les occuper au chargement du composant
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">occupers</h1>
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
          {occuperData.map((occuper) => (
            <OccuperCard
              key={occuper.id}
              id={occuper.id}
              codeProf={occuper.codeProf}
              codesal={occuper.codesal}
              date={occuper.date}
              onDelete={opendModalSuppr}
              onEdit={openModalModif}
            />
          ))}
        </div>
      )}

      {/* Modal d'ajout de occuper */}
      <Modal isOpen={isModalOpen} toggleModal={setIsModalOpen}>
        <h2 className="text-xl font-bold mb-4">
          {selectoccuper
            ? "Modifier une salle à occuper"
            : "Ajouter une salle à occuper"}
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            codesal
          </label>
          <select
            name="codesal"
            value={formData.codesal}
            onChange={handleChange}
            className="w-full border rounded p-2 mb-4">
            <option> ...</option>
            {salleData.map((salle) => (
              <option key={salle.id} value={salle.codesal}>
                {salle.codesal}
              </option>
            ))}
          </select>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            codeProf
          </label>
          <select
            name="codeProf"
            value={formData.codeProf}
            onChange={handleChange}
            className="w-full border rounded p-2 mb-4">
            <option> ...</option>
            {profData.map((prof) => (
              <option key={prof.id} value={prof.codeProf}>
                {prof.codeProf}
              </option>
            ))}
          </select>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
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
              {selectoccuper ? "Modifier" : "Ajouter"}
            </button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isDeleteModalOpen} toggleModal={closeModal}>
        <h2 className="text-xl font-bold mb-4">
          Êtes-vous sûr de vouloir supprimer ce occuper ?
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

export default Occuper;
