import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp, ShoppingCart, AlertCircle, Clock,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell,
} from "recharts";
import axios from "axios";

const COLORS = ["#22c55e", "#3b82f6", "#f97316", "#16a34a", "#86efac"];
const BASE_URL = import.meta.env.VITE_BASE_URL || "https://fruit-bounty-dmzs.onrender.com/api";

export default function Dashboard() {
  const [revenueView, setRevenueView] = useState("daily");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${BASE_URL}/admin/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data.data);
      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-gray-500 text-lg animate-pulse">Loading dashboard...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-red-500 text-lg">Failed to load dashboard data.</div>
      </div>
    );
  }

  const metrics = [
    {
      title: "Total Orders",
      value: data.metrics.totalOrders,
      icon: ShoppingCart,
    },
    {
      title: "Revenue",
      value: `₹${data.metrics.totalRevenue.toLocaleString("en-IN")}`,
      icon: TrendingUp,
    },
    {
      title: "Pending Orders",
      value: data.metrics.pendingOrders,
      icon: Clock,
    },
  ];

  return (
    <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6 bg-gray-50 min-h-screen">

      {/* HEADING */}
      <div>
        <h1 className="hidden md:block text-2xl sm:text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="hidden md:block text-sm text-gray-500">Overview of your business performance</p>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6">
        {metrics.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-xl p-4 sm:p-5 border shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">{item.title}</p>
                  <h2 className="text-2xl sm:text-3xl font-bold mt-1">{item.value}</h2>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#427A43] flex items-center justify-center">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* REVENUE + PEAK */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="bg-white p-4 sm:p-6 rounded-xl border shadow-sm">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
              <h3 className="font-semibold text-lg">Revenue Trend</h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {["daily", "weekly", "monthly", "total"].map((view) => (
                  <button
                    key={view}
                    onClick={() => setRevenueView(view)}
                    className={`px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm transition ${
                      revenueView === view
                        ? "bg-[#427A43] text-white"
                        : "border text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {view}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={data.revenueData[revenueView]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip formatter={(v) => `₹${v.toLocaleString("en-IN")}`} />
                <Line type="monotone" dataKey="revenue" stroke="#427A43" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="bg-white p-4 sm:p-6 rounded-xl border shadow-sm">
            <h3 className="font-semibold text-lg mb-4">Peak Order Times</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={data.peakOrderTimes}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="orders" fill="#FFE66D" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* PIE CHART */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="bg-white p-4 sm:p-6 rounded-xl border shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Order Type Distribution</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={data.orderTypeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  dataKey="value"
                  fontSize={12}
                >
                  {data.orderTypeDistribution.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-3 sm:mt-4 space-y-2">
              {data.orderTypeDistribution.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                    <span className="text-xs sm:text-sm text-slate-700">{item.name}</span>
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-700">{item.count} orders</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

    </div>
  );
}