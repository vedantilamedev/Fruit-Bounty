import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Edit, X } from "lucide-react";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export default function CustomizeBowl() {
  const [fruits, setFruits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [tempPrice, setTempPrice] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [newFruit, setNewFruit] = useState({ name: "", type: "Free", price: 0 });
  const [newFruitImage, setNewFruitImage] = useState(null); // ← image file
  const [addingFruit, setAddingFruit] = useState(false);

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => { fetchFruits(); }, []);

  const fetchFruits = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/fruits`, { headers });
      const normalized = res.data.data.map((f) => ({
        id: f._id,
        name: f.name,
        type: f.type || "Free",
        price: f.price || 0,
        available: f.available ?? true,
      }));
      setFruits(normalized);
    } catch (err) {
      console.error("Failed to fetch fruits", err);
    } finally {
      setLoading(false);
    }
  };

  // PUT — toggle availability
  const toggleAvailability = async (id) => {
    const fruit = fruits.find((f) => f.id === id);
    try {
      await axios.put(`${BASE_URL}/fruits/${id}`,
        { available: !fruit.available },
        { headers }
      );
      setFruits((prev) =>
        prev.map((f) => (f.id === id ? { ...f, available: !f.available } : f))
      );
    } catch (err) {
      console.error("Failed to update availability", err);
    }
  };

  // PUT — toggle type Free ↔ Premium
  const toggleType = async (id) => {
    const fruit = fruits.find((f) => f.id === id);
    const newType = fruit.type === "Free" ? "Premium" : "Free";
    const newPrice = newType === "Free" ? 0 : 100;
    try {
      await axios.put(`${BASE_URL}/fruits/${id}`,
        { type: newType, price: newPrice },
        { headers }
      );
      setFruits((prev) =>
        prev.map((f) => (f.id === id ? { ...f, type: newType, price: newPrice } : f))
      );
    } catch (err) {
      console.error("Failed to toggle type", err);
    }
  };

  // DELETE
  const deleteFruit = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/fruits/${id}`, { headers });
      setFruits((prev) => prev.filter((f) => f.id !== id));
    } catch (err) {
      console.error("Failed to delete fruit", err);
    }
  };

  // PUT — save updated price
  const savePrice = async (id) => {
    try {
      await axios.put(`${BASE_URL}/fruits/${id}`,
        { price: Number(tempPrice) },
        { headers }
      );
      setFruits((prev) =>
        prev.map((f) => (f.id === id ? { ...f, price: Number(tempPrice) } : f))
      );
      setEditingId(null);
    } catch (err) {
      console.error("Failed to update price", err);
    }
  };

  // POST — add fruit with FormData (required by your upload middleware)
  const addFruit = async () => {
    if (!newFruit.name.trim()) return;

    try {
      setAddingFruit(true);

      const formData = new FormData();
      formData.append("name", newFruit.name);
      formData.append("type", newFruit.type);
      formData.append("price", newFruit.type === "Premium" ? Number(newFruit.price) : 0);
      formData.append("stock", 0);
      formData.append("available", true);
      if (newFruitImage) formData.append("image", newFruitImage);

      const res = await axios.post(`${BASE_URL}/fruits`, formData, {
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
        },
      });

      const f = res.data.data;
      setFruits((prev) => [
        ...prev,
        { id: f._id, name: f.name, type: f.type, price: f.price || 0, available: f.available },
      ]);

      setNewFruit({ name: "", type: "Free", price: 0 });
      setNewFruitImage(null);
      setShowModal(false);
    } catch (err) {
      console.error("Failed to add fruit", err);
    } finally {
      setAddingFruit(false); // ✅ unfreeze
    }
  };

  const sortedFruits = [...fruits].sort((a, b) => {
    if (a.type === "Free" && b.type === "Premium") return -1;
    if (a.type === "Premium" && b.type === "Free") return 1;
    return 0;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 animate-pulse">Loading fruits...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="hidden md:block text-2xl sm:text-3xl font-bold">Customize Bowl</h1>
          <p className="hidden md:block text-gray-500">Manage fruit ingredients</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#22c55e] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#16a34a] transition"
        >
          <Plus size={18} /> Add Fruit
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Fruits" value={fruits.length} />
        <StatCard title="Free Fruits" value={fruits.filter((f) => f.type === "Free").length} color="text-green-600" />
        <StatCard title="Premium Fruits" value={fruits.filter((f) => f.type === "Premium").length} color="text-yellow-600" />
        <StatCard title="Available" value={fruits.filter((f) => f.available).length} color="text-blue-600" />
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow border mb-8">
        <table className="w-full min-w-[600px]">
          <thead className="bg-gray-50 border-b">
            <tr className="text-left text-gray-600 text-sm">
              <th className="p-4">Fruit</th>
              <th>Type</th>
              <th className="pr-12">Price</th>
              <th className="pl-12">Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedFruits.map((fruit) => (
              <tr key={fruit.id} className="border-b last:border-none hover:bg-gray-50 transition">
                <td className="p-4 font-medium">{fruit.name}</td>

                <td>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${fruit.type === "Free" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {fruit.type}
                    </span>
                    <button onClick={() => toggleType(fruit.id)} className="text-xs text-gray-600 hover:text-black">
                      Switch
                    </button>
                  </div>
                </td>

                <td className="font-semibold pr-12">
                  {fruit.type === "Premium" ? (
                    <div className="flex items-center gap-2">
                      {editingId === fruit.id ? (
                        <>
                          <input
                            type="number"
                            value={tempPrice}
                            onChange={(e) => setTempPrice(e.target.value)}
                            className="w-20 border rounded px-2 py-1 text-sm"
                          />
                          <button onClick={() => savePrice(fruit.id)} className="text-xs text-green-600 hover:underline">
                            Save
                          </button>
                        </>
                      ) : (
                        <>
                          ₹{fruit.price}
                          <button onClick={() => { setEditingId(fruit.id); setTempPrice(fruit.price); }} className="p-1 rounded hover:bg-gray-100">
                            <Edit size={14} />
                          </button>
                        </>
                      )}
                    </div>
                  ) : "Free"}
                </td>

                <td className="pl-12">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleAvailability(fruit.id)}
                      className={`w-11 h-6 flex items-center rounded-full px-1 transition ${fruit.available ? "bg-black" : "bg-gray-300"}`}
                    >
                      <div className={`h-4 w-4 bg-white rounded-full transition ${fruit.available ? "translate-x-5" : ""}`} />
                    </button>
                    <span className="text-sm text-gray-600">{fruit.available ? "Available" : "Unavailable"}</span>
                  </div>
                </td>

                <td className="text-center">
                  <button onClick={() => deleteFruit(fruit.id)} className="border border-red-400 text-red-600 p-2 rounded-lg hover:bg-red-50 transition">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ADD FRUIT MODAL */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-white w-[90%] max-w-[400px] rounded-xl p-6 relative">
              <button onClick={() => setShowModal(false)} className="absolute right-4 top-4"><X size={18} /></button>
              <h2 className="text-xl font-bold mb-4">Add New Fruit</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Fruit Name</label>
                  <input
                    value={newFruit.name}
                    onChange={(e) => setNewFruit({ ...newFruit, name: e.target.value })}
                    placeholder="Enter fruit name"
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Type</label>
                  <select
                    value={newFruit.type}
                    onChange={(e) => setNewFruit({ ...newFruit, type: e.target.value, price: e.target.value === "Free" ? 0 : newFruit.price })}
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                  >
                    <option>Free</option>
                    <option>Premium</option>
                  </select>
                </div>
                {newFruit.type === "Premium" && (
                  <div>
                    <label className="text-sm font-medium">Price (for premium)</label>
                    <input
                      type="number"
                      value={newFruit.price}
                      onChange={(e) => setNewFruit({ ...newFruit, price: e.target.value })}
                      placeholder="0.00"
                      className="w-full border rounded-lg px-3 py-2 mt-1"
                    />
                  </div>
                )}
                {/* ✅ Image upload — required by your backend */}
                <div>
                  <label className="text-sm font-medium">Fruit Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewFruitImage(e.target.files[0])}
                    className="w-full border rounded-lg px-3 py-2 mt-1 text-sm"
                  />
                </div>
                <button
                  onClick={addFruit}
                  disabled={addingFruit}
                  className={`w-full py-2 rounded-lg font-medium transition
    ${addingFruit
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#22c55e] text-white hover:bg-[#16a34a]"}
  `}
                >
                  {addingFruit ? "Adding..." : "Add Fruit"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const StatCard = ({ title, value, color = "text-gray-900" }) => (
  <motion.div className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
    <p className="text-sm text-gray-500 mb-1">{title}</p>
    <h3 className={`text-3xl font-bold ${color}`}>{value}</h3>
  </motion.div>
);