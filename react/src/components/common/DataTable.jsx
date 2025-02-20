import React from "react";

const DataTable = ({ data, onView, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">Nom Département</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Password</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{item.nom_departement}</td>
              <td className="px-4 py-2">{item.email}</td>
              <td className="px-4 py-2">{item.password}</td>
              <td className="px-4 py-2">
                <div className="flex space-x-3">
                  {/* Modifier */}
                  <button
                    onClick={() => onEdit(item)}
                    className="text-yellow-500 hover:text-yellow-700"
                  >
                    ✏️ Modifier
                  </button>

                  {/* Supprimer */}
                  <button
                    onClick={() => onDelete(item)}
                    className="text-red-500 hover:text-red-700"
                  >
                    🗑️ Supprimer
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
