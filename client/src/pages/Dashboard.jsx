import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [properties, setProperties] = useState([]);
  const [favourites, setFavourites] = useState([]);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const fetchData = async () => {
    try {
      const propRes = await axios.get("http://localhost:9000/api/properties");

      const favRes = await axios.get("http://localhost:9000/api/favourites", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProperties(propRes.data.data || propRes.data);
      setFavourites(favRes.data.data || favRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const isFavourite = (id) => {
    return favourites.some((f) => f.property?._id === id);
  };

  const toggleFavourite = async (id) => {
    try {
      if (isFavourite(id)) {
        await axios.delete(`http://localhost:9000/api/favourites/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(
          `http://localhost:9000/api/favourites/${id}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
      }

      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 🔝 NAVBAR */}
      <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">
          🏠 Property Dashboard
        </h1>

        <div className="flex items-center gap-3">
          {/* ❤️ FAVOURITES BUTTON */}
          <button
            onClick={() => navigate("/favourites")}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
          >
            ❤️ Favourites
          </button>

          {/* ADMIN BUTTON */}
          {role === "admin" && (
            <button
              onClick={() => navigate("/add-property")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              + Add Property
            </button>
          )}

          {/* LOGOUT */}
          <button
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* 📦 CONTENT */}
      <div className="p-6">
        {properties.length === 0 ? (
          <p className="text-gray-500 text-center">No properties available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {properties.map((p) => (
              <div
                key={p._id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
              >
                {/* IMAGE PLACEHOLDER */}
                <div className="h-40 bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
                  Image
                </div>

                {/* CONTENT */}
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {p.title}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">📍 {p.location}</p>

                  <div className="flex justify-between items-center mt-4">
                    <span className="text-blue-600 font-bold">
                      Rs. {p.price}
                    </span>

                    <button
                      onClick={() => toggleFavourite(p._id)}
                      className={`px-3 py-1 rounded-full text-sm transition ${
                        isFavourite(p._id)
                          ? "bg-red-500 text-white"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    >
                      ❤️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
