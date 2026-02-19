import React, { useState } from "react";
import { motion } from "motion/react";
import { Edit, Star } from "lucide-react";

/* ------------------- Utilities ------------------- */
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/* ------------------- ImageWithFallback ------------------- */
const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';

function ImageWithFallback({ src, alt, className, style, ...rest }) {
  const [didError, setDidError] = useState(false);
  const handleError = () => setDidError(true);

  return didError ? (
    <div className={`inline-block bg-gray-100 text-center align-middle ${className ?? ""}`} style={style}>
      <div className="flex items-center justify-center w-full h-full">
        <img src={ERROR_IMG_SRC} alt="Error loading image" {...rest} data-original-url={src} />
      </div>
    </div>
  ) : (
    <img src={src} alt={alt} className={className} style={style} {...rest} onError={handleError} />
  );
}

/* ------------------- Card ------------------- */
function Card({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "bg-white text-gray-800 flex flex-col gap-4 rounded-xl border shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* ------------------- Button ------------------- */
function Button({ className, children, ...props }) {
  return (
    <button
      className={cn(
        "inline-flex items-center gap-2 rounded-md bg-green-600 text-white text-sm font-medium px-4 py-2 hover:bg-green-700 transition-all",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

/* ------------------- Badge ------------------- */
function Badge({ className, children }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium bg-green-50 text-green-700 border-green-200",
        className
      )}
    >
      {children}
    </span>
  );
}

/* ------------------- Switch ------------------- */
function Switch({ checked, onChange, className }) {
  return (
    <button
      className={cn(
        "relative inline-flex h-5 w-10 items-center rounded-full bg-gray-300 transition-all",
        checked ? "bg-green-600" : "",
        className
      )}
      onClick={() => onChange(!checked)}
    >
      <span
        className={cn(
          "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
          checked ? "translate-x-5" : "translate-x-1"
        )}
      />
    </button>
  );
}

/* ------------------- Modal Form ------------------- */
function BowlForm({ bowl, onSave, onCancel }) {
  const [name, setName] = useState(bowl?.name || "");
  const [price, setPrice] = useState(bowl?.price || "");
  const [ingredients, setIngredients] = useState(bowl?.ingredients?.join(", ") || "");
  const [available, setAvailable] = useState(bowl?.available ?? true);
  const [image, setImage] = useState(bowl?.image || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(bowl?.id, {
      name,
      price: parseFloat(price),
      ingredients: ingredients.split(",").map((i) => i.trim()),
      available,
      image,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{bowl ? "Edit Bowl" : "Add New Bowl"}</h2>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            className="border p-2 rounded"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="border p-2 rounded"
            placeholder="Price (₹)"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <input
            className="border p-2 rounded"
            placeholder="Ingredients (comma separated)"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border p-2 rounded"
          />
          <div className="flex items-center gap-2">
            <Switch checked={available} onChange={setAvailable} />
            <span>Available</span>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button type="submit">Save</Button>
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex items-center gap-2 rounded-md bg-gray-300 text-gray-700 text-sm font-medium px-4 py-2 hover:bg-gray-400 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ------------------- Mock Data ------------------- */
const mockBowls = [
  { id: "1", name: "Tropical Paradise", ingredients: ["Mango", "Pineapple", "Kiwi", "Coconut"], price: 15.99, available: true, salesCount: 145, image: "" },
  { id: "2", name: "Berry Bliss", ingredients: ["Strawberry", "Blueberry", "Raspberry", "Banana"], price: 14.99, available: true, salesCount: 128, image: "" },
  { id: "3", name: "Citrus Burst", ingredients: ["Orange", "Grapefruit", "Lemon", "Lime"], price: 13.99, available: true, salesCount: 98, image: "" },
  { id: "4", name: "Dragon Delight", ingredients: ["Dragon Fruit", "Papaya", "Mango", "Passion Fruit"], price: 18.99, available: true, salesCount: 87, image: "" },
  { id: "5", name: "Classic Mix", ingredients: ["Apple", "Banana", "Grapes", "Orange"], price: 12.99, available: true, salesCount: 76, image: "" },
  { id: "6", name: "Melon Medley", ingredients: ["Watermelon", "Cantaloupe", "Honeydew"], price: 13.99, available: false, salesCount: 65, image: "" },
];

/* ------------------- Main Component ------------------- */
export default function FruitBowlMenu() {
  const [bowls, setBowls] = useState(mockBowls);
  const [editingBowl, setEditingBowl] = useState(null);
  const [addingBowl, setAddingBowl] = useState(false);

  const bestSellerCount = Math.max(...bowls.map((b) => b.salesCount));

  const toggleAvailability = (id) =>
    setBowls(bowls.map((b) => (b.id === id ? { ...b, available: !b.available } : b)));

  const saveBowl = (id, updated) => {
    if (id) {
      setBowls(bowls.map((b) => (b.id === id ? { ...b, ...updated } : b)));
    } else {
      setBowls([{ id: Date.now().toString(), salesCount: 0, ...updated }, ...bowls]);
    }
    setEditingBowl(null);
    setAddingBowl(false);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Fruit Bowl Menu</h1>
        <p className="text-slate-500">Manage ready-made fruit bowl offerings</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <p className="text-sm text-slate-600 mb-1">Total Bowls</p>
          <h3 className="text-3xl font-bold text-slate-800">{bowls.length}</h3>
        </Card>
        <Card className="p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <p className="text-sm text-slate-600 mb-1">Available</p>
          <h3 className="text-3xl font-bold text-green-600">{bowls.filter((b) => b.available).length}</h3>
        </Card>
        <Card className="p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <p className="text-sm text-slate-600 mb-1">Unavailable</p>
          <h3 className="text-3xl font-bold text-orange-600">{bowls.filter((b) => !b.available).length}</h3>
        </Card>
        <Card className="p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <p className="text-sm text-slate-600 mb-1">Avg Price</p>
          <h3 className="text-3xl font-bold text-slate-800">
            ₹{(bowls.reduce((sum, b) => sum + b.price, 0) / bowls.length).toFixed(2)}
          </h3>
        </Card>
      </div>

      {/* Bowl Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bowls.map((bowl, index) => (
          <motion.div
            key={bowl.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.05 }}
          >
            <Card className="overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="relative h-48 bg-gradient-to-br from-green-100 to-emerald-100 overflow-hidden">
                <ImageWithFallback
                  key={bowl.image} // <-- key added to force re-render when image changes
                  src={bowl.image || `https://source.unsplash.com/800x600/?${encodeURIComponent(bowl.name)}`}
                  alt={bowl.name}
                  className="w-full h-full object-cover"
                />
                {bowl.salesCount === bestSellerCount && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-yellow-400 text-yellow-900 border-yellow-500">
                      <Star className="w-3 h-3 mr-1 fill-yellow-900" />
                      Best Seller
                    </Badge>
                  </div>
                )}
                {!bowl.available && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge className="bg-white/90 text-slate-700">Unavailable</Badge>
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-lg text-slate-800 mb-1">{bowl.name}</h3>
                    <p className="text-sm text-slate-500">{bowl.salesCount} orders</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">₹{bowl.price}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs font-medium text-slate-600 mb-2">Ingredients:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {bowl.ingredients.map((ingredient) => (
                      <Badge key={ingredient}>{ingredient}</Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <div className="flex items-center gap-2">
                    <Switch checked={bowl.available} onChange={() => toggleAvailability(bowl.id)} />
                    <span className="text-sm text-slate-600">Available</span>
                  </div>
                  <Button onClick={() => setEditingBowl(bowl)}>
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}

        {/* Add New Bowl Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + bowls.length * 0.05 }}
        >
          <Card
            onClick={() => setAddingBowl(true)}
            className="h-full flex items-center justify-center p-6 border-2 border-dashed border-slate-300 hover:border-green-400 hover:bg-green-50/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600 text-3xl">
                +
              </div>
              <h3 className="font-semibold text-slate-700 mb-1">Add New Bowl</h3>
              <p className="text-sm text-slate-500">Create a new ready-made bowl</p>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Modals */}
      {editingBowl && <BowlForm bowl={editingBowl} onSave={saveBowl} onCancel={() => setEditingBowl(null)} />}
      {addingBowl && <BowlForm onSave={saveBowl} onCancel={() => setAddingBowl(false)} />}
    </div>
  );
}
