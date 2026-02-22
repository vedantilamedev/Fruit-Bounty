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

const conversionRate = 83;

/* ------------------ Main Component ------------------ */
export default function Payments() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("latest");

  const filteredPayments = useMemo(() => {
    let data = [...paymentsData];
    if (search) {
      data = data.filter((p) => p.customer.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase()));
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

  const totalEarnings = paymentsData.filter((p) => p.status === "Paid").reduce((sum, p) => sum + p.amount, 0);
  const paidOrders = paymentsData.filter((p) => p.status === "Paid").length;
  const codOrders = paymentsData.filter((p) => p.method === "COD").length;
  const failedPayments = paymentsData.filter((p) => p.status === "Failed").length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">

      {/* Header */}
      <div>
        <h2 className="hidden md:block text-2xl sm:text-3xl font-bold">Payments & Revenue</h2>
        <p className="hidden md:block text-gray-500 text-sm">Track earnings and payment status</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <StatCard title="Total Earnings" value={`₹${(totalEarnings * conversionRate).toFixed(0)}`} icon={<DollarSign />} color="green" sub="+22.5% from last month" />
        <StatCard title="Paid Orders" value={paidOrders} icon={<CreditCard />} color="blue" sub="Successfully completed" />
        <StatCard title="COD Orders" value={codOrders} icon={<Wallet />} color="orange" sub="Cash on delivery" />
        <StatCard title="Failed" value={failedPayments} icon={<XCircle />} color="red" sub="Need attention" />
      </div>

      {/* Filters */}
      <div className="bg-white p-3 sm:p-4 rounded-xl shadow border flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search..." className="pl-9 pr-3 py-2 border rounded-lg w-full text-sm focus:ring-2 focus:ring-indigo-500 outline-none" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select className="border rounded-lg px-3 py-2 text-sm" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="All">All Status</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
        </select>
        <select className="border rounded-lg px-3 py-2 text-sm" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
          <option value="amountAsc">Amount ↑</option>
          <option value="amountDesc">Amount ↓</option>
        </select>
      </div>

      {/* Mobile Card View */}
      <div className="block lg:hidden space-y-3">
        {filteredPayments.map((p) => (
          <div key={p.id} className="bg-white rounded-xl shadow border p-4 space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-gray-900">{p.id}</p>
                <p className="text-sm text-gray-600">{p.customer}</p>
              </div>
              <p className="font-bold text-green-600">₹{(p.amount * conversionRate).toFixed(0)}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${p.status === "Paid" ? "bg-green-100 text-green-700" : p.status === "Pending" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>{p.status}</span>
              <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">{p.method}</span>
            </div>
            <p className="text-xs text-gray-500 flex items-center gap-1"><Calendar className="w-3 h-3" /> {p.date}</p>
          </div>
        ))}
        {filteredPayments.length === 0 && <div className="p-6 text-center text-gray-500">No records found</div>}
      </div>

      {/* Desktop Table View */}
      <motion.div className="hidden lg:block bg-white rounded-xl shadow border overflow-hidden">
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
              <tr key={p.id} className="hover:bg-gray-50 transition-colors duration-150">
                <Td className="font-semibold">{p.id}</Td>
                <Td>{p.customer}</Td>
                <Td className="font-bold text-green-600">₹{(p.amount * conversionRate).toFixed(0)}</Td>
                <Td>{p.method}</Td>
                <Td><span className={`px-3 py-1 rounded-full text-xs font-semibold ${p.status === "Paid" ? "bg-green-100 text-green-700" : p.status === "Pending" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>{p.status}</span></Td>
                <Td className="flex items-center gap-2 text-sm text-gray-600"><Calendar className="w-4 h-4" /> {p.date}</Td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredPayments.length === 0 && <div className="p-6 text-center text-gray-500">No records found</div>}
      </motion.div>
    </div>
  );
}

/* ---------------- Components ---------------- */
const StatCard = ({ title, value, icon, color, sub }) => {
  const colors = { green: "bg-green-500", blue: "bg-blue-500", orange: "bg-orange-500", red: "bg-red-500" };
  return (
    <motion.div whileHover={{ scale: 1.02 }} className="bg-white rounded-2xl shadow border p-3 sm:p-5 flex justify-between items-center transition-transform duration-200">
      <div>
        <p className="text-xs sm:text-sm text-gray-500">{title}</p>
        <h3 className="text-xl sm:text-3xl font-bold mt-1">{value}</h3>
        <p className="text-xs text-gray-500 mt-1 hidden sm:block">{sub}</p>
      </div>
      <div className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl text-white ${colors[color]}`}>{icon}</div>
    </motion.div>
  );
};

const Th = ({ children }) => <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{children}</th>;
const Td = ({ children, className = "" }) => <td className={`px-4 sm:px-6 py-3 sm:py-4 text-sm ${className}`}>{children}</td>;
