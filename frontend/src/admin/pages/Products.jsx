import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Edit, Star, Trash2, X, Plus, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import axios from "axios";

const API_URL = import.meta.env.VITE_BASE_URL || "https://fruit-bounty-dmzs.onrender.com/api";

function cn(...classes) { return classes.filter(Boolean).join(" "); }

function Card({ className, children, ...props }) { return <div className={cn("bg-white rounded-xl border shadow-sm", className)} {...props}>{children}</div>; }
function Badge({ className, children }) { return <span className={cn("px-2 py-1 rounded-md text-xs font-medium bg-green-50 text-green-700 border", className)}>{children}</span>; }
function Switch({ checked, onChange }) { return <button onClick={() => onChange(!checked)} className={cn("w-10 h-5 rounded-full transition", checked ? "bg-green-600" : "bg-gray-300")}><span className={cn("block w-4 h-4 bg-white rounded-full transition", checked ? "translate-x-5" : "translate-x-1")} /></button>; }

function BowlForm({ bowl, onSave, onCancel }) {
  const [name, setName] = useState(bowl?.name || "");
  const [description, setDescription] = useState(bowl?.description || "");
  const [price, setPrice] = useState(bowl?.price || "");
  const [ingredients, setIngredients] = useState(bowl?.ingredients?.join(", ") || "");
  const [weight, setWeight] = useState(bowl?.weight || "");
  const [available, setAvailable] = useState(bowl?.available ?? true);
  const [images, setImages] = useState(bowl?.images || []);
  
  const handleSubmit = (e) => { 
    e.preventDefault(); 
    onSave(bowl?.id, { name, description, price: parseFloat(price), ingredients: ingredients.split(",").map(i => i.trim()), available, images }); 
  };
  
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newImages = [...images];
      let loadedCount = 0;
      
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newImages.push(reader.result);
          loadedCount++;
          if (loadedCount === files.length) {
            setImages([...newImages]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };
  
  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };
  
  const addMoreImages = () => {
    const input = document.getElementById('image-upload-input');
    if (input) input.click();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">{bowl ? "Edit Bowl" : "Add New Bowl"}</h2>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">
              Images (No limit)
            </label>
            <div className="grid grid-cols-3 gap-2 mb-2">
              {images.map((img, index) => (
                <div key={index} className="relative">
                  <img src={img} alt={`Preview ${index + 1}`} className="w-full h-20 object-cover rounded-lg" />
                  <button 
                    type="button" 
                    onClick={() => removeImage(index)} 
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 text-xs"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
              <div 
                onClick={addMoreImages}
                className="border-2 border-dashed border-slate-300 rounded-lg p-2 text-center hover:border-green-400 transition-colors cursor-pointer flex items-center justify-center h-20"
              >
                <Plus size={20} className="text-slate-400" />
              </div>
            </div>
            <p className="text-xs text-slate-500">{images.length} images uploaded</p>
            <input 
              id="image-upload-input"
              type="file" 
              accept="image/*" 
              multiple 
              onChange={handleImageChange} 
              className="hidden" 
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">Title</label>
            <input className="border p-2 rounded w-full" placeholder="Enter bowl title" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">Price</label>
            <input className="border p-2 rounded w-full" placeholder="Enter price" type="number" value={price} onChange={e => setPrice(e.target.value)} required />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">Ingredients</label>
            <input className="border p-2 rounded w-full" placeholder="Enter ingredients separated by comma" value={ingredients} onChange={e => setIngredients(e.target.value)} required />
          </div>
          <div>
  <label className="text-sm font-medium text-slate-700 mb-1 block">
    Weight (in grams)
  </label>

  <div className="flex items-center border rounded w-full overflow-hidden">
    

    {/* Input */}
    <input
      type="number"
      className="w-full outline-none p-2"
      placeholder="Enter the weight in g (e.g. 250, 500)"
      value={weight}
      onChange={e => setWeight(e.target.value)}
      min="0"
    />

  

  </div>
</div>
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">Description</label>
            <textarea className="border p-2 rounded w-full min-h-[120px] resize-none" placeholder="Enter bowl description" value={description} onChange={e => setDescription(e.target.value)} />
          </div>
          <div className="flex items-center gap-2"><Switch checked={available} onChange={setAvailable} /><span>Available</span></div>
          <div className="flex justify-end gap-2 mt-4">
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700">Save</button>
            <button type="button" onClick={onCancel} className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ProductCard({ bowl, onEdit, onDelete, onToggleAvailability, bestSellerCount }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const hasMultipleImages = bowl.images && bowl.images.length > 1;
  
  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % bowl.images.length);
  };
  
  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + bowl.images.length) % bowl.images.length);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="overflow-hidden">
        <div className="relative h-40 sm:h-48 bg-gradient-to-br from-green-100 to-emerald-100">
          {bowl.images && bowl.images.length > 0 ? (
            <>
              <img src={bowl.images[currentImageIndex]} alt={bowl.name} className="w-full h-full object-cover" />
              {hasMultipleImages && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                    {currentImageIndex + 1}/{bowl.images.length}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-green-600 text-4xl font-bold">{bowl.name[0]}</div>
          )}
          {bowl.salesCount > 0 && bowl.salesCount === bestSellerCount && <div className="absolute top-2 right-2 z-10"><Badge className="bg-yellow-400 text-yellow-900 flex items-center gap-1"><Star className="w-3 h-3" />Best Seller</Badge></div>}
          {!bowl.available && <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10"><Badge className="bg-white text-slate-700">Unavailable</Badge></div>}
        </div>
        <div className="p-4 sm:p-6">
          <div className="flex justify-between items-start mb-3">
            <div><h3 className="font-semibold text-lg">{bowl.name}</h3>{bowl.description && <p className="text-sm text-slate-500 mt-1">{bowl.description}</p>}</div>
            <p className="text-2xl font-bold text-green-600 ml-2">₹{bowl.price}</p>
          </div>
          <p className="text-xs text-slate-500 mb-3">{bowl.salesCount} orders</p>
          <div className="mb-4"><p className="text-xs font-medium text-slate-600 mb-2">Ingredients:</p><div className="flex flex-wrap gap-1">{bowl.ingredients.map(ing => <Badge key={ing}>{ing}</Badge>)}</div></div>
          <div className="flex justify-between items-center pt-3 border-t">
            <div className="flex items-center gap-2"><Switch checked={bowl.available} onChange={() => onToggleAvailability(bowl.id)} /><span className="text-sm">Available</span></div>
            <div className="flex gap-2">
              <button onClick={() => onEdit(bowl)} className="p-2 rounded-md bg-green-600 text-white hover:bg-green-700" title="Edit">
                <Edit size={16} />
              </button>
              <button onClick={() => onDelete(bowl.id)} className="p-2 rounded-md bg-red-600 text-white hover:bg-red-700" title="Delete">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export default function Products() {
  const [bowls, setBowls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingBowl, setEditingBowl] = useState(null);
  const [addingBowl, setAddingBowl] = useState(false);

  // Get auth token
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  // Fetch bowls from API
  const fetchBowls = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/fruits`, { headers });
      // Filter only bowls (isBowl = true) and normalize data
      const bowlData = res.data.data
        .filter(item => item.isBowl === true)
        .map(item => ({
          id: item._id,
          name: item.name,
          description: item.description || "",
          price: item.price,
          ingredients: item.ingredients || [],
          available: item.available ?? true,
          salesCount: item.salesCount || 0,
          images: item.images || []
        }));
      setBowls(bowlData);
      setError(null);
    } catch (err) {
      console.error("Error fetching bowls:", err);
      setError("Failed to load bowls");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBowls();
  }, []);

  const bestSellerCount = bowls.length > 0 ? Math.max(...bowls.map(b => b.salesCount || 0)) : 0;

  const toggleAvailability = async (id) => {
    const bowl = bowls.find(b => b.id === id);
    if (!bowl) return;
    try {
      await axios.put(`${API_URL}/fruits/${id}`, 
        { available: !bowl.available },
        { headers }
      );
      setBowls(bowls.map(b => b.id === id ? { ...b, available: !b.available } : b));
    } catch (err) {
      console.error("Error toggling availability:", err);
      alert("Failed to update availability");
    }
  };

  const deleteBowl = async (id) => {
    if (!window.confirm("Are you sure you want to delete this bowl?")) return;
    try {
      await axios.delete(`${API_URL}/fruits/${id}`, { headers });
      setBowls(bowls.filter(b => b.id !== id));
    } catch (err) {
      console.error("Error deleting bowl:", err);
      alert("Failed to delete bowl");
    }
  };

  const saveBowl = async (id, updated) => {
    try {
      const formData = new FormData();
      formData.append("name", updated.name);
      formData.append("price", updated.price);
      formData.append("description", updated.description || "");
      formData.append("ingredients", updated.ingredients.join(", "));
      formData.append("available", updated.available);
      formData.append("isBowl", "true");
      
      // Add images if any new ones selected (base64 URLs need special handling)
      // For now, we'll handle images separately

      if (id) {
        // Update existing
        const res = await axios.put(`${API_URL}/fruits/${id}`, formData, { headers });
        const updatedBowl = {
          id: res.data.data._id,
          name: res.data.data.name,
          description: res.data.data.description || "",
          price: res.data.data.price,
          ingredients: res.data.data.ingredients || [],
          available: res.data.data.available ?? true,
          salesCount: res.data.data.salesCount || 0,
          images: res.data.data.images || []
        };
        setBowls(bowls.map(b => b.id === id ? updatedBowl : b));
      } else {
        // Create new
        const res = await axios.post(`${API_URL}/fruits`, formData, { headers });
        const newBowl = {
          id: res.data.data._id,
          name: res.data.data.name,
          description: res.data.data.description || "",
          price: res.data.data.price,
          ingredients: res.data.data.ingredients || [],
          available: res.data.data.available ?? true,
          salesCount: res.data.data.salesCount || 0,
          images: res.data.data.images || []
        };
        setBowls([newBowl, ...bowls]);
      }
      setEditingBowl(null);
      setAddingBowl(false);
    } catch (err) {
      console.error("Error saving bowl:", err);
      alert("Failed to save bowl");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-green-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
          <button onClick={fetchBowls} className="ml-2 underline">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="hidden md:block text-2xl sm:text-3xl font-bold">Fruit Bowl Menu</h1>
          <p className="hidden md:block text-slate-500">Manage ready-made fruit bowl offerings</p>
        </div>
        <Card onClick={() => setAddingBowl(true)} className="flex items-center justify-center gap-3 p-4 border-2 border-dashed border-slate-300 hover:border-green-400 cursor-pointer bg-green-50">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-xl text-green-600">+</div>
          <div><h3 className="font-semibold">Add New Bowl</h3><p className="text-xs text-slate-500">Create a new bowl</p></div>
        </Card>
      </motion.div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
        <Card className="p-4 sm:p-6 text-center"><p className="text-sm text-slate-600 mb-1">Total Bowls</p><h3 className="text-2xl sm:text-3xl font-bold">{bowls.length}</h3></Card>
        <Card className="p-4 sm:p-6 text-center"><p className="text-sm text-slate-600 mb-1">Available</p><h3 className="text-2xl sm:text-3xl font-bold text-green-600">{bowls.filter(b => b.available).length}</h3></Card>
        <Card className="p-4 sm:p-6 text-center"><p className="text-sm text-slate-600 mb-1">Unavailable</p><h3 className="text-2xl sm:text-3xl font-bold text-orange-600">{bowls.filter(b => !b.available).length}</h3></Card>
        <Card className="p-4 sm:p-6 text-center"><p className="text-sm text-slate-600 mb-1">Avg Price</p><h3 className="text-2xl sm:text-3xl font-bold">₹{(bowls.reduce((s, b) => s + b.price, 0) / bowls.length).toFixed(2)}</h3></Card>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {bowls.map((bowl, i) => (
          <ProductCard 
            key={bowl.id} 
            bowl={bowl} 
            onEdit={setEditingBowl} 
            onDelete={deleteBowl} 
            onToggleAvailability={toggleAvailability}
            bestSellerCount={bestSellerCount}
          />
        ))}
      </div>
      {editingBowl && <BowlForm bowl={editingBowl} onSave={saveBowl} onCancel={() => setEditingBowl(null)} />}
      {addingBowl && <BowlForm onSave={saveBowl} onCancel={() => setAddingBowl(false)} />}
    </div>
  );
}
