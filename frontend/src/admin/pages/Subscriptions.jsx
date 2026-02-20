import { useState } from "react";
import { motion } from "framer-motion";
import { Pause, Play, Users, Calendar, CreditCard } from "lucide-react";

const Subscriptions = () => {

  const initialSubscribers = [
    {
      id: "SUB-001",
      customerName: "Sarah Johnson",
      planType: "Individual",
      duration: "1 Month",
      deliveryDays: "Mon, Wed, Fri",
      totalDays: 30,
      dailyPrice: 99,
      totalAmount: 2970,
      status: "Active"
    },
    {
      id: "SUB-002",
      customerName: "Tech Corp Pvt Ltd",
      planType: "Corporate",
      duration: "2 Months",
      deliveryDays: "Mon - Sat",
      totalDays: 60,
      dailyPrice: 249,
      totalAmount: 14940,
      status: "Paused"
    },
    {
      id: "SUB-003",
      customerName: "Amit Sharma",
      planType: "Individual",
      duration: "2 Weeks",
      deliveryDays: "Tue, Thu, Sat",
      totalDays: 14,
      dailyPrice: 89,
      totalAmount: 1246,
      status: "Active"
    },
    {
      id: "SUB-004",
      customerName: "GreenTech Solutions",
      planType: "Corporate",
      duration: "3 Months",
      deliveryDays: "Mon - Fri",
      totalDays: 90,
      dailyPrice: 229,
      totalAmount: 20610,
      status: "Active"
    }
  ];

  const [subscribers, setSubscribers] = useState(initialSubscribers);
  const [filter, setFilter] = useState("All");

  const toggleSubscriberStatus = (id) => {
    setSubscribers((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, status: s.status === "Active" ? "Paused" : "Active" }
          : s
      )
    );
  };

  const filteredSubscribers =
    filter === "All"
      ? subscribers
      : subscribers.filter((s) => s.planType === filter);

  // Summary
  const totalSubscribers = subscribers.length;
  const activeCount = subscribers.filter((s) => s.status === "Active").length;
  const pausedCount = subscribers.filter((s) => s.status === "Paused").length;

  const monthlyRevenue = subscribers
    .filter((s) => s.status === "Active")
    .reduce((acc, s) => acc + s.totalAmount, 0);

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Subscription Management
        </h1>
        <p className="text-gray-500">
          Monitor dynamic user subscriptions & delivery schedules
        </p>
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Subscribers", value: totalSubscribers, icon: <Users className="w-5 h-5 text-green-600" /> },
          { label: "Active", value: activeCount, icon: <Calendar className="w-5 h-5 text-blue-600" /> },
          { label: "Paused", value: pausedCount, icon: <Pause className="w-5 h-5 text-yellow-600" /> },
          { label: "Revenue", value: `₹${monthlyRevenue}`, icon: <CreditCard className="w-5 h-5 text-green-600" /> }
        ].map((card, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5, scale: 1.03 }}
            className="bg-white rounded-xl shadow p-4 flex flex-col items-center justify-center"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100 mb-3">
              {card.icon}
            </div>
            <p className="text-sm text-gray-500">{card.label}</p>
            <p className="text-2xl font-bold text-gray-800">
              {card.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* TABLE */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Active Subscriptions</h2>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded-lg p-2 text-sm"
          >
            <option value="All">All Plans</option>
            <option value="Individual">Individual</option>
            <option value="Corporate">Corporate</option>
          </select>
        </div>

        <div className="bg-white border rounded-xl shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left text-sm font-semibold">Customer</th>
                <th className="px-3 py-2 text-left text-sm font-semibold">Plan</th>
                <th className="px-3 py-2 text-left text-sm font-semibold">Duration</th>
                <th className="px-3 py-2 text-left text-sm font-semibold">Delivery Days</th>
                <th className="px-3 py-2 text-left text-sm font-semibold">Total Days</th>
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
                    <span className="bg-gray-100 px-2 py-1 rounded-full">
                      {s.planType}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-sm font-semibold">
                    {s.duration}
                  </td>
                  <td className="px-3 py-2 text-sm">{s.deliveryDays}</td>
                  <td className="px-3 py-2 text-sm">{s.totalDays}</td>
                  <td className="px-3 py-2 text-sm font-semibold text-green-600">
                    ₹{s.totalAmount}
                  </td>
                  <td className="px-3 py-2 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        s.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <button
                      onClick={() => toggleSubscriberStatus(s.id)}
                      className={`px-3 py-1 rounded text-xs font-medium flex items-center gap-1 ${
                        s.status === "Active"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
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
