import { useState, useEffect } from "react";
import axiosClient from "../api/axios-client";
import Modal from "../components/common/Modal";
import ProfCard from "../components/common/ProfCard";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function Prof({}) {
  const [loading, setLoading] = useState(false);
  const [profData, setProfData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectProf, setSelectProf] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    codeProf: "",
    nom: "",
    prenom: "",
    grade: "",
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [DeleteProf, setDeleteProf] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.get(
        `/cherchProf?keyword=${searchTerm}`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
    }
  };

  // Récupérer les prof
  const getProf = () => {
    setLoading(true);
    axiosClient
      .get("/profs")
      .then(({ data }) => {
        setProfData(data);
        setSearchResults(data); // Mettre à jour les prof
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des prof :", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const openModalModif = (prof) => {
    setSelectProf(prof);
    setFormData({
      codeProf: prof.codeProf,
      nom: prof.nom,
      prenom: prof.prenom,
      grade: prof.grade,
    });
    setIsModalOpen(true);
  };

  const opendModalSuppr = (prof) => {
    setDeleteProf(prof);
    setIsDeleteModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsDeleteModalOpen(false);
    setDeleteProf(null);
    setSelectProf(null);
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
    const request = selectProf
      ? axiosClient.put(`/profMod/${selectProf.id}`, formData)
      : axiosClient.post("/prof", formData);
    request
      .then(() => {
        getProf(); // Rafraîchir les prof après ajout
        closeModal(); // Fermer le modal
        setFormData({
          codeProf: "",
          nom: "",
          prenom: "",
          grade: "",
        }); // Réinitialiser le formulaire
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout de la prof :", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleDelet = () => {
    setLoading(true);
    axiosClient
      .delete(`/deleteprof/${DeleteProf.id}`)
      .then(() => {
        getProf();
        closeModal();
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression du prof", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getProf(); // Charger les prof au chargement du composant
  }, []);

  return (
    <div className="p-6">
      {/* <Header setSearchResults={setSearchResults} /> */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Professeurs</h1>
        <div className="flex items-center space-x-4 ml-auto">
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher un professeur"
              className="p-2 m-1 border rounded"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 flex items-center justify-center">
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>
          </form>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Ajouter
          </button>
        </div>
      </div>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {searchResults.map((prof) => (
            <ProfCard
              key={prof.id}
              id={prof.id}
              nom={prof.nom}
              prenom={prof.prenom}
              codeProf={prof.codeProf}
              grade={prof.grade}
              onEdit={openModalModif}
              onDelete={opendModalSuppr}
            />
          ))}
        </div>
      )}

      {/* Modal d'ajout de prof */}
      <Modal isOpen={isModalOpen} toggleModal={setIsModalOpen}>
        <h2 className="text-xl font-bold mb-4">
          {selectProf ? "Modifier un professeur" : "Ajouter un professeur"}
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            code
          </label>
          <input
            type="text"
            name="codeProf"
            value={formData.codeProf}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded p-2 mb-4"
            required
          />
          <label className="block text-sm font-medium text-gray-700 mb-2">
            nom
          </label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded p-2 mb-4"
            required
          />
          <label className="block text-sm font-medium text-gray-700 mb-2">
            prénoms:
          </label>
          <input
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded p-2 mb-4"
            required
          />
          <label className="block text-sm font-medium text-gray-700 mb-2">
            grade
          </label>
          <input
            type="text"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded p-2 mb-4"
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
              {selectProf ? "Modifier" : "Ajouter"}
            </button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isDeleteModalOpen} toggleModal={closeModal}>
        <h2 className="text-xl font-bold mb-4">
          Êtes-vous sûr de vouloir supprimer ce professeur ?
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

export default Prof;
