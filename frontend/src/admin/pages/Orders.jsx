import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
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

// =============================================
// Axios instance with base URL + auth token
// =============================================
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "https://fruit-bounty-dmzs.onrender.com/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);

  // =============================================
  // Fetch all orders from backend (Admin route)
  // =============================================
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data } = await api.get("/orders");

        // Normalize backend data to match UI shape
        const normalized = data.data.map((order) => {
          // Get order name from items array (first item's name or title)
          const orderName = order.items && order.items.length > 0
            ? order.items[0]?.name || order.items[0]?.title || "Order"
            : order.fruits?.[0]?.name || "Order";
          
          return {
            id: order._id,
            orderName: orderName,
            customerName: order.user_id?.name || "Unknown",
            phone: order.user_id?.phone || "N/A",
            address: order.user_id?.address || "N/A",
            // Check both 'items' (payment orders with title/name) and 'fruits' (subscription orders)
            items: order.items && order.items.length > 0 
              ? order.items.map((item) => item.name || item.title || "Item").join(", ")
              : order.fruits?.map((f) => f.name).join(", ") || "—",
            total: order.total_amount,
            paymentStatus: order.payment_status,
            orderStatus: order.order_status,
            date: new Date(order.order_date || order.createdAt).toISOString().split("T")[0],
            planType: order.isRecurring
              ? order.subscription_type === "monthly"
                ? "Monthly Plan"
                : "Weekly Plan"
              : null,
            package: order.package_id?.name || null,
            rawOrder: order,
          };
        });

        setOrders(normalized);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // =============================================
  // Update order status (Admin)
  // =============================================
  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const { data } = await api.put(`/orders/${orderId}/status`, { order_status: newStatus });

      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId ? { ...o, orderStatus: data.order.order_status } : o
        )
      );

      if (selectedOrder?.id === orderId) {
        setSelectedOrder((prev) => ({ ...prev, orderStatus: data.order.order_status }));
      }
    } catch (err) {
      alert("Error updating status: " + (err.response?.data?.message || err.message));
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      (order.orderName?.toString() || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (order.customerName?.toString() || '').toLowerCase().includes(searchQuery.toLowerCase());
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

  // =============================================
  // Loading / Error states
  // =============================================
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-500 text-sm">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="text-center text-red-500">
          <XCircle className="w-10 h-10 mx-auto mb-2" />
          <p className="font-medium">Error loading orders</p>
          <p className="text-sm text-gray-500 mt-1">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Orders Management</h1>
        <p className="text-sm text-gray-500 mt-1">View and manage customer orders</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            className="pl-9 sm:pl-10 pr-7 sm:pr-8 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none bg-white"
          >
            <option value="all">All Orders</option>
            <option value="subscribed">Subscription</option>
            <option value="none">No Subscription</option>
          </select>
        </div>

        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
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
      <div className="sm:hidden space-y-3">
        {filteredOrders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-4"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="font-semibold text-gray-800 text-sm">{order.orderName}</span>
              <span className="font-bold text-green-600">₹{order.total}</span>
            </div>
            <p className="text-gray-600 text-sm mb-2">{order.customerName}</p>
            <div className="flex flex-wrap gap-1.5 mb-2">
              <StatusBadge type="payment" value={order.paymentStatus} />
              <StatusBadge type="order" value={order.orderStatus} />
              <span className="text-xs px-2 py-0.5 rounded-full bg-purple-50 text-purple-600 border border-purple-100">
                {order.planType ? "Subscribed" : "No Sub"}
              </span>
            </div>
            <p className="text-gray-400 text-xs mb-1">{order.items}</p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-400">{order.date}</span>
              <button
                onClick={() => setSelectedOrder(order)}
                className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm"
              >
                <Eye className="w-3.5 h-3.5" /> View
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                                {["Order Name", "Customer", "Items", "Total", "Payment", "Status", "Plan", "Date", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-gray-500 font-medium text-xs uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredOrders.map((order, index) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03 }}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-gray-800">{order.orderName}</td>
                  <td className="px-4 py-3 text-gray-600">{order.customerName}</td>
                  <td className="px-4 py-3 text-gray-500 max-w-[140px] truncate">{order.items}</td>
                  <td className="px-4 py-3 font-semibold text-green-600">₹{order.total}</td>
                  <td className="px-4 py-3">
                    <StatusBadge type="payment" value={order.paymentStatus} />
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge type="order" value={order.orderStatus} />
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">
                    {order.planType ? "Subscribed" : "No Subscription"}
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs">{order.date}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm"
                    >
                      <Eye className="w-3.5 h-3.5" /> View
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {filteredOrders.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <Package className="w-10 h-10 mx-auto mb-2 opacity-40" />
              <p>No orders found</p>
            </div>
          )}
        </div>
      </div>

      {/* View Details Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <OrderDetailsModal
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
            onStatusUpdate={handleStatusUpdate}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// =============================================
// Status Badge Component
// =============================================
function StatusBadge({ type, value }) {
  const paymentColors = {
    Paid: "bg-green-50 text-green-600 border-green-100",
    Pending: "bg-yellow-50 text-yellow-600 border-yellow-100",
    Failed: "bg-red-50 text-red-600 border-red-100",
    COD: "bg-orange-50 text-orange-600 border-orange-100",
  };

  const orderColors = {
    Delivered: "bg-green-50 text-green-600 border-green-100",
    Shipped: "bg-blue-50 text-blue-600 border-blue-100",
    Processing: "bg-yellow-50 text-yellow-600 border-yellow-100",
    Pending: "bg-gray-50 text-gray-500 border-gray-100",
    Cancelled: "bg-red-50 text-red-500 border-red-100",
  };

  const colorMap = type === "payment" ? paymentColors : orderColors;
  const colorClass = colorMap[value] || "bg-gray-50 text-gray-500 border-gray-100";

  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${colorClass}`}>
      {value}
    </span>
  );
}

// =============================================
// View Details Modal
// =============================================
function OrderDetailsModal({ order, onClose, onStatusUpdate }) {
  if (!order) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-base font-bold text-gray-800">Order Details</h2>
            <p className="text-xs text-gray-400 mt-0.5">{order.id}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-5 space-y-4">
          {/* Customer Info */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              👤 Customer Info
            </p>
            <div className="space-y-1.5 text-sm text-gray-700">
              <p><span className="font-medium">Name:</span> {order.customerName}</p>
              <p className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-gray-400" />
                {order.phone}
              </p>
              <p className="flex items-start gap-1">
                <MapPin className="w-3.5 h-3.5 text-gray-400 mt-0.5 shrink-0" />
                {order.address}
              </p>
            </div>
          </div>

          {/* Order Info */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <Calendar className="w-4 h-4 text-gray-400 mx-auto mb-1" />
              <p className="text-xs text-gray-400">Date</p>
              <p className="text-sm font-semibold text-gray-700">{order.date}</p>
            </div>
            <div className="bg-green-50 rounded-xl p-3 text-center">
              <p className="text-xs text-gray-400">Total</p>
              <p className="text-lg font-bold text-green-600">₹{order.total}</p>
            </div>
          </div>

          {/* Payment & Status */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-400 mb-1.5">Payment</p>
              <StatusBadge type="payment" value={order.paymentStatus} />
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-400 mb-1.5">Status</p>
              <StatusBadge type="order" value={order.orderStatus} />
            </div>
          </div>

          {/* Items */}
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              📦 Items
            </p>
            <p className="text-sm text-gray-700">{order.items}</p>
          </div>

          {/* Plan Type */}
          <div className="bg-gray-50 rounded-xl p-3 flex items-center justify-between">
            <span className="text-sm text-gray-500">Plan Type</span>
            <span className="text-sm font-semibold text-gray-700">
              {order.planType || "No Subscription"}
            </span>
          </div>

          {/* Admin: Update Status */}
          <div className="bg-blue-50 rounded-xl p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Update Status
            </p>
            <div className="flex flex-wrap gap-2">
              {["Pending", "Processing", "Shipped", "Delivered", "Cancelled"].map((s) => (
                <button
                  key={s}
                  onClick={() => onStatusUpdate(order.id, s)}
                  disabled={order.orderStatus === s}
                  className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${order.orderStatus === s
                      ? "bg-blue-500 text-white border-blue-500 cursor-default"
                      : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600"
                    }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}