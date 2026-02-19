import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  Search,
  Filter,
  Package,
  CheckCircle,
  Clock,
  XCircle,
  Truck,
} from "lucide-react";

const initialOrders = [
  { id: "ORD-1001", customerName: "John Smith", items: "Mango x2, Apple x1", total: 85, paymentStatus: "Paid", orderStatus: "Delivered", date: "2026-02-01", planType: "1 Month Plan" },
  { id: "ORD-1002", customerName: "Sarah Johnson", items: "Strawberry x3, Banana x2", total: 150, paymentStatus: "Paid", orderStatus: "Shipped", date: "2026-02-01", planType: "6 Months Plan" },
  { id: "ORD-1003", customerName: "Mike Wilson", items: "Orange x4, Grapes x1", total: 145, paymentStatus: "COD", orderStatus: "Processing", date: "2026-02-02", planType: "6 Months Plan" },
  { id: "ORD-1004", customerName: "Emily Brown", items: "Watermelon x1, Pineapple x2", total: 120, paymentStatus: "Paid", orderStatus: "Pending", date: "2026-02-02", planType: "1 Month Plan" },
  { id: "ORD-1005", customerName: "David Lee", items: "Mango x5, Strawberry x2", total: 230, paymentStatus: "COD", orderStatus: "Pending", date: "2026-02-02" },
  { id: "ORD-1006", customerName: "Lisa Anderson", items: "Apple x3, Banana x4", total: 135, paymentStatus: "Failed", orderStatus: "Cancelled", date: "2026-02-01", planType: "1 Month Plan" },
  { id: "ORD-1007", customerName: "Alex Green", items: "Papaya x2", total: 60, paymentStatus: "Paid", orderStatus: "Processing", date: "2026-02-03" },
  { id: "ORD-1008", customerName: "Nina White", items: "Guava x3, Banana x1", total: 95, paymentStatus: "COD", orderStatus: "Pending", date: "2026-02-03" },
];

export default function Orders() {
  const [orders, setOrders] = useState(initialOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || order.orderStatus === statusFilter;

    const matchesPlan =
      planFilter === "all"
        ? true
        : planFilter === "subscribed"
        ? !!order.planType
        : !order.planType;

    return matchesSearch && matchesStatus && matchesPlan;
  });

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Orders Management</h2>
        <p className="text-sm text-gray-600 mt-1">View and manage customer orders</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by order ID or customer name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none bg-white"
          >
            <option value="all">All Orders</option>
            <option value="subscribed">Subscription </option>
            <option value="no-plan">No Subscription</option>
          </select>
        </div>

        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none bg-white"
          >
            <option value="all">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-50 border-b">
              <tr>
                {["Order ID","Customer","Items","Total","Payment","Status","Plan","Date","Actions"].map(h => (
                  <th key={h} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredOrders.map((order,index)=>(
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index*0.04 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-4 py-2 font-semibold">{order.id}</td>
                  <td className="px-4 py-2">{order.customerName}</td>
                  <td className="px-4 py-2 text-sm text-gray-600">{order.items}</td>
                  <td className="px-4 py-2 font-semibold">₹{order.total}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      order.paymentStatus === "Paid"
                        ? "bg-green-100 text-green-700"
                        : order.paymentStatus === "COD"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      order.orderStatus === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.orderStatus === "Cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <span className={`inline-block text-sm px-2 py-1 rounded-full ${
                      order.planType ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                    }`}>
                      {order.planType ? "Subscribed" : "No Subscription"}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600">{order.date}</td>
                  <td className="px-4 py-2">
                    <button onClick={()=>setSelectedOrder(order)} className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm">
                      <Eye className="w-4 h-4"/> View
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
}
