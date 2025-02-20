import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../api/axios-client";
import DropdownMenu from "../components/common/DropDownMenu";
import { useAuthentContext } from "../contexts/AuthentContext";
import Modal from "../components/common/Modal";
import Input from "../components/common/input";
import RapportSection from "../components/common/RapportSection";
import { toast } from "react-toastify";

function Rapports() {
  const { departmentId } = useParams(); // Récupérer l'ID du département
  const { user } = useAuthentContext();
  const triggerRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [departement, setDepartement] = useState({});
  const [rapportsData, setRapportsData] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    objet: "",
    contenu: "",
  });

  // Fonction pour récupérer les rapports
  const getRapports = () => {
    setLoading(true);

    const endpoint =
      user.role === "admin"
        ? `/rapport/departement/${departmentId}` // Pour admin : rapports d'un département spécifique
        : `/rapport/liste/${user.id}`; // Pour utilisateur classique : rapports de l'utilisateur connecté

    axiosClient
      .get(endpoint)
      .then(({ data }) => {
        setRapportsData(data.rapports || []); // Met à jour les rapports
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des rapports :", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  // useEffect(() => {
  //   getRapports(); // Charger les rapports au montage

  //   const intervalId = setInterval(() => {
  //     getRapports(); // Recharger les rapports toutes les 5 secondes
  //   }, 5000);

  //   return () => clearInterval(intervalId); // Nettoyer l'intervalle au démontage
  // }, [departmentId]);

  // Fonction pour récupérer les informations du département
  const getDepartement = () => {
    setLoading(true);
    axiosClient
      .get(`/user/${departmentId}`)
      .then(({ data }) => {
        setDepartement(data[0]);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération du département :", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Fonction pour gérer l'envoi d'un rapport
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      id_exp: user.id, // Utilisateur connecté
      date_rapport: formData.date,
      objet_rapport: formData.objet,
      contenu_rapport: formData.contenu,
    };

    axiosClient
      .post("/rapport", payload)
      .then(() => {
        toast.success("Rapport envoyé avec succès.");
        toggleModal(false); // Fermer le modal après l'envoi
        setFormData({
          date: new Date().toISOString().split("T")[0],
          objet: "",
          contenu: "",
        }); // Réinitialiser le formulaire
        getRapports(); // Rafraîchir la liste des rapports
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi du rapport :", error);
        toast.error("Erreur lors de l'envoi du rapport.");
      });
  };

  // Basculer l'affichage du modal
  const toggleModal = (status) => {
    setIsModalOpen(status);
  };

  // Basculer l'affichage du menu déroulant
  const toggleDropdown = (value) => {
    setIsDropdownOpen(value);
  };

  // Charger les données initiales
  useEffect(() => {
    if (departmentId) {
      getDepartement();
      getRapports();
    }
  }, [departmentId]);

  return (
    <div className="p-3 w-full h-full flex flex-col">
      <section className="w-full flex justify-between relative">
        {departement && departement.nom_departement ? (
          <h1 className="text-xl font-bold mb-4">
            Rapports du département {departement.nom_departement}
          </h1>
        ) : (
          <p>Chargement du département...</p>
        )}

        {user.role !== "admin" && (
          <>
            <button
              ref={triggerRef}
              onClick={() => toggleDropdown(!isDropdownOpen)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md">
              Options
            </button>
            <DropdownMenu
              isOpen={isDropdownOpen}
              toggleDropdown={toggleDropdown}
              triggerRef={triggerRef}
              contentStyle="z-40 absolute right-0 bg-white border shadow-lg"
              childStyle="p-4">
              <ul>
                <li
                  onClick={() => toggleModal(true)} // Afficher le modal
                  className="py-2 px-4 hover:bg-gray-100 cursor-pointer">
                  Envoyer rapport
                </li>
              </ul>
            </DropdownMenu>
          </>
        )}
      </section>

      <section className="h-full">
        {loading ? (
          <p>Chargement des rapports...</p>
        ) : (
          <RapportSection
            rapports={rapportsData}
            currentUserRole={user.role}
            onStatusChange={getRapports}
          />
        )}
      </section>

      {/* Modal pour envoyer le rapport */}
      <Modal isOpen={isModalOpen} toggleModal={toggleModal}>
        <h2 className="text-xl">
          Envoyer rapport au département{" "}
          {departement?.nom_departement || "département inconnu"}
        </h2>
        <form onSubmit={handleSubmit}>
          <Input
            label="Objet"
            name="objet"
            value={formData.objet}
            onChange={(e) =>
              setFormData({ ...formData, objet: e.target.value })
            }
            placeholder="Entrez l'objet"
            required
          />
          <Input
            label="Contenu"
            name="contenu"
            value={formData.contenu}
            onChange={(e) =>
              setFormData({ ...formData, contenu: e.target.value })
            }
            placeholder="Entrez le contenu"
            required
            isTextArea={true}
          />
          <div className="w-full flex justify-between flex-row">
            <button
              onClick={() => toggleModal(false)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
              Annuler
            </button>
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
              Envoyer
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Rapports;
