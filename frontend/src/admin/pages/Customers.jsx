import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Search, Mail, Phone, MapPin, ShoppingBag, X, Eye } from "lucide-react";
import { Users, UserPlus, Briefcase, TrendingUp } from "lucide-react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "https://fruit-bounty-dmzs.onrender.com/api";

/* ----------------- Utility ----------------- */
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/* ----------------- Badge ----------------- */
function Badge({ children, variant = "default", className }) {
  const variants = {
    default: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    green: "bg-green-50 text-green-600 border-green-200",
    purple: "bg-purple-50 text-purple-600 border-purple-200",
    blue: "bg-blue-50 text-blue-600 border-blue-200",
  };
  return (
    <span className={cn("inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0", variants[variant], className)}>
      {children}
    </span>
  );
}

/* ----------------- Card ----------------- */
function Card({ children, className }) {
  return (
    <motion.div whileHover={{ y: -2, boxShadow: "0 8px 20px rgba(0,0,0,0.08)" }} className={cn("bg-white text-gray-800 flex flex-col gap-4 rounded-xl border shadow-sm transition-all", className)}>
      {children}
    </motion.div>
  );
}

/* ----------------- Input ----------------- */
function Input({ className, ...props }) {
  return (
    <input className={cn("border rounded-md px-3 py-2 w-full text-sm focus:outline-none focus:ring focus:ring-green-300", className)} {...props} />
  );
}

/* ----------------- Button ----------------- */
function Button({ children, variant = "default", size = "default", className, ...props }) {
  const variants = {
    default: "bg-green-600 text-white hover:bg-green-700",
    outline: "border border-green-600 text-green-600 hover:bg-green-50",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    ghost: "bg-transparent hover:bg-gray-100",
  };
  const sizes = { default: "h-9 px-4", sm: "h-8 px-3 text-sm", lg: "h-10 px-6" };
  return (
    <button className={cn("rounded-md font-medium transition flex items-center justify-center gap-1", variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}

/* ----------------- Main Component ----------------- */
export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [modalCustomer, setModalCustomer] = useState(null);

  // Fetch customers from backend
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token"); // Admin token
        const { data } = await axios.get(`${BASE_URL}/admin/customers`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const mappedCustomers = data.data.map(c => ({
          id: c._id,
          name: c.name,
          email: c.email,
          phone: c.phone || "-",
          address: c.address || "-",
          type: c.type || "Regular",
          totalOrders: c.totalOrders || 0,
          totalSpent: c.totalSpent || 0,
          subscriptionMonths: c.subscriptionMonths || 0,
          joinDate: new Date(c.createdAt).toLocaleDateString()
        }));
        setCustomers(mappedCustomers);
      } catch (err) {
        console.error("Error fetching customers:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter(
    (c) => 
      (c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (typeFilter === "all" || c.type === typeFilter)
  );

  if (loading) return <p className="p-4 text-center text-gray-500">Loading customers...</p>;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 sm:mb-8">
        <h1 className="hidden md:block text-2xl sm:text-3xl font-bold text-gray-900">Customers</h1>
        <p className="hidden md:block text-gray-500">Manage your customer database</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <Card className="p-3 sm:p-4 flex flex-col items-center text-center">
          <Users className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 mb-2" />
          <p className="text-xs sm:text-sm text-gray-600 mb-1">Total Customers</p>
          <h3 className="text-xl sm:text-2xl font-bold">{customers.length}</h3>
        </Card>
        <Card className="p-3 sm:p-4 flex flex-col items-center text-center">
          <UserPlus className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mb-2" />
          <p className="text-xs sm:text-sm text-gray-600 mb-1">Subscribers</p>
          <h3 className="text-xl sm:text-2xl font-bold text-green-600">{customers.filter((c) => c.type === "Subscriber").length}</h3>
        </Card>
        <Card className="p-3 sm:p-4 flex flex-col items-center text-center">
          <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500 mb-2" />
          <p className="text-xs sm:text-sm text-gray-600 mb-1">Corporate</p>
          <h3 className="text-xl sm:text-2xl font-bold text-purple-600">{customers.filter((c) => c.type === "Corporate").length}</h3>
        </Card>
        <Card className="p-3 sm:p-4 flex flex-col items-center text-center">
          <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 mb-2" />
          <p className="text-xs sm:text-sm text-gray-600 mb-1">Avg Value</p>
          <h3 className="text-xl sm:text-2xl font-bold text-green-600">₹{(customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.length).toFixed(0)}</h3>
        </Card>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 z-10" />
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 sm:pl-11 pr-3 py-2 border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-300"
          />
        </div>
        <div className="w-full sm:w-48 lg:w-60">
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-300 text-sm">
            <option value="all">All Types</option>
            <option value="Subscriber">Subscriber</option>
            <option value="Regular">Regular</option>
            <option value="Corporate">Corporate</option>
          </select>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="block lg:hidden space-y-3 mb-4">
        {filteredCustomers.map((c) => (
          <Card key={c.id} className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="min-w-0 flex-1">
                <p className="font-bold text-gray-900 truncate">{c.name}</p>
                <p className="text-xs text-gray-500">{c.id}</p>
              </div>
              <Badge className={c.type === "Subscriber" ? "bg-green-50 text-green-600 border-green-200 ml-2" : c.type === "Corporate" ? "bg-purple-50 text-purple-600 border-purple-200 ml-2" : "bg-blue-50 text-blue-600 border-blue-200 ml-2"}>
                {c.type}
              </Badge>
            </div>
            <div className="text-xs text-gray-600 space-y-1 mb-3">
              <p className="flex items-center gap-1 truncate"><Mail className="w-3 h-3 flex-shrink-0" /> {c.email}</p>
              <p className="flex items-center gap-1"><Phone className="w-3 h-3 flex-shrink-0" /> {c.phone}</p>
            </div>
            <div className="flex justify-between items-center pt-2 border-t">
              <div className="flex gap-3 text-xs">
                <span className="text-gray-500">{c.totalOrders} orders</span>
                <span className="font-semibold text-green-600">₹{c.totalSpent.toFixed(2)}</span>
              </div>
              <Button variant="outline" size="sm" onClick={() => setModalCustomer(c)} className="text-xs h-8">
                <Eye className="w-3 h-3" /> <span className="hidden sm:inline">View</span>
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Desktop Table View */}
      <Card className="hidden lg:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-3 py-2 font-semibold text-gray-700">Customer</th>
              <th className="text-left px-3 py-2 font-semibold text-gray-700">Contact</th>
              <th className="text-left px-3 py-2 font-semibold text-gray-700">Address</th>
              <th className="text-left px-3 py-2 font-semibold text-gray-700">Type</th>
              <th className="text-left px-3 py-2 font-semibold text-gray-700">Orders</th>
              <th className="text-left px-3 py-2 font-semibold text-gray-700">Spent</th>
              <th className="text-left px-3 py-2 font-semibold text-gray-700">Joined</th>
              <th className="text-left px-3 py-2 font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50 border-t">
                <td className="px-3 py-2">
                  <p className="font-medium">{c.name}</p>
                  <p className="text-xs text-gray-500">{c.id}</p>
                </td>
                <td className="px-3 py-2">
                  <p className="flex items-center gap-1 text-sm"><Mail className="w-3 h-3" /> {c.email}</p>
                  <p className="flex items-center gap-1 text-sm"><Phone className="w-3 h-3" /> {c.phone}</p>
                </td>
                <td className="px-3 py-2 max-w-xs">
                  <p className="flex items-start gap-1 text-sm"><MapPin className="w-3 h-3 mt-0.5" /> {c.address}</p>
                </td>
                <td className="px-3 py-2">
                  <Badge className={c.type === "Subscriber" ? "bg-green-50 text-green-600 border-green-200" : c.type === "Corporate" ? "bg-purple-50 text-purple-600 border-purple-200" : "bg-blue-50 text-blue-600 border-blue-200"}>
                    {c.type}
                  </Badge>
                </td>
                <td className="px-3 py-2">
                  <div className="flex items-center gap-1"><ShoppingBag className="w-4 h-4 text-gray-400" /> {c.totalOrders}</div>
                </td>
                <td className="px-3 py-2 font-semibold text-green-600">₹{c.totalSpent.toFixed(2)}</td>
                <td className="px-3 py-2 text-sm">{c.joinDate}</td>
                <td className="px-3 py-2">
                  <Button variant="outline" size="sm" onClick={() => setModalCustomer(c)}>View Details</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Modal */}
      {modalCustomer && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={(e) => { if (e.target === e.currentTarget) setModalCustomer(null); }}>
          <Card className="max-w-md w-full p-4 sm:p-6 relative max-h-[90vh] overflow-y-auto">
            <Button variant="ghost" size="sm" className="absolute top-2 right-2 text-gray-500 h-8 w-8 p-0" onClick={() => setModalCustomer(null)}>
              <X />
            </Button>
            <h2 className="text-lg sm:text-xl font-bold mb-2 pr-8">{modalCustomer.name}</h2>
            <p className="text-xs sm:text-sm text-gray-500 mb-1">ID: {modalCustomer.id}</p>
            <p className="text-xs sm:text-sm text-gray-500 mb-1 flex items-center gap-1"><Mail className="w-3 h-3" /> {modalCustomer.email}</p>
            <p className="text-xs sm:text-sm text-gray-500 mb-1 flex items-center gap-1"><Phone className="w-3 h-3" /> {modalCustomer.phone}</p>
            <p className="text-xs sm:text-sm text-gray-500 mb-1 flex items-center gap-1"><MapPin className="w-3 h-3" /> {modalCustomer.address}</p>
            <p className="text-xs sm:text-sm text-gray-500 mb-1">Type: {modalCustomer.type}</p>
            {modalCustomer.type === "Subscriber" && <p className="text-xs sm:text-sm text-gray-500 mb-1">Subscription: {modalCustomer.subscriptionMonths} months</p>}
            <p className="text-xs sm:text-sm text-gray-500 mb-1">Total Orders: {modalCustomer.totalOrders}</p>
            <p className="text-xs sm:text-sm text-gray-500 mb-1">Total Spent: ₹{modalCustomer.totalSpent.toFixed(2)}</p>
            <p className="text-xs sm:text-sm text-gray-500">Joined: {modalCustomer.joinDate}</p>
          </Card>
        </div>
      )}
    </div>
  );
}