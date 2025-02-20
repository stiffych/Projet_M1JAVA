import { useRef, useEffect } from "react";

const DropdownMenu = ({
  isOpen,
  toggleDropdown,
  children,
  contentStyle,
  childStyle,
  triggerRef, // Passer la référence du bouton de déclenchement
}) => {
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    // Vérifier si le clic se produit en dehors du menu ET du bouton de déclenchement
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      triggerRef.current &&
      !triggerRef.current.contains(event.target)
    ) {
      toggleDropdown(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      className={` dropDown w-auto max-w-[400px] min-w-[12rem] top-[60px] rounded-lg transition-transform duration-300 ${
        isOpen
          ? "scale-100 opacity-100"
          : "scale-95 opacity-0 pointer-events-none"
      } ${contentStyle}`}
      ref={dropdownRef}
    >
      {isOpen && <div className={`${childStyle}`}>{children}</div>}
    </div>
  );
};

export default DropdownMenu;
