import Salle from "../../views/salle";

function SideBare() {
  return (
    <div className="p-3">
      <a href="/prof">
        <h2 className="text-xl font-semibold mb-4">Accueil</h2>
      </a>
      <a href="/salle">
        <h1 className="text-xl font-semibold mb-4">Salle</h1>
      </a>
      <a href="/occuper">
        <h1 className="text-xl font-semibold mb-4">Occuper</h1>
      </a>
    </div>
  );
}

export default SideBare;
