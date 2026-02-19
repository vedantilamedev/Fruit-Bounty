import React, { useState } from "react";
import { motion } from "framer-motion";
import { Truck, Clock, MapPin, Phone, X } from "lucide-react";

/* ======================
   Utility
====================== */
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/* ======================
   UI Components
====================== */
function Card({ className, ...props }) {
  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: "0 8px 20px rgba(0,0,0,0.08)" }}
      className={cn("bg-white rounded-xl border shadow-sm transition-all", className)}
      {...props}
    />
  );
}

function Badge({ className, variant = "default", ...props }) {
  const variants = {
    default: "bg-black text-white",
    secondary: "bg-gray-100 text-gray-700",
    outline: "border text-gray-700",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-md",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

function Button({ className, variant = "default", size = "default", ...props }) {
  const base =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition";

  const variants = {
    default: "bg-black text-white hover:bg-black/80",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
  };

  const sizes = {
    default: "h-9 px-4",
    sm: "h-8 px-3 text-xs",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}

/* ======================
   Data
====================== */
const deliveries = [
  { id: "DEL-001", customer: "Olivia Martin", phone: "+1 (555) 111-2222", address: "123 Oak Street, San Francisco", time: "8:00 AM", bowls: 2, type: "Subscription", status: "Scheduled" },
  { id: "DEL-002", customer: "Tech Corp Inc.", phone: "+1 (555) 123-4567", address: "789 Business Park, San Francisco", time: "9:00 AM", bowls: 15, type: "Corporate", status: "Scheduled" },
  { id: "DEL-003", customer: "David Lee", phone: "+1 (555) 222-3333", address: "456 Pine Avenue, San Francisco", time: "10:30 AM", bowls: 1, type: "Normal", status: "Scheduled" },
];

/* ======================
   Main Component
====================== */
export default function TomorrowDeliveries() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="p-4 sm:p-8">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold">Tomorrow's Deliveries</h1>
        <p className="text-gray-500">Scheduled deliveries</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <Truck className="text-blue-600" />
            <p className="text-sm text-gray-600">Total Deliveries</p>
          </div>
          <h3 className="text-3xl font-bold">{deliveries.length}</h3>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-gray-600 mb-2">Total Bowls</p>
          <h3 className="text-3xl font-bold text-green-600">
            {deliveries.reduce((sum, d) => sum + d.bowls, 0)}
          </h3>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-gray-600 mb-2">Corporate</p>
          <h3 className="text-3xl font-bold text-purple-600">
            {deliveries.filter((d) => d.type === "Corporate").length}
          </h3>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-gray-600 mb-2">Subscriptions</p>
          <h3 className="text-3xl font-bold text-orange-600">
            {deliveries.filter((d) => d.type === "Subscription").length}
          </h3>
        </Card>
      </div>

      {/* Timeline */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-6">Delivery Schedule</h3>

        <div className="space-y-4">
          {deliveries.map((delivery, index) => (
            <motion.div
              key={delivery.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -2, boxShadow: "0 8px 20px rgba(0,0,0,0.08)" }}
              className="flex gap-4 p-4 rounded-xl bg-gray-50 border transition-all"
            >
              <div className="flex flex-col items-center min-w-[80px]">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Clock className="text-green-600" />
                </div>
                <p className="text-sm font-semibold mt-2">{delivery.time}</p>
              </div>

              <div className="flex-1">
                <div className="flex justify-between mb-2 flex-wrap sm:flex-nowrap gap-2">
                  <div>
                    <h4 className="font-semibold">{delivery.customer}</h4>
                    <p className="flex items-center gap-1 text-sm text-gray-600">
                      <Phone size={14} /> {delivery.phone}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 items-start sm:items-end">
                    <Badge variant="outline">{delivery.type}</Badge>
                    <Badge variant="secondary">
                      {delivery.bowls} bowl{delivery.bowls > 1 ? "s" : ""}
                    </Badge>
                  </div>
                </div>

                <p className="flex gap-1 text-sm text-gray-600 mb-3">
                  <MapPin size={14} /> {delivery.address}
                </p>

                <Button size="sm" variant="outline" onClick={() => setSelected(delivery)}>
                  View Details
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Drawer */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl relative"
          >
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4">
              <X />
            </button>

            <h2 className="text-xl font-bold mb-4">Delivery Details</h2>

            <div className="grid gap-3 text-sm">
              <Info label="Customer" value={selected.customer} />
              <Info label="Phone" value={selected.phone} />
              <Info label="Address" value={selected.address} />
              <Info label="Delivery Time" value={selected.time} />
              <Info label="Bowls" value={selected.bowls} />
              <Info label="Type" value={selected.type} />
              <Info label="Status" value={selected.status} />
            </div>

            <Button className="w-full mt-6" onClick={() => setSelected(null)}>
              Close
            </Button>
          </motion.div>
        </div>
      )}

    </div>
  );
}

/* ======================
   Info Row
====================== */
const Info = ({ label, value }) => (
  <div className="flex justify-between bg-gray-50 p-3 rounded-lg border">
    <span className="text-gray-600">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);
