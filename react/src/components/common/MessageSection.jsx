import React, { useEffect } from "react";
import MessageCard from "./MessageCard";
import TabPanel from "./TabPanel ";
import axiosClient from "../../api/axios-client";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // Connectez-vous au serveur Socket.IO

const MessageSection = ({
  messages = { enAttente: [], envoyes: [], recus: [] },
  currentUserId,
  currentUserRole,
  departmentId,
  onStatusChange, // Fonction pour rafraîchir la liste après mise à jour
}) => {
  const messagesEnAttente = messages.enAttente || [];
  const messagesEnvoyes = messages.envoyes || [];
  const messagesRecus = messages.recus || [];

  useEffect(() => {
    // Écouter les mises à jour des statuts des messages en temps réel
    socket.on("messageStatusUpdated", (data) => {
      toast.info(
        `Le message ${data.numero} a été ${data.status.toLowerCase()}.`
      );
      onStatusChange(); // Rafraîchir les données après mise à jour
    });

    return () => {
      socket.off("messageStatusUpdated");
    };
  }, [onStatusChange]);

  const handleStatusUpdate = async (numero, newStatus) => {
    try {
      await axiosClient.patch(`/message/status/${numero}`, {
        status: newStatus,
      });
      toast.success(
        `Le message a été ${
          newStatus === "VALIDER" ? "validé" : "refusé"
        } avec succès.`
      );
      onStatusChange(); // Rafraîchir la liste des messages après mise à jour
    } catch (error) {
      console.error(
        `Erreur lors de la mise à jour du statut pour le message ${numero} :`,
        error
      );
    }
  };

  const createTab = (label, messageList, isAdminTab = false) => ({
    label,
    content: (
      <div className="space-y-4">
        {messageList.length > 0 ? (
          messageList.map((message) => (
            <MessageCard
              key={message.id}
              title={message.objet}
              content={message.contenu}
              number={message.numero}
              date={message.date}
              status={message.status}
              onValidate={
                isAdminTab
                  ? () => handleStatusUpdate(message.numero, "VALIDER")
                  : undefined
              }
              onReject={
                isAdminTab
                  ? () => handleStatusUpdate(message.numero, "REFUSER")
                  : undefined
              }
            />
          ))
        ) : (
          <p>Aucun message {label.toLowerCase()}.</p>
        )}
      </div>
    ),
  });

  const tabs = [
    createTab("Messages envoyés", messagesEnvoyes),
    createTab("Messages reçus", messagesRecus),
  ];

  if (currentUserRole === "admin" && Array.isArray(messagesEnAttente)) {
    tabs.unshift(createTab("Messages en attente", messagesEnAttente, true));
  }

  return (
    <section>
      <TabPanel tabs={tabs} />
    </section>
  );
};

export default MessageSection;
