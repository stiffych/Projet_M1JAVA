import React from "react";
import { useParams } from "react-router-dom";

function Profil() {
  const { userId } = useParams();
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">profil du département {userId}</h1>
    </div>
  );
}

export default Profil;
