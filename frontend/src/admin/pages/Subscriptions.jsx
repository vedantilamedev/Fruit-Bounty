import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Pause, Play, Users, Calendar, CreditCard } from "lucide-react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "https://fruit-bounty-dmzs.onrender.com/api";

const Subscriptions = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ----------------------------
  // FETCH SUBSCRIPTIONS FROM BACKEND
  // ----------------------------
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token"); // Admin JWT token
        const { data } = await axios.get(
          `/api/admin/subscriptions`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log("Subscriptions data received:", data);

        // Map backend data to frontend structure
        setSubscribers(
          data.data.map((s) => ({
            id: s._id,
            customerName: s.customer?.name || "Unknown",
            planType: s.plan || "Individual",
            duration: s.duration || "1 Month",
            deliveryDays: s.deliveryDays || "Mon, Wed, Fri",
            totalDays: s.daysRemaining || 0,
            totalAmount: s.amount || 0,
            status: s.status || "Active",
            startDate: s.start_date,
            endDate: s.end_date
          }))
        );
        setError(null);
      } catch (err) {
        console.error("Error fetching subscriptions:", err.response?.data || err.message);
        setError(err.response?.data?.message || "Failed to fetch subscriptions");
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  // ----------------------------
  // PAUSE / RESUME SUBSCRIPTION
  // ----------------------------
  const toggleSubscriberStatus = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.patch(
        `/api/admin/subscriptions/${id}/status`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        setSubscribers((prev) =>
          prev.map((s) => (s.id === id ? { ...s, status: data.subscription.status } : s))
        );
      } else {
        alert(data.message || "Failed to update subscription status");
      }
    } catch (err) {
      console.error("Error updating subscription status:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to update subscription status. Please try again.");
    }
  };

  // ----------------------------
  // CALCULATE STATS
  // ----------------------------
  const filteredSubscribers = filter === "All" ? subscribers : subscribers.filter((s) => s.planType === filter);
  const totalSubscribers = subscribers.length;
  const activeCount = subscribers.filter((s) => s.status === "Active").length;
  const pausedCount = subscribers.filter((s) => s.status === "Paused").length;
  const monthlyRevenue = subscribers.filter((s) => s.status === "Active").reduce((acc, s) => acc + s.totalAmount, 0);

  // ----------------------------
  // JSX RENDER
  // ----------------------------
  
  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 lg:space-y-8">
        <div>
          <h1 className="hidden md:block text-2xl sm:text-3xl font-bold text-gray-800">Subscription Management</h1>
          <p className="hidden md:block text-gray-500 text-sm">Monitor dynamic user subscriptions & delivery schedules</p>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 lg:space-y-8">
        <div>
          <h1 className="hidden md:block text-2xl sm:text-3xl font-bold text-gray-800">Subscription Management</h1>
          <p className="hidden md:block text-gray-500 text-sm">Monitor dynamic user subscriptions & delivery schedules</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 lg:space-y-8">
      <div>
        <h1 className="hidden md:block text-2xl sm:text-3xl font-bold text-gray-800">Subscription Management</h1>
        <p className="hidden md:block text-gray-500 text-sm">Monitor dynamic user subscriptions & delivery schedules</p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {[
          { label: "Total Subscribers", value: totalSubscribers, icon: <Users className="w-5 h-5 text-green-600" /> },
          { label: "Active", value: activeCount, icon: <Calendar className="w-5 h-5 text-blue-600" /> },
          { label: "Paused", value: pausedCount, icon: <Pause className="w-5 h-5 text-yellow-600" /> },
          { label: "Revenue", value: `₹${monthlyRevenue}`, icon: <CreditCard className="w-5 h-5 text-green-600" /> }
        ].map((card, i) => (
          <motion.div key={i} whileHover={{ y: -5, scale: 1.03 }} className="bg-white rounded-xl shadow p-3 sm:p-4 flex flex-col items-center justify-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-green-100 mb-2 sm:mb-3">{card.icon}</div>
            <p className="text-xs sm:text-sm text-gray-500">{card.label}</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-800">{card.value}</p>
          </motion.div>
        ))}
      </div>

      {/* TABLE SECTION */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h2 className="text-lg font-semibold">Active Subscriptions</h2>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="border rounded-lg p-2 text-sm w-full sm:w-auto">
            <option value="All">All Plans</option>
            <option value="Individual">Individual</option>
            <option value="Corporate">Corporate</option>
          </select>
        </div>

        {/* MOBILE VIEW */}
<div className="block lg:hidden space-y-3">
  {filteredSubscribers.map((s, i) => (
    <motion.div
      key={s.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: i * 0.05 }}
      className="bg-white border rounded-xl shadow p-4 space-y-3"
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="font-bold text-gray-900">{s.customerName}</p>
          <p className="text-xs text-gray-500">{s.id}</p>
        </div>
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            s.status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {s.status}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">{s.planType}</span>
        <span className="text-xs text-gray-600">{s.duration}</span>
      </div>
      <div className="flex justify-between items-center text-xs text-gray-600">
        <span>₹{s.totalAmount}</span>
        <button
          onClick={() => toggleSubscriberStatus(s.id)}
          className={`px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1 ${
            s.status === "Active" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"
          }`}
        >
          {s.status === "Active" ? (
            <>
              <Pause className="w-3 h-3" /> Pause
            </>
          ) : (
            <>
              <Play className="w-3 h-3" /> Resume
            </>
          )}
        </button>
      </div>
    </motion.div>
  ))}
</div>

        {/* DESKTOP TABLE */}
        <div className="hidden lg:block bg-white border rounded-xl shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left text-sm font-semibold">Customer</th>
                <th className="px-3 py-2 text-left text-sm font-semibold">Plan</th>
                <th className="px-3 py-2 text-left text-sm font-semibold">Duration</th>
                <th className="px-3 py-2 text-left text-sm font-semibold">Delivery Days</th>
                <th className="px-3 py-2 text-left text-sm font-semibold">Days</th>
                <th className="px-3 py-2 text-left text-sm font-semibold">Amount</th>
                <th className="px-3 py-2 text-left text-sm font-semibold">Status</th>
                <th className="px-3 py-2 text-left text-sm font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredSubscribers.map((s, i) => (
             <motion.tr
  key={s.id}
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: i * 0.05 }}
  className="hover:bg-gray-50"
>
  <td className="px-3 py-2 text-sm">{s.customerName}</td>
  <td className="px-3 py-2 text-sm">
    <span className="bg-gray-100 px-2 py-1 rounded-full">{s.planType}</span>
  </td>
  <td className="px-3 py-2 text-sm font-semibold">{s.duration}</td>
  <td className="px-3 py-2 text-sm">{s.deliveryDays}</td>
  <td className="px-3 py-2 text-sm">{s.totalDays}</td>
  <td className="px-3 py-2 text-sm font-semibold text-green-600">₹{s.totalAmount}</td>
  <td className="px-3 py-2 text-sm">
    <span
      className={`px-2 py-1 rounded-full text-xs ${
        s.status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
      }`}
    >
      {s.status}
    </span>
  </td>
  <td className="px-3 py-2">
    <button
      onClick={() => toggleSubscriberStatus(s.id)}
      className={`px-3 py-1 rounded text-xs font-medium flex items-center gap-1 ${
        s.status === "Active" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"
      }`}
    >
      {s.status === "Active" ? (
        <>
          <Pause className="w-3 h-3" /> Pause
        </>
      ) : (
        <>
          <Play className="w-3 h-3" /> Resume
        </>
      )}
    </button>
  </td>
</motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;