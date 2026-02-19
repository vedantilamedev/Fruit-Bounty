import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  DollarSign,
  CreditCard,
  Wallet,
  XCircle,
  Search,
  Calendar,
} from "lucide-react";

/* ------------------ Data ------------------ */
const paymentsData = [
  { id: "PAY-1001", customer: "John Smith", amount: 120, method: "Card", status: "Paid", date: "2026-02-01" },
  { id: "PAY-1002", customer: "Sarah Johnson", amount: 95, method: "Card", status: "Paid", date: "2026-02-01" },
  { id: "PAY-1003", customer: "Mike Wilson", amount: 200, method: "COD", status: "Pending", date: "2026-02-02" },
  { id: "PAY-1004", customer: "Emily Brown", amount: 85, method: "Wallet", status: "Paid", date: "2026-02-02" },
  { id: "PAY-1005", customer: "David Lee", amount: 125, method: "COD", status: "Pending", date: "2026-02-02" },
  { id: "PAY-1006", customer: "Lisa Anderson", amount: 75, method: "Card", status: "Failed", date: "2026-02-01" },
];

/* Conversion rate USD → INR */
const conversionRate = 83;

/* ------------------ Main Component ------------------ */
export default function Payments() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("latest");

  /* Filter + Sort */
  const filteredPayments = useMemo(() => {
    let data = [...paymentsData];

    if (search) {
      data = data.filter(
        (p) =>
          p.customer.toLowerCase().includes(search.toLowerCase()) ||
          p.id.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status !== "All") {
      data = data.filter((p) => p.status === status);
    }

    if (sort === "amountAsc") data.sort((a, b) => a.amount - b.amount);
    if (sort === "amountDesc") data.sort((a, b) => b.amount - a.amount);
    if (sort === "latest") data.sort((a, b) => new Date(b.date) - new Date(a.date));
    if (sort === "oldest") data.sort((a, b) => new Date(a.date) - new Date(b.date));

    return data;
  }, [search, status, sort]);

  /* Stats */
  const totalEarnings = paymentsData
    .filter((p) => p.status === "Paid")
    .reduce((sum, p) => sum + p.amount, 0);

  const paidOrders = paymentsData.filter((p) => p.status === "Paid").length;
  const codOrders = paymentsData.filter((p) => p.method === "COD").length;
  const failedPayments = paymentsData.filter((p) => p.status === "Failed").length;

  return (
    <div className="p-6 md:p-8 space-y-6">

      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold">Payments & Revenue</h2>
        <p className="text-gray-500">Track earnings and payment status</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Earnings"
          value={`₹${(totalEarnings * conversionRate).toFixed(0)}`}
          icon={<DollarSign />}
          color="green"
          sub="+22.5% from last month"
        />
        <StatCard
          title="Paid Orders"
          value={paidOrders}
          icon={<CreditCard />}
          color="blue"
          sub="Successfully completed"
        />
        <StatCard
          title="COD Orders"
          value={codOrders}
          icon={<Wallet />}
          color="orange"
          sub="Cash on delivery"
        />
        <StatCard
          title="Failed Payments"
          value={failedPayments}
          icon={<XCircle />}
          color="red"
          sub="Need attention"
        />
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow border flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search payment or customer..."
            className="pl-10 pr-4 py-2 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="border rounded-lg px-3 py-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
        </select>

        <select
          className="border rounded-lg px-3 py-2"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
          <option value="amountAsc">Amount Low → High</option>
          <option value="amountDesc">Amount High → Low</option>
        </select>
      </div>

      {/* Table */}
      <motion.div className="bg-white rounded-xl shadow border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <Th>Payment ID</Th>
              <Th>Customer</Th>
              <Th>Amount</Th>
              <Th>Method</Th>
              <Th>Status</Th>
              <Th>Date</Th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredPayments.map((p) => (
              <tr
                key={p.id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <Td className="font-semibold">{p.id}</Td>
                <Td>{p.customer}</Td>
                <Td className="font-bold text-green-600">
                  ₹{(p.amount * conversionRate).toFixed(0)}
                </Td>
                <Td>{p.method}</Td>
                <Td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      p.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : p.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {p.status}
                  </span>
                </Td>
                <Td className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" /> {p.date}
                </Td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredPayments.length === 0 && (
          <div className="p-6 text-center text-gray-500">No records found</div>
        )}
      </motion.div>
    </div>
  );
}

/* ---------------- Components ---------------- */
const StatCard = ({ title, value, icon, color, sub }) => {
  const colors = {
    green: "bg-green-500",
    blue: "bg-blue-500",
    orange: "bg-orange-500",
    red: "bg-red-500",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-2xl shadow border p-5 flex justify-between items-center transition-transform duration-200"
    >
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-3xl font-bold mt-1">{value}</h3>
        <p className="text-xs text-gray-500 mt-1">{sub}</p>
      </div>
      <div
        className={`w-12 h-12 flex items-center justify-center rounded-xl text-white ${colors[color]}`}
      >
        {icon}
      </div>
    </motion.div>
  );
};

const Th = ({ children }) => (
  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
    {children}
  </th>
);

const Td = ({ children, className = "" }) => (
  <td className={`px-6 py-4 text-sm ${className}`}>{children}</td>
);
