import React, { useEffect } from "react";
import RapportCard from "./RapportCard";
import TabPanel from "./TabPanel ";
import { toast } from "react-toastify";
import axiosClient from "../../api/axios-client";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // Adresse du serveur Socket.IO

const RapportSection = ({ rapports = [], currentUserRole, onStatusChange }) => {
  // Filtrage des rapports par statut
  const rapportsRecus = rapports.filter((rapport) =>
    ["VALIDER", "ATTENTE", "REFUSER"].includes(rapport.status_rapport)
  );

  const rapportsEnAttente = rapports.filter(
    (rapport) => rapport.status_rapport === "ATTENTE"
  );

  const rapportsValides = rapports.filter(
    (rapport) => rapport.status_rapport === "VALIDER"
  );

  const rapportsRefuses = rapports.filter(
    (rapport) => rapport.status_rapport === "REFUSER"
  );

  // Fonction pour valider un rapport
  const handleValidate = async (numeroRapport) => {
    try {
      await axiosClient.patch(`/rapport/stat/${numeroRapport}`, {
        status_rapport: "VALIDER",
      });
      toast.success("Rapport validé avec succès !");
      onStatusChange(); // Rafraîchir les données
    } catch (error) {
      console.error("Erreur lors de la validation du rapport :", error);
      toast.error("Erreur lors de la validation du rapport.");
    }
  };

  // Fonction pour refuser un rapport
  const handleReject = async (numeroRapport) => {
    try {
      await axiosClient.patch(`/rapport/stat/${numeroRapport}`, {
        status_rapport: "REFUSER",
      });
      toast.success("Rapport refusé avec succès !");
      onStatusChange(); // Rafraîchir les données
    } catch (error) {
      console.error("Erreur lors du refus du rapport :", error);
      toast.error("Erreur lors du refus du rapport.");
    }
  };

  useEffect(() => {
    // Écouter les mises à jour des rapports en temps réel
    socket.on("rapportStatusUpdated", (data) => {
      toast.info(
        `Le rapport ${
          data.numero_rapport
        } a été mis à jour au statut ${data.status_rapport.toLowerCase()}.`
      );
      onStatusChange(); // Rafraîchir les rapports
    });

    return () => {
      socket.off("rapportStatusUpdated");
    };
  }, [onStatusChange]);

  // Fonction pour créer un onglet avec une liste de rapports
  const createTab = (label, rapportList, isAdminTab = false) => ({
    label,
    content: (
      <div className="space-y-4">
        {rapportList.length > 0 ? (
          rapportList.map((rapport) => (
            <RapportCard
              key={rapport.id}
              title={rapport.objet_rapport}
              content={rapport.contenu_rapport}
              number={rapport.numero_rapport}
              date={rapport.date_rapport}
              status={rapport.status_rapport}
              onValidate={
                isAdminTab
                  ? () => handleValidate(rapport.numero_rapport)
                  : undefined
              }
              onReject={
                isAdminTab
                  ? () => handleReject(rapport.numero_rapport)
                  : undefined
              }
            />
          ))
        ) : (
          <p>Aucun rapport {label.toLowerCase()}.</p>
        )}
      </div>
    ),
  });

  // Onglets basés sur le rôle de l'utilisateur
  let tabs = [];

  if (currentUserRole === "admin") {
    tabs = [createTab("Rapports reçus", rapportsRecus, true)];
  } else {
    tabs = [
      createTab("Rapports en attente", rapportsEnAttente),
      createTab("Rapports validés", rapportsValides),
      createTab("Rapports refusés", rapportsRefuses),
    ];
  }

  return (
    <section>
      <TabPanel tabs={tabs} />
    </section>
  );
};

export default RapportSection;
