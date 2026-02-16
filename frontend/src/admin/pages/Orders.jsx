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
  {
    id: "ORD-1001",
    customerName: "John Smith",
    items: "Mango x2, Apple x1",
    total: 85,
    paymentStatus: "Paid",
    orderStatus: "Delivered",
    date: "2026-02-01",
  },
  {
    id: "ORD-1002",
    customerName: "Sarah Johnson",
    items: "Strawberry x3, Banana x2",
    total: 150,
    paymentStatus: "Paid",
    orderStatus: "Shipped",
    date: "2026-02-01",
  },
  {
    id: "ORD-1003",
    customerName: "Mike Wilson",
    items: "Orange x4, Grapes x1",
    total: 145,
    paymentStatus: "COD",
    orderStatus: "Processing",
    date: "2026-02-02",
  },
  {
    id: "ORD-1004",
    customerName: "Emily Brown",
    items: "Watermelon x1, Pineapple x2",
    total: 120,
    paymentStatus: "Paid",
    orderStatus: "Pending",
    date: "2026-02-02",
  },
  {
    id: "ORD-1005",
    customerName: "David Lee",
    items: "Mango x5, Strawberry x2",
    total: 230,
    paymentStatus: "COD",
    orderStatus: "Pending",
    date: "2026-02-02",
  },
  {
    id: "ORD-1006",
    customerName: "Lisa Anderson",
    items: "Apple x3, Banana x4",
    total: 135,
    paymentStatus: "Failed",
    orderStatus: "Cancelled",
    date: "2026-02-01",
  },
];

export default function Orders() {
  const [orders, setOrders] = useState(initialOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || order.orderStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId
          ? { ...order, orderStatus: newStatus }
          : order
      )
    );

    if (selectedOrder?.id === orderId) {
      setSelectedOrder({ ...selectedOrder, orderStatus: newStatus });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Shipped":
        return "bg-blue-100 text-blue-700";
      case "Processing":
        return "bg-yellow-100 text-yellow-700";
      case "Pending":
        return "bg-orange-100 text-orange-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-700";
      case "COD":
        return "bg-blue-100 text-blue-700";
      case "Failed":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle className="w-4 h-4" />;
      case "Shipped":
        return <Truck className="w-4 h-4" />;
      case "Processing":
        return <Package className="w-4 h-4" />;
      case "Pending":
        return <Clock className="w-4 h-4" />;
      case "Cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Orders Management
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          View and manage customer orders
        </p>
      </div>

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

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                {[
                  "Order ID",
                  "Customer",
                  "Items",
                  "Total",
                  "Payment",
                  "Status",
                  "Date",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y">
              {filteredOrders.map((order, index) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-semibold">
                    {order.id}
                  </td>
                  <td className="px-6 py-4">
                    {order.customerName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {order.items}
                  </td>
                  <td className="px-6 py-4 font-semibold">
                    ${order.total}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${getPaymentStatusColor(
                        order.paymentStatus
                      )}`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold flex gap-1 items-center w-fit ${getStatusColor(
                        order.orderStatus
                      )}`}
                    >
                      {getStatusIcon(order.orderStatus)}
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {order.date}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedOrder(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl p-6 w-full max-w-2xl"
            >
              <h3 className="text-xl font-semibold mb-6">
                Order Details - {selectedOrder.id}
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">
                    Customer
                  </label>
                  <p className="font-semibold">
                    {selectedOrder.customerName}
                  </p>
                </div>

                <div>
                  <label className="text-sm text-gray-600">
                    Order Date
                  </label>
                  <p className="font-semibold">
                    {selectedOrder.date}
                  </p>
                </div>

                <div>
                  <label className="text-sm text-gray-600">
                    Items
                  </label>
                  <p className="font-semibold">
                    {selectedOrder.items}
                  </p>
                </div>

                <div>
                  <label className="text-sm text-gray-600">
                    Total
                  </label>
                  <p className="font-semibold">
                    ${selectedOrder.total}
                  </p>
                </div>

                <div>
                  <label className="text-sm text-gray-600">
                    Payment
                  </label>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${getPaymentStatusColor(
                      selectedOrder.paymentStatus
                    )}`}
                  >
                    {selectedOrder.paymentStatus}
                  </span>
                </div>

                <div>
                  <label className="text-sm text-gray-600 mb-1 block">
                    Status
                  </label>
                  <select
                    value={selectedOrder.orderStatus}
                    onChange={(e) =>
                      updateOrderStatus(
                        selectedOrder.id,
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  >
                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end mt-6 pt-4 border-t">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
