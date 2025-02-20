import React, { useState } from "react";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";

const ProfCard = ({ id, nom, prenom, codeProf, grade, onDelete, onEdit }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {codeProf || "N/A"}
        </h3>
        <div className="flex space-x-4">
          <button
            className="text-gray-500 hover:text-blue-500 focus:outline-none"
            aria-label="modifier"
            onClick={() => onEdit({ id, codeProf, nom, prenom, grade })}>
            <PencilIcon className="h-5 w-5" />
          </button>
          <button
            className="text-gray-500 hover:text-red-600 focus:outline-none"
            aria-label="supprimer"
            onClick={() => onDelete({ id, codeProf, nom, prenom, grade })}>
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="text-sm text-gray-500 mb-4">
        <p>
          <strong>Nom : </strong>
          {nom}
        </p>
        <p>
          <strong>Prénoms : </strong>
          {prenom}
        </p>
        <p>
          <strong>grade : </strong>
          {grade}
        </p>
      </div>
    </div>
  );
};

export default ProfCard;
