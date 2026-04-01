import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProperty = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSubmit = async () => {
    if (!title || !location || !price) {
      return alert("All fields required");
    }

    try {
      await axios.post(
        "http://localhost:9000/api/properties",
        { title, location, price },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Property Added ✅");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert("Failed to add property");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Property</h2>

        <input
          placeholder="Title"
          className="w-full mb-4 p-2 border rounded-lg"
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Location"
          className="w-full mb-4 p-2 border rounded-lg"
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          className="w-full mb-4 p-2 border rounded-lg"
          onChange={(e) => setPrice(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddProperty;
