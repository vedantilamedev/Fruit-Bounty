import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Truck, Clock, MapPin, Phone, X, Filter, Edit2 } from "lucide-react";
import axios from "axios";

/* ======================
   API Configuration
====================== */
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "https://fruit-bounty-dmzs.onrender.com/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/* ======================
   Utility
====================== */
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/* ======================
   UI Components
====================== */
function Card({ className, ...props }) {
  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: "0 8px 20px rgba(0,0,0,0.08)" }}
      className={cn("bg-white rounded-xl border shadow-sm transition-all", className)}
      {...props}
    />
  );
}

function Badge({ className, variant = "default", ...props }) {
  const variants = {
    default: "bg-black text-white",
    secondary: "bg-gray-100 text-gray-700",
    outline: "border text-gray-700",
    green: "bg-green-100 text-green-700",
    purple: "bg-purple-100 text-purple-700",
    blue: "bg-blue-100 text-blue-700",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-md",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

function Button({ className, variant = "default", size = "default", ...props }) {
  const base =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition";

  const variants = {
    default: "bg-black text-white hover:bg-black/80",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
  };

  const sizes = {
    default: "h-9 px-4",
    sm: "h-8 px-3 text-xs",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
    </div>
  );
}

/* ======================
   Main Component
====================== */
export default function TomorrowDeliveries() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("all");
  const [editingTime, setEditingTime] = useState(null);
  const [customTime, setCustomTime] = useState("");
  const [deliveryData, setDeliveryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch deliveries from API
  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await api.get("/delivery");
        setDeliveryData(data);
      } catch (err) {
        console.error("Failed to fetch deliveries:", err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDeliveries();
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selected) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selected]);

  // Filter deliveries - also filter out empty objects and invalid entries
  const filteredDeliveries = (deliveryData || [])
    .filter(d => d && typeof d === 'object' && Object.keys(d).length > 0)
    .filter((d) => {
      // Validate delivery has required fields
      if (!d.id || !d.customer) return false;
      if (filter === "all") return true;
      if (filter === "subscription") return d.type === "Subscription";
      if (filter === "corporate") return d.type === "Corporate";
      if (filter === "normal") return d.type === "Normal";
      return true;
    });

  // Update delivery time (placeholder - would need backend endpoint)
  const handleTimeUpdate = (id) => {
    if (customTime.trim()) {
      setDeliveryData(deliveryData.map(d => 
        d.id === id ? { ...d, time: customTime } : d
      ));
    }
    setEditingTime(null);
    setCustomTime("");
  };

  // Get stats based on filter
  const stats = {
    total: filteredDeliveries.length,
    bowls: filteredDeliveries.reduce((sum, d) => sum + (d.bowlsDetail?.length || 0), 0),
    subscription: filteredDeliveries.filter(d => d.type === "Subscription").length,
    corporate: filteredDeliveries.filter(d => d.type === "Corporate").length,
    normal: filteredDeliveries.filter(d => d.type === "Normal").length,
  };

  if (loading) {
    return (
      <div className="p-4 sm:p-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 sm:p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
          Error loading deliveries: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 sm:mb-8">
        <h1 className="hidden md:block text-2xl sm:text-3xl font-bold">Tomorrow's Deliveries</h1>
        <p className="hidden md:block text-gray-500">Scheduled deliveries</p>
      </motion.div>

      {/* Filter Dropdown */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex items-center gap-2 bg-white rounded-lg border p-2">
          <Filter size={18} className="text-gray-500" />
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-transparent text-sm font-medium outline-none cursor-pointer"
          >
            <option value="all">All Deliveries</option>
            <option value="subscription">Subscription</option>
            <option value="corporate">Corporate</option>
            <option value="normal">Normal</option>
          </select>
        </div>
        
        <div className="flex gap-2 text-sm">
          <span className="text-gray-500">Showing:</span>
          <span className="font-medium">{filteredDeliveries.length} deliveries</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <Truck className="text-blue-600" />
            <p className="text-sm text-gray-600">Total Deliveries</p>
          </div>
          <h3 className="text-3xl font-bold">{stats.total}</h3>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-gray-600 mb-2">Total Bowls</p>
          <h3 className="text-3xl font-bold text-green-600">
            {(deliveryData || []).reduce((sum, d) => sum + (d.bowlsDetail?.length || 0), 0)}
          </h3>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-gray-600 mb-2">Corporate</p>
          <h3 className="text-3xl font-bold text-purple-600">
            {deliveryData.filter((d) => d.type === "Corporate").length}
          </h3>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-gray-600 mb-2">Subscriptions</p>
          <h3 className="text-3xl font-bold text-orange-600">
            {deliveryData.filter((d) => d.type === "Subscription").length}
          </h3>
        </Card>
      </div>

      {/* Timeline */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-6">Delivery Schedule</h3>

        <div className="space-y-4">
          {filteredDeliveries.map((delivery, index) => (
            <motion.div
              key={delivery.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -2, boxShadow: "0 8px 20px rgba(0,0,0,0.08)" }}
              className="flex gap-4 p-4 rounded-xl bg-gray-50 border transition-all"
            >
              <div className="flex flex-col items-center min-w-[80px]">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Clock className="text-green-600" />
                </div>
                
                {/* Time Editor */}
                {editingTime === delivery.id ? (
                  <div className="mt-2 flex flex-col items-center gap-1">
                    <input
                      type="text"
                      value={customTime}
                      onChange={(e) => setCustomTime(e.target.value)}
                      placeholder="e.g. 8:15 AM"
                      className="text-xs border-2 border-green-400 rounded px-2 py-1 w-20 text-center"
                      autoFocus
                    />
                    <div className="flex gap-1">
                      <button 
                        onClick={() => handleTimeUpdate(delivery.id)}
                        className="text-xs bg-green-500 text-white px-2 py-0.5 rounded hover:bg-green-600"
                      >
                        ✓
                      </button>
                      <button 
                        onClick={() => { setEditingTime(null); setCustomTime(""); }}
                        className="text-xs bg-gray-300 text-gray-600 px-2 py-0.5 rounded hover:bg-gray-400"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-2 flex items-center gap-1">
                    <p className="text-sm font-semibold">{String(delivery.time || 'N/A')}</p>
                    <button 
                      onClick={() => { setEditingTime(delivery.id); setCustomTime(delivery.time); }}
                      className="p-0.5 hover:bg-gray-200 rounded"
                    >
                      <Edit2 size={10} />
                    </button>
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex justify-between mb-2 flex-wrap sm:flex-nowrap gap-2">
                  <div>
                    <h4 className="font-semibold">{String(delivery.customer || 'Unknown')}</h4>
                    <p className="flex items-center gap-1 text-sm text-gray-600">
                      <Phone size={14} /> {String(delivery.phone || 'N/A')}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 items-start sm:items-end">
                    <Badge variant={delivery.type === "Subscription" ? "purple" : delivery.type === "Corporate" ? "blue" : "secondary"}>
                      {String(delivery.type || 'Normal')}
                    </Badge>
                    <Badge variant="secondary">
                      {delivery.bowlsDetail?.length || 0} bowl{delivery.bowlsDetail?.length > 1 ? "s" : ""}
                    </Badge>
                  </div>
                </div>

                <p className="flex gap-1 text-sm text-gray-600 mb-3">
                  <MapPin size={14} /> {String(delivery.address || 'N/A')}
                </p>

                <Button size="sm" variant="outline" onClick={() => setSelected(delivery)}>
                  View Details
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Drawer - Fancy Colorful View Details */}
      {selected && (
        <div 
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setSelected(null); }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl w-full max-w-md shadow-xl relative max-h-[90vh] flex flex-col"
          >
            {/* Colorful Header */}
            <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 p-4 text-white flex-shrink-0">
              <button 
                onClick={() => setSelected(null)} 
                className="absolute top-3 right-3 p-1.5 bg-white/20 rounded-full hover:bg-white/30"
              >
                <X size={18} />
              </button>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Truck size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold">Delivery Details</h2>
                  <p className="text-white/80 text-xs">{selected.id}</p>
                </div>
              </div>
            </div>

            {/* Content - Scrollable */}
            <div className="p-4 overflow-y-auto flex-1">
              {/* Customer Info */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-3 mb-3 border border-purple-100">
                <h3 className="font-bold text-purple-800 mb-2 text-sm">👤 Customer Info</h3>
                <div className="space-y-1.5 text-xs">
                  <InfoRow label="Name" value={String(selected.customer || 'Unknown')} />
                  <InfoRow label="Phone" value={String(selected.phone || 'N/A')} />
                  <InfoRow label="Address" value={String(selected.address || 'N/A')} />
                </div>
              </div>

              {/* Order Details */}
              <div className="flex gap-2 mb-3">
                <div className="flex-1 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-3 border border-blue-100">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Clock size={14} className="text-blue-600" />
                    <span className="text-xs text-blue-600 font-medium">Time</span>
                  </div>
                  <p className="font-bold text-blue-800 text-sm">{String(selected.time || 'N/A')}</p>
                </div>
                <div className="flex-1 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-3 border border-orange-100">
                  <span className="text-xs text-orange-600 font-medium">Type</span>
                  <p className="font-bold text-orange-800 text-sm">{String(selected.type || 'Normal')}</p>
                </div>
              </div>

              {/* Bowls Detail - Colorful Cards */}
              <div className="mb-3">
                <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2 text-sm">
                  <span>🍽️</span> Bowls & Fruits
                  <span className="text-xs font-normal text-gray-500">
                    ({selected.bowlsDetail?.length || 0})
                  </span>
                </h3>
                
                <div className="space-y-2">
                  {(selected.bowlsDetail || []).map((bowl, idx) => (
                    <div 
                      key={idx} 
                      className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-3 border border-green-200"
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-base">🥗</span>
                        <span className="font-bold text-green-800 text-sm">{bowl.name}</span>
                      </div>
                      
                      {/* Fruits */}
                      <div className="mb-1.5">
                        <span className="text-xs font-medium text-green-600">🍎 Fruits:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {(bowl.fruits || []).map((fruit, fIdx) => (
                            <span 
                              key={fIdx} 
                              className="bg-white text-green-700 text-xs px-2 py-0.5 rounded-full border border-green-200"
                            >
                              {fruit}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Toppings */}
                      <div>
                        <span className="text-xs font-medium text-amber-600">✨ Toppings:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {(bowl.toppings || []).map((topping, tIdx) => (
                            <span 
                              key={tIdx} 
                              className="bg-white text-amber-700 text-xs px-2 py-0.5 rounded-full border border-amber-200"
                            >
                              {topping}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-2 border border-green-200">
                <div className="flex items-center justify-between">
                  <span className="text-green-700 font-medium text-xs">Status</span>
                  <Badge variant="green">✓ {selected.status}</Badge>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-3 border-t bg-gray-50 flex-shrink-0">
              <Button className="w-full text-sm py-2" onClick={() => setSelected(null)}>
                Close
              </Button>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
}

/* ======================
   Info Row
====================== */
const InfoRow = ({ label, value }) => (
  <div className="flex justify-between text-sm">
    <span className="text-gray-500">{label}:</span>
    <span className="font-medium text-gray-800">{value}</span>
  </div>
);
