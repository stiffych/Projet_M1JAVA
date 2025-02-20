import React, { useState, useEffect } from "react";
import { useAuthentContext } from "../../contexts/AuthentContext";
import Input from "./input";

const DepartementField = ({ isEdit, onSubmit, userToEdit }) => {
  const { user } = useAuthentContext(); // Récupérer les données de l'utilisateur connecté depuis le contexte
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    nom_departement: "",
    role: "",
  });

  useEffect(() => {
    if (isEdit && userToEdit) {
      setFormData(userToEdit);
      // Si en mode édition et que l'utilisateur à modifier est disponible
      setFormData({
        email: userToEdit.email || "", // Pré-remplir avec l'email de l'utilisateur à éditer
        password: "", // Le mot de passe reste vide en mode édition
        nom_departement: userToEdit.nom_departement || "",
        role: userToEdit.role || "",
      });
    } else if (!isEdit && user) {
      // En mode création (non-édition), pré-remplir avec l'utilisateur connecté
      setFormData({
        email: "", // L'email est vide en mode création
        password: "", // Le mot de passe doit être vide en mode création
        nom_departement: "",
        role: "",
      });
    }
  }, [isEdit, user, userToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Entrez votre email"
        required
        type="email"
      />

      <div className="flex space-x-4">
        <Input
          label="Mot de passe"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Entrez votre mot de passe"
          required={!isEdit} // Le mot de passe est requis seulement si en mode création
          type="password"
          className="flex-1"
        />
        <Input
          label="Nom du département"
          name="nom_departement"
          value={formData.nom_departement}
          onChange={handleChange}
          placeholder="Nom du département"
          required
          className="flex-1"
        />
      </div>

      {user?.role === "admin" && (
        <div>
          <label htmlFor="role" className="block text-sm font-medium">
            Rôle
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded"
            required>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
      )}

      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        {isEdit ? "Mettre à jour" : "Ajouter"}
      </button>
    </form>
  );
};

export default DepartementField;
