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
  X,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react";

const initialOrders = [
  { id: "ORD-1001", customerName: "John Smith", phone: "+1 (555) 111-2222", address: "123 Oak Street, San Francisco", items: "Mango x2, Apple x1", total: 85, paymentStatus: "Paid", orderStatus: "Delivered", date: "2026-02-01", planType: "1 Month Plan" },
  { id: "ORD-1002", customerName: "Sarah Johnson", phone: "+1 (555) 222-3333", address: "456 Pine Avenue, San Francisco", items: "Strawberry x3, Banana x2", total: 150, paymentStatus: "Paid", orderStatus: "Shipped", date: "2026-02-01", planType: "6 Months Plan" },
  { id: "ORD-1003", customerName: "Mike Wilson", phone: "+1 (555) 333-4444", address: "789 Maple Drive, San Francisco", items: "Orange x4, Grapes x1", total: 145, paymentStatus: "COD", orderStatus: "Processing", date: "2026-02-02", planType: "6 Months Plan" },
  { id: "ORD-1004", customerName: "Emily Brown", phone: "+1 (555) 444-5555", address: "321 Cedar Lane, San Francisco", items: "Watermelon x1, Pineapple x2", total: 120, paymentStatus: "Paid", orderStatus: "Pending", date: "2026-02-02", planType: "1 Month Plan" },
  { id: "ORD-1005", customerName: "David Lee", phone: "+1 (555) 555-6666", address: "654 Birch Street, San Francisco", items: "Mango x5, Strawberry x2", total: 230, paymentStatus: "COD", orderStatus: "Pending", date: "2026-02-02" },
  { id: "ORD-1006", customerName: "Lisa Anderson", phone: "+1 (555) 666-7777", address: "987 Elm Avenue, San Francisco", items: "Apple x3, Banana x4", total: 135, paymentStatus: "Failed", orderStatus: "Cancelled", date: "2026-02-01", planType: "1 Month Plan" },
  { id: "ORD-1007", customerName: "Alex Green", phone: "+1 (555) 777-8888", address: "147 Walnut Drive, San Francisco", items: "Papaya x2", total: 60, paymentStatus: "Paid", orderStatus: "Processing", date: "2026-02-03" },
  { id: "ORD-1008", customerName: "Nina White", phone: "+1 (555) 888-9999", address: "258 Spruce Lane, San Francisco", items: "Guava x3, Banana x1", total: 95, paymentStatus: "COD", orderStatus: "Pending", date: "2026-02-03" },
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
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div>
        <h2 className="hidden md:block text-xl sm:text-2xl font-bold text-gray-900">Orders Management</h2>
        <p className="hidden md:block text-sm text-gray-600 mt-1">View and manage customer orders</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          <select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            className="pl-9 sm:pl-10 pr-7 sm:pr-8 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none bg-white"
          >
            <option value="all">All Orders</option>
            <option value="subscribed">Subscription </option>
            <option value="no-plan">No Subscription</option>
          </select>
        </div>

        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="pl-9 sm:pl-10 pr-7 sm:pr-8 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none bg-white"
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

      {/* Mobile Card View */}
      <div className="block lg:hidden space-y-3">
        {filteredOrders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
            className="bg-white rounded-xl shadow-sm border p-4 space-y-3"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-gray-900">{order.id}</p>
                <p className="text-sm text-gray-600">{order.customerName}</p>
              </div>
              <p className="font-bold text-lg">₹{order.total}</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                order.paymentStatus === "Paid" ? "bg-green-100 text-green-700" : order.paymentStatus === "COD" ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"
              }`}>
                {order.paymentStatus}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                order.orderStatus === "Delivered" ? "bg-green-100 text-green-700" : order.orderStatus === "Cancelled" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"
              }`}>
                {order.orderStatus}
              </span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                order.planType ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
              }`}>
                {order.planType ? "Subscribed" : "No Sub"}
              </span>
            </div>
            
            <p className="text-sm text-gray-600">{order.items}</p>
            
            <div className="flex justify-between items-center pt-2 border-t">
              <span className="text-xs text-gray-500">{order.date}</span>
              <button onClick={()=>setSelectedOrder(order)} className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm">
                <Eye className="w-4 h-4"/> View
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block bg-white rounded-xl shadow-sm border overflow-hidden">
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
                      order.paymentStatus === "Paid" ? "bg-green-100 text-green-700" : order.paymentStatus === "COD" ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"
                    }`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      order.orderStatus === "Delivered" ? "bg-green-100 text-green-700" : order.orderStatus === "Cancelled" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"
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

      {/* View Details Modal */}
      {selectedOrder && (
        <OrderDetailsModal 
          order={selectedOrder} 
          onClose={() => setSelectedOrder(null)} 
        />
      )}
    </div>
  );
}

/* ======================
   View Details Modal
====================== */
function OrderDetailsModal({ order, onClose }) {
  if (!order) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl w-full max-w-md shadow-xl relative max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-4 text-white flex-shrink-0">
          <button 
            onClick={onClose} 
            className="absolute top-3 right-3 p-1.5 bg-white/20 rounded-full hover:bg-white/30"
          >
            <X size={18} />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Package size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold">Order Details</h2>
              <p className="text-white/80 text-xs">{order.id}</p>
            </div>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="p-4 overflow-y-auto flex-1">
          {/* Customer Info */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-3 mb-3 border border-purple-100">
            <h3 className="font-bold text-purple-800 mb-2 text-sm">👤 Customer Info</h3>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Name:</span>
                <span className="font-medium text-gray-800">{order.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Phone:</span>
                <span className="font-medium text-gray-800">{order.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Address:</span>
                <span className="font-medium text-gray-800 text-right">{order.address}</span>
              </div>
            </div>
          </div>

          {/* Order Info */}
          <div className="flex gap-2 mb-3">
            <div className="flex-1 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-3 border border-blue-100">
              <div className="flex items-center gap-1.5 mb-1">
                <Calendar size={14} className="text-blue-600" />
                <span className="text-xs text-blue-600 font-medium">Date</span>
              </div>
              <p className="font-bold text-blue-800 text-sm">{order.date}</p>
            </div>
            <div className="flex-1 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-3 border border-green-100">
              <span className="text-xs text-green-600 font-medium">Total</span>
              <p className="font-bold text-green-800 text-sm">₹{order.total}</p>
            </div>
          </div>

          {/* Payment & Status */}
          <div className="flex gap-2 mb-3">
            <div className="flex-1 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-3 border border-yellow-100">
              <span className="text-xs text-yellow-600 font-medium">Payment</span>
              <p className="font-bold text-yellow-800 text-sm">{order.paymentStatus}</p>
            </div>
            <div className="flex-1 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl p-3 border border-purple-100">
              <span className="text-xs text-purple-600 font-medium">Status</span>
              <p className="font-bold text-purple-800 text-sm">{order.orderStatus}</p>
            </div>
          </div>

          {/* Items */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-3 border border-green-100 mb-3">
            <h3 className="font-bold text-green-800 mb-2 text-sm">📦 Items</h3>
            <p className="text-sm text-gray-700">{order.items}</p>
          </div>

          {/* Plan Type */}
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-3 border border-orange-100">
            <div className="flex items-center justify-between">
              <span className="text-orange-700 font-medium text-sm">Plan Type</span>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                order.planType ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
              }`}>
                {order.planType || "No Subscription"}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t bg-gray-50 flex-shrink-0">
          <button 
            className="w-full py-2 bg-black text-white rounded-lg font-medium hover:bg-black/80 transition"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}
