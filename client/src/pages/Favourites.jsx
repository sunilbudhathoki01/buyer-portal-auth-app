import { useEffect, useState } from "react";
import axios from "axios";

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);

  const token = localStorage.getItem("token");

  const fetchFavourites = async () => {
    try {
      const res = await axios.get("http://localhost:9000/api/favourites", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFavourites(res.data.data || res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFavourites();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">❤️ My Favourites</h1>

      {favourites.length === 0 ? (
        <p>No favourite properties yet</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {favourites.map((f) => (
            <div key={f._id} className="bg-white p-4 rounded-xl shadow-md">
              <h2 className="font-semibold">{f.property?.title}</h2>
              <p className="text-gray-500">{f.property?.location}</p>
              <p className="text-blue-600 font-bold">Rs. {f.property?.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourites;
