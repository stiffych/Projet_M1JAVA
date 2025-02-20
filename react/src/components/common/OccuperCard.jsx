import React, { useState } from "react";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";

const OccuperCard = ({ id, codesal, codeProf, date, onDelete, onEdit }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {codesal || "N/A"}
        </h3>
        <div className="flex space-x-4 ">
          <button
            className="text-gray-500 hover:text-blue-500 focus:outline-none"
            aria-label="modifier"
            onClick={() => onEdit({ id, codesal, codeProf, date })}>
            <PencilIcon className="h-5 w-5" />
          </button>
          <button
            className="text-gray-500 hover:text-red-600 focus:outline-none"
            aria-label="supprimer"
            onClick={() => onDelete({ id, codesal, codeProf, date })}>
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="text-sm text-gray-500 mb-4">
        <p>
          <strong>codeProf : </strong>
          {codeProf}
        </p>
        <p>
          <strong>date : </strong>
          {date}
        </p>
      </div>
    </div>
  );
};

export default OccuperCard;
