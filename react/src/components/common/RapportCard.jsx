import React, { useState } from "react";

const RapportCard = ({
  title,
  content,
  number,
  date,
  status,
  onValidate,
  onReject,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleClick = () => {
    setShowDetails((prev) => !prev); // Inverser l'état d'affichage des détails
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <div className="text-sm text-gray-500 mb-4">
        <p>
          <strong>Numéro : </strong>
          {number || "N/A"}
        </p>
        <p>
          <strong>Date : </strong>
          {date ? new Date(date).toLocaleDateString() : "N/A"}
        </p>
        <p
          className={`text-sm font-medium ${
            status === "ATTENTE"
              ? "text-yellow-500"
              : status === "VALIDER"
              ? "text-green-500"
              : "text-red-500"
          }`}>
          Statut: {status}
        </p>
      </div>

      <div className="flex justify-between items-center">
        {/* Bouton pour afficher/masquer les détails */}
        <button
          onClick={handleClick}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors mb-2">
          {showDetails ? "Masquer Détails" : "Voir Détails"}
        </button>
        {status === "ATTENTE" && (
          <div className="flex space-x-2">
            {onValidate && (
              <button
                onClick={onValidate}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
                Valider
              </button>
            )}
            {onReject && (
              <button
                onClick={onReject}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
                Refuser
              </button>
            )}
          </div>
        )}
      </div>

      {/* Détails du rapport affichés conditionnellement */}
      {showDetails && (
        <div className="mt-4 border-t pt-4 text-gray-700">
          <h4 className="font-semibold text-gray-800">Contenu :</h4>
          <p>{content || "Aucun contenu disponible."}</p>
        </div>
      )}
    </div>
  );
};

export default RapportCard;
