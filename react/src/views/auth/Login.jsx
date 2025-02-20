import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import pour la redirection
import Input from "../../components/common/input";
import axiosClient from "../../api/axios-client";
import { toast, ToastContainer } from "react-toastify";
import { useAuthentContext } from "../../contexts/AuthentContext";
import { images } from "../../assets/image/image";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { setUser, setToken } = useAuthentContext(); // Pas besoin du token ici
  const navigate = useNavigate(); // Hook pour rediriger

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email: formData.email,
      password: formData.password,
    };

    console.log("Payload envoyé :", payload);

    try {
      console.log("Envoi des données au serveur...");
      const response = await axiosClient.post("/user/login", payload); // Ajout de await
      console.log("Réponse du serveur :", response.data); // Assurez-vous que ce log s'affiche

      if (response.status === 200) {
        setToken(response.data.token);
        setUser(response.data.user);

        toast.success("Connexion réussie", { position: "top-right" });

        // Redirection vers la page d'accueil
        navigate("/");
      }
    } catch (err) {
      const { response } = err; // Extraire la réponse d'erreur
      console.log("Erreur retournée par le serveur :", response?.data);

      if (response && response.status === 401) {
        toast.warn(response.data.message, { position: "top-left" });
      } else {
        toast.error("Une erreur est survenue, veuillez réessayer.", {
          position: "top-right",
        });
      }
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center bg-[#3b71ca]">
      <div className="p-6 bg-white rounded shadow-md flex flex-col md:flex-row w-full max-w-4xl">
        {/* Section de gauche (pour mobile et grand écran) */}
        <section className="w-full md:w-1/2 p-4 bg-gray-100 flex justify-center items-center rounded-t md:rounded-l">
          <img
            src={images.logo} // Remplace cette URL par l'URL de ton image
            alt="Bienvenue"
            className="w-full h-auto rounded-lg mb-4"
          />
        </section>

        {/* Section de droite (formulaire de connexion) */}
        <section className="w-full md:w-1/2 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Connexion</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Entrez votre email"
              label="Email"
              required
            />
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Entrez votre mot de passe"
              label="Mot de passe"
              required
            />
            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
              Se connecter
            </button>
          </form>
        </section>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
