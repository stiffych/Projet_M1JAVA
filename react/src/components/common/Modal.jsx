import { useEffect } from "react";

const Modal = ({ isOpen, toggleModal, children }) => {
  useEffect(() => {
    // Désactiver le scroll en arrière-plan lorsque le modal est ouvert
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Fonction pour gérer le clic sur le fond sombre
  const handleBackgroundClick = (event) => {
    // Si le clic est sur le fond sombre et non sur le contenu du modal
    if (event.target === event.currentTarget) {
      toggleModal(false);
    }
  };

  return isOpen ? (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={handleBackgroundClick} // Gérer le clic sur le fond sombre
    >
      <div className="fixed inset-0 bg-black opacity-50" />
      <div className="relative bg-white rounded-lg shadow-lg z-50 p-6">
        {children}
      </div>
    </div>
  ) : null;
};

export default Modal;
