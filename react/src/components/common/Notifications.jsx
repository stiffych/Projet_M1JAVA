import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axiosClient from "../../api/axios-client";
import { useNavigate } from "react-router-dom";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Charger les notifications
  const fetchNotifications = () => {
    axiosClient
      .get("/notification")
      .then(({ data }) => setNotifications(data.notifications || []))
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des notifications :",
          error
        );
      });
  };

  // Gérer l'affichage des détails d'une notification
  const handleNotificationClick = (notification) => {
    if (notification.link) {
      navigate(notification.link); // Rediriger vers la page liée
    }
    // Mettre à jour l'état de la notification comme lue (optionnel)
    axiosClient
      .patch(`/notification/${notification.id}`, { read: true })
      .then(() => fetchNotifications())
      .catch((error) =>
        console.error("Erreur lors de la mise à jour :", error)
      );
  };

  // Charger les notifications au montage du composant
  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="relative">
      {/* Icône de notification */}
      <button
        className="relative p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
        onClick={() => setIsDropdownOpen((prev) => !prev)}>
        <span className="material-icons">notifications</span>
        {notifications.some((notif) => !notif.read) && (
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
            {notifications.filter((notif) => !notif.read).length}
          </span>
        )}
      </button>

      {/* Liste des notifications */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white border shadow-lg z-50">
          <ul className="divide-y divide-gray-200">
            {notifications.slice(0, 5).map((notification) => (
              <li
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                className={`p-4 cursor-pointer ${
                  notification.read ? "bg-gray-100" : "bg-white"
                } hover:bg-gray-200`}>
                {notification.message}
              </li>
            ))}
          </ul>
          <div className="p-2 text-center">
            <button
              onClick={() => navigate("/notifications")}
              className="text-blue-500 hover:underline">
              Voir toutes les notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Notifications;
