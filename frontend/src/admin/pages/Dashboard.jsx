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
  AreaChart,
  Area,
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
};

const totalRevenueGrowth = [
  { name: "Jan", total: 98000 },
  { name: "Feb", total: 210000 },
  { name: "Mar", total: 335000 },
  { name: "Apr", total: 480000 },
  { name: "May", total: 642580 },
];

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

const COLORS = ["#22c55e", "#16a34a", "#4ade80", "#86efac", "#15803d"];

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
    <div className="p-4 md:p-6 space-y-6 bg-gray-50 min-h-screen">

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-xl p-5 border shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">{item.title}</p>
                  <h2 className="text-3xl font-bold mt-1">{item.value}</h2>

                  <div className="flex items-center gap-1 mt-2">
                    {item.trend === "up" ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                    <span
                      className={`text-sm font-medium ${
                        item.trend === "up"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {item.change}
                    </span>
                  </div>
                </div>

                <div className="w-12 h-12 rounded-lg bg-[#427A43] flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* REVENUE + PEAK */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Revenue Trend */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Revenue Trend</h3>

              <div className="flex gap-2">
                {["daily", "weekly", "monthly"].map((view) => (
                  <button
                    key={view}
                    onClick={() => setRevenueView(view)}
                    className={`px-3 py-1 rounded-md text-sm transition ${
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

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData[revenueView]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#427A43"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Peak Orders */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h3 className="font-semibold text-lg mb-4">
              Peak Order Times
            </h3>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={peakOrderTimes}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="orders"
                  fill="#FFE66D"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

      </div>

      {/* TOTAL REVENUE GROWTH */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">
            Total Revenue Growth
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={totalRevenueGrowth}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#427A43" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#427A43" stopOpacity={0.1} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="total"
                stroke="#427A43"
                fillOpacity={1}
                fill="url(#colorTotal)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* BEST SELLING BOWLS */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">
            Best Selling Bowl Combos
          </h3>

          <div className="space-y-4">
            {bestSellingBowls.map((bowl, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center font-bold text-green-600">
                  {index + 1}
                </div>

                <div className="flex-1">
                  <p className="text-sm font-medium">{bowl.name}</p>
                  <div className="w-full bg-gray-100 h-2 rounded-full mt-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(bowl.orders / 145) * 100}%` }}
                      transition={{ duration: 1 }}
                      className="h-2 rounded-full"
                      style={{ background: COLORS[index] }}
                    />
                  </div>
                </div>

                <span className="font-semibold">
                  {bowl.orders}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

    </div>
  );
}
