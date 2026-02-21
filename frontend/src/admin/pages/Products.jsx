import React, { useState } from "react";
import { motion } from "framer-motion";
import { Edit, Star, Trash2, X, Plus, ChevronLeft, ChevronRight } from "lucide-react";

function cn(...classes) { return classes.filter(Boolean).join(" "); }

function Card({ className, children, ...props }) { return <div className={cn("bg-white rounded-xl border shadow-sm", className)} {...props}>{children}</div>; }
function Badge({ className, children }) { return <span className={cn("px-2 py-1 rounded-md text-xs font-medium bg-green-50 text-green-700 border", className)}>{children}</span>; }
function Switch({ checked, onChange }) { return <button onClick={() => onChange(!checked)} className={cn("w-10 h-5 rounded-full transition", checked ? "bg-green-600" : "bg-gray-300")}><span className={cn("block w-4 h-4 bg-white rounded-full transition", checked ? "translate-x-5" : "translate-x-1")} /></button>; }

function BowlForm({ bowl, onSave, onCancel }) {
  const [name, setName] = useState(bowl?.name || "");
  const [description, setDescription] = useState(bowl?.description || "");
  const [price, setPrice] = useState(bowl?.price || "");
  const [ingredients, setIngredients] = useState(bowl?.ingredients?.join(", ") || "");
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

const MOCK_BOWLS = [
  { id: "1", name: "Tropical Paradise", description: "A refreshing mix of tropical fruits with coconut flakes", ingredients: ["Mango", "Pineapple", "Kiwi", "Coconut"], price: 15.99, available: true, salesCount: 145, images: [] },
  { id: "2", name: "Berry Bliss", description: "Mixed berries with banana and honey drizzle", ingredients: ["Strawberry", "Blueberry", "Raspberry", "Banana"], price: 14.99, available: true, salesCount: 128, images: [] },
  { id: "3", name: "Citrus Burst", description: "Zesty citrus fruits for vitamin C boost", ingredients: ["Orange", "Grapefruit", "Lemon", "Lime"], price: 13.99, available: true, salesCount: 98, images: [] },
  { id: "4", name: "Dragon Delight", description: "Exotic dragon fruit with tropical twist", ingredients: ["Dragon Fruit", "Papaya", "Mango", "Passion Fruit"], price: 18.99, available: true, salesCount: 87, images: [] },
  { id: "5", name: "Classic Mix", description: "Traditional fruit mix with fresh seasonal fruits", ingredients: ["Apple", "Banana", "Grapes", "Orange"], price: 12.99, available: true, salesCount: 76, images: [] },
  { id: "6", name: "Melon Medley", description: "Refreshing melon mix for hot summer days", ingredients: ["Watermelon", "Cantaloupe", "Honeydew"], price: 13.99, available: false, salesCount: 65, images: [] },
];

function ProductCard({ bowl, onEdit, onDelete, onToggleAvailability }) {
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
          {bowl.salesCount === Math.max(...MOCK_BOWLS.map(b => b.salesCount)) && <div className="absolute top-2 right-2 z-10"><Badge className="bg-yellow-400 text-yellow-900 flex items-center gap-1"><Star className="w-3 h-3" />Best Seller</Badge></div>}
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
  const [bowls, setBowls] = useState(MOCK_BOWLS);
  const [editingBowl, setEditingBowl] = useState(null);
  const [addingBowl, setAddingBowl] = useState(false);
  const bestSellerCount = Math.max(...bowls.map(b => b.salesCount));
  const toggleAvailability = id => setBowls(bowls.map(b => b.id === id ? { ...b, available: !b.available } : b));
  const deleteBowl = (id) => {
    if (window.confirm("Are you sure you want to delete this bowl?")) {
      setBowls(bowls.filter(b => b.id !== id));
    }
  };
  const saveBowl = (id, updated) => { setBowls(id ? bowls.map(b => b.id === id ? { ...b, ...updated } : b) : [{ id: Date.now().toString(), salesCount: 0, ...updated }, ...bowls]); setEditingBowl(null); setAddingBowl(false); };

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
          />
        ))}
      </div>
      {editingBowl && <BowlForm bowl={editingBowl} onSave={saveBowl} onCancel={() => setEditingBowl(null)} />}
      {addingBowl && <BowlForm onSave={saveBowl} onCancel={() => setAddingBowl(false)} />}
    </div>
  );
}
