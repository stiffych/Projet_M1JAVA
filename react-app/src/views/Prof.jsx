import React from "react";
import Input from "../components/Input";

const Prof = () => {
  return (
    <form>
      <Input
        label="nom"
        name="nom"
        // value={formData.email}
        // onChange={handleChange}
        placeholder="entrer votre nom"
        required
        type="text"
      />
    </form>
  );
};

export default Prof;
