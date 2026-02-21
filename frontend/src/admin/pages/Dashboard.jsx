import { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  AlertCircle,
  Clock,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// ---------------- DATA ----------------

const revenueData = {
  daily: [
    { name: "Mon", revenue: 4200 },
    { name: "Tue", revenue: 5100 },
    { name: "Wed", revenue: 4800 },
    { name: "Thu", revenue: 6200 },
    { name: "Fri", revenue: 7500 },
    { name: "Sat", revenue: 8900 },
    { name: "Sun", revenue: 7200 },
  ],
  weekly: [
    { name: "W1", revenue: 28000 },
    { name: "W2", revenue: 32000 },
    { name: "W3", revenue: 35000 },
    { name: "W4", revenue: 42580 },
  ],
  monthly: [
    { name: "Jan", revenue: 98000 },
    { name: "Feb", revenue: 112000 },
    { name: "Mar", revenue: 125000 },
    { name: "Apr", revenue: 145000 },
    { name: "May", revenue: 162000 },
  ],
  total: [
    { name: "Jan", revenue: 98000 },
    { name: "Feb", revenue: 210000 },
    { name: "Mar", revenue: 335000 },
    { name: "Apr", revenue: 480000 },
    { name: "May", revenue: 642580 },
  ],
};

const peakOrderTimes = [
  { time: "9 AM", orders: 20 },
  { time: "12 PM", orders: 55 },
  { time: "3 PM", orders: 42 },
  { time: "6 PM", orders: 70 },
  { time: "9 PM", orders: 48 },
];

const bestSellingBowls = [
  { name: "Tropical Blast", orders: 145 },
  { name: "Berry Mix", orders: 132 },
  { name: "Green Detox", orders: 118 },
  { name: "Protein Bowl", orders: 95 },
  { name: "Classic Combo", orders: 80 },
];

const orderTypePie = [
  { name: "Normal", value: 55, count: 180 },
  { name: "Subscription", value: 30, count: 98 },
  { name: "Corporate", value: 15, count: 46 },
];

const COLORS = ["#22c55e", "#3b82f6", "#f97316", "#16a34a", "#86efac"];

const metrics = [
  {
    title: "Total Orders",
    value: "324",
    change: "+12.5%",
    trend: "up",
    icon: ShoppingCart,
  },
  {
    title: "Revenue",
    value: "₹42,580",
    change: "+18.2%",
    trend: "up",
    icon: TrendingUp,
  },
  {
    title: "Out of Stock",
    value: "8",
    change: "-3",
    trend: "down",
    icon: AlertCircle,
  },
  {
    title: "Pending Orders",
    value: "67",
    change: "+5",
    trend: "up",
    icon: Clock,
  },
];

// ---------------- COMPONENT ----------------

export default function Dashboard() {
  const [revenueView, setRevenueView] = useState("daily");

  return (
    <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6 bg-gray-50 min-h-screen">

      {/* PAGE HEADING */}
      <div>
        <h1 className="hidden md:block text-2xl sm:text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="hidden md:block text-sm text-gray-500">Overview of your business performance</p>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
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

            <ResponsiveContainer width="100%" height={250} >
              <LineChart data={revenueData[revenueView]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#427A43" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="bg-white p-4 sm:p-6 rounded-xl border shadow-sm">
            <h3 className="font-semibold text-lg mb-4">Peak Order Times</h3>

            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={peakOrderTimes}>
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

      {/* BEST SELLING + PIE CHART */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">

        {/* Best Selling */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="bg-white p-4 sm:p-6 rounded-xl border shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Best Selling Bowl Combos</h3>

            <div className="space-y-3 sm:space-y-4">
              {bestSellingBowls.map((bowl, index) => (
                <div key={index} className="flex items-center gap-3 sm:gap-4">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green-100 flex items-center justify-center font-bold text-green-600 text-xs sm:text-sm">
                    {index + 1}
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-medium">{bowl.name}</p>
                    <div className="w-full bg-gray-100 h-2 rounded-full mt-1 sm:mt-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(bowl.orders / 145) * 100}%` }}
                        transition={{ duration: 1 }}
                        className="h-2 rounded-full"
                        style={{ background: "#22c55e" }}
                      />
                    </div>
                  </div>

                  <span className="font-semibold text-sm">{bowl.orders}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Pie Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="bg-white p-4 sm:p-6 rounded-xl border shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Order Type Distribution</h3>

            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={orderTypePie}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  dataKey="value"
                  fontSize={12}
                >
                  {orderTypePie.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <div className="mt-3 sm:mt-4 space-y-2">
              {orderTypePie.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
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
