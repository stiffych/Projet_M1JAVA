import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../api/axios-client";
import { useAuthentContext } from "../contexts/AuthentContext";
import { useRef } from "react";
import DropdownMenu from "../components/common/DropDownMenu";
import Modal from "../components/common/Modal";
import Input from "../components/common/input";
import MessageSection from "../components/common/MessageSection";
import { toast } from "react-toastify";

function Messages() {
  const { departmentId } = useParams(); // Récupérer l'ID du département à partir des paramètres de l'URL
  const [loading, setLoading] = useState(false);
  const { user } = useAuthentContext();
  const [departement, setDepartement] = useState({});
  const [messagesData, setMessagesData] = useState([]); // Messages en attente
  const [messagesEnvoyes, setMessagesEnvoyes] = useState([]); // Messages envoyés
  const [messagesRecus, setMessagesRecus] = useState([]);
  const [messagesTypes, setMessagesTypes] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const triggerRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    objet: "",
    contenu: "",
  });
  const [number, setNumber] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const toggleModal = (status) => {
    setIsModalOpen(status);
  };

  const handleClick = async (type) => {
    try {
      const generatedNumber = await getNumber(type.id, departement.id);
      setSelectedType({ ...type, generatedNumber });
      toggleModal(true);
    } catch (error) {
      console.error("Erreur lors de la gestion du clic :", error);
    }
  };

  const toggleDropdown = (value) => {
    setIsDropdownOpen(value);
  };

  const getNumber = async (idType, idDestinateur) => {
    setLoading(true);
    try {
      const { data } = await axiosClient.get(
        `/message/next-numero/${user.id}/${idDestinateur}/${idType}`
      );
      setNumber(data.numero);
      return data.numero;
    } catch (error) {
      console.error("Erreur lors de la récupération des messages :", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getMessagesType = () => {
    setLoading(true);
    axiosClient
      .get("/type")
      .then(({ data }) => {
        setMessagesTypes(data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des messages :", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Récupérer les messages envoyés par l'utilisateur
  const getMessagesEnvoyes = () => {
    setLoading(true);
    axiosClient
      .get(`/message/envoyes/departement/${user.id}/${departmentId}`) // Appeler l'API avec l'ID de l'utilisateur et le département pointé
      .then(({ data }) => {
        if (Array.isArray(data.messages)) {
          setMessagesEnvoyes(data.messages); // Mettre à jour les messages envoyés
        } else {
          setMessagesEnvoyes([]); // Si aucun message n'est trouvé
        }
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des messages envoyés :",
          error
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Récupérer les messages en attente pour le département
  const getMessagesByDepartement = () => {
    setLoading(true);
    axiosClient
      .get(`/message/en_attente/departement/${departmentId}`)
      .then(({ data }) => {
        if (data.messages && Array.isArray(data.messages)) {
          setMessagesData(data.messages); // Mettre à jour les messages en attente seulement si c'est un tableau
        } else {
          setMessagesData([]);
        }
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des messages en attente :",
          error
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //Récuperer les messages réçus pour le departement
  const getMessagesRecus = () => {
    setLoading(true);
    axiosClient
      .get(`/message/recus/${user.id}/${departmentId}`) // L'utilisateur connecté et le département pointé
      .then(({ data }) => {
        if (Array.isArray(data.messages)) {
          setMessagesRecus(data.messages); // Mettre à jour les messages reçus
        } else {
          setMessagesRecus([]); // Si aucun message n'est trouvé
        }
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des messages reçus :",
          error
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getDepartement = () => {
    setLoading(true);
    axiosClient
      .get(`/user/${departmentId}`)
      .then(({ data }) => {
        if (data.length > 0) {
          setDepartement(data[0]);
          getMessagesByDepartement(); // Charger les messages en attente après avoir récupéré le département
          getMessagesEnvoyes(); // Charger aussi les messages envoyés
          getMessagesRecus(); // Charger les messages reçus
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération du département :", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  // useEffect(() => {
  //   // Appeler fetchMessages toutes les 5 secondes
  //   getDepartement(); // Appel initial
  //   const interval = setInterval(getDepartement, 5000);

  //   // Nettoyage de l'intervalle à la suppression du composant
  //   return () => clearInterval(interval);
  // }, [departmentId]);
  // useEffect(() => {
  //   // Appeler fetchMessages toutes les 5 secondes
  //   getMessagesEnvoyes(); // Appel initial
  //   const interval = setInterval(getMessagesEnvoyes, 5000);

  //   // Nettoyage de l'intervalle à la suppression du composant
  //   return () => clearInterval(interval);
  // }, [departmentId]);
  // useEffect(() => {
  //   // Appeler fetchMessages toutes les 5 secondes
  //   getMessagesByDepartement(); // Appel initial
  //   const interval = setInterval(getMessagesByDepartement, 5000);

  //   // Nettoyage de l'intervalle à la suppression du composant
  //   return () => clearInterval(interval);
  // }, [departmentId]);
  // useEffect(() => {
  //   // Appeler fetchMessages toutes les 5 secondes
  //   getMessagesRecus(); // Appel initial
  //   const interval = setInterval(getMessagesRecus, 5000);

  //   // Nettoyage de l'intervalle à la suppression du composant
  //   return () => clearInterval(interval);
  // }, [departmentId]);

  const handleSubmit = (e, params) => {
    e.preventDefault();
    const payload = {
      id_expediteur: user.id,
      id_type: params.selectedType.id,
      id_destinataire: params.departement.id,
      date: formData.date,
      numero: number,
      objet: formData.objet,
      contenu: formData.contenu,
    };

    axiosClient
      .post("/message", payload)
      .then((response) => {
        toggleModal(false);
        toast.success(`${params.selectedType.nom_type} envoyé avec succès`);
        console.log(response.data);
      })
      .catch((error) => {
        toast.error("Erreur lors de l'envoi du message.");
        console.log(error);
      });
  };
  const handleValidate = (messageId) => {
    axiosClient
      .patch(`/message/validate/${messageId}`)
      .then(() => {
        toast.success("Message validé avec succès.");
        getMessagesByDepartement();
      })
      .catch((error) => {
        toast.error("Erreur lors de la validation du message.");
        console.error(error);
      });
  };

  const handleReject = (messageId) => {
    axiosClient
      .patch(`/message/reject/${messageId}`)
      .then(() => {
        toast.success("Message rejeté avec succès.");
        getMessagesByDepartement();
      })
      .catch((error) => {
        toast.error("Erreur lors du rejet du message.");
        console.error(error);
      });
  };

  useEffect(() => {
    if (departmentId) {
      getMessagesType();
      getDepartement(); // Charger les messages et le département au chargement du composant
      getMessagesRecus();
    }
  }, [departmentId]);

  return (
    <div className="p-3 w-full h-full flex flex-col">
      <section className="w-full flex justify-between relative">
        {departement && departement.nom_departement ? (
          <h1 className="text-xl font-bold mb-4">
            Messages du département {departement.nom_departement}
          </h1>
        ) : (
          <p>Chargement du département...</p>
        )}

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
          {loading ? (
            <p>Chargement...</p>
          ) : (
            <ul>
              {messagesTypes.length > 0 ? (
                messagesTypes
                  .filter(
                    (type) => user.role === "admin" || type.nom_type === "MEMO"
                  )
                  .map((type) => (
                    <li
                      onClick={() => handleClick(type)}
                      key={type.id}
                      className="py-2 px-4 hover:bg-gray-100 cursor-pointer">
                      Envoyer {type.nom_type}
                    </li>
                  ))
              ) : (
                <p>Aucun type de message disponible.</p>
              )}
            </ul>
          )}
        </DropdownMenu>

        <Modal isOpen={isModalOpen} toggleModal={toggleModal}>
          <h2 className="text-xl">
            Envoyer {selectedType?.nom_type || ""} N&deg;{" "}
            {selectedType?.generatedNumber || "Numéro inconnu"} au département{" "}
            {departement?.nom_departement || "département inconnu"}
          </h2>
          <form
            onSubmit={(e) => handleSubmit(e, { selectedType, departement })}>
            <Input
              label="Objet"
              name="objet"
              value={formData.objet}
              onChange={handleChange}
              placeholder="Entrez l'objet"
              required
            />
            <Input
              label="Contenu"
              name="contenu"
              value={formData.contenu}
              onChange={handleChange}
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
      </section>

      <section className="h-full">
        {loading ? (
          <p>Chargement des messages...</p>
        ) : (
          <MessageSection
            messages={{
              enAttente: Array.isArray(messagesData) ? messagesData : [],
              envoyes: Array.isArray(messagesEnvoyes) ? messagesEnvoyes : [],
              recus: Array.isArray(messagesRecus) ? messagesRecus : [],
            }}
            currentUserId={user.id}
            currentUserRole={user.role}
            departmentId={departmentId}
            onStatusChange={getDepartement}
          />
        )}
      </section>
    </div>
  );
}
/* quand un departement envoye un message à la direction , il envoye un N.I et si c'est la direction vers le departement c'est O.S */

export default Messages;
