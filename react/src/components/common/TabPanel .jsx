import React, { useState } from "react";

const TabPanel = ({ tabs = [] }) => {
  const [activeTab, setActiveTab] = useState(0);

  if (!Array.isArray(tabs) || tabs.length === 0) {
    return <p>Aucun onglet disponible.</p>; // Message si `tabs` est vide ou invalide
  }

  return (
    <div className="w-full">
      {/* Onglets */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 text-sm font-medium focus:outline-none ${
              activeTab === index
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600 hover:text-blue-500"
            }`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contenu */}
      <div className="p-4 bg-white border border-gray-200 rounded-b-lg">
        {tabs[activeTab]?.content || <p>Aucun contenu disponible.</p>}
      </div>
    </div>
  );
};

export default TabPanel;
