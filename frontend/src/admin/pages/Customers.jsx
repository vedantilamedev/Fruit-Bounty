import React, { useState } from "react";
import { motion } from "motion/react";
import { Search, Mail, Phone, MapPin, ShoppingBag, X } from "lucide-react";
import { Users, UserPlus, Briefcase, TrendingUp } from "lucide-react";

/* ----------------- Utility ----------------- */
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/* ----------------- Badge ----------------- */
const badgeVariants = {
  default: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  destructive: "bg-red-500 text-white",
};

function Badge({ children, variant = "default", className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0",
        badgeVariants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

/* ----------------- Card ----------------- */
function Card({ children, className }) {
  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: "0 8px 20px rgba(0,0,0,0.08)" }}
      className={cn(
        "bg-white text-gray-800 flex flex-col gap-4 rounded-xl border shadow-sm transition-all",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

/* ----------------- Input ----------------- */
function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        "border rounded-md px-3 py-1 w-full text-sm focus:outline-none focus:ring focus:ring-green-300",
        className
      )}
      {...props}
    />
  );
}

/* ----------------- Button ----------------- */
function Button({ children, variant = "default", size = "default", className, ...props }) {
  const variants = {
    default: "bg-green-600 text-white hover:bg-green-700",
    outline: "border border-green-600 text-green-600 hover:bg-green-50",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    ghost: "bg-transparent hover:bg-gray-100",
  };
  const sizes = {
    default: "h-9 px-4",
    sm: "h-8 px-3 text-sm",
    lg: "h-10 px-6",
  };
  return (
    <button
      className={cn("rounded-md font-medium transition", variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}

/* ----------------- Table ----------------- */
function Table({ children }) {
  return <table className="w-full text-sm">{children}</table>;
}
function TableHeader({ children }) {
  return <thead className="bg-gray-50">{children}</thead>;
}
function TableBody({ children }) {
  return <tbody>{children}</tbody>;
}
function TableRow({ children, className }) {
  return <tr className={className}>{children}</tr>;
}
function TableHead({ children, className }) {
  return <th className={cn("text-left px-3 py-2 font-semibold text-gray-700", className)}>{children}</th>;
}
function TableCell({ children, className }) {
  return <td className={cn("px-3 py-2 text-gray-700", className)}>{children}</td>;
}

/* ----------------- Customers Data ----------------- */
const customers = [
  { id: "CUST-001", name: "Sarah Johnson", email: "sarah.j@email.com", phone: "+1 (555) 123-4567", address: "123 Green Street, San Francisco, CA", totalOrders: 45, totalSpent: 832.5, type: "Subscriber", subscriptionMonths: 6, joinDate: "2025-08-15" },
  { id: "CUST-002", name: "Michael Chen", email: "m.chen@email.com", phone: "+1 (555) 234-5678", address: "456 Market Avenue, San Francisco, CA", totalOrders: 12, totalSpent: 198.0, type: "Regular", joinDate: "2025-11-20" },
  { id: "CUST-003", name: "Tech Corp Inc.", email: "orders@techcorp.com", phone: "+1 (555) 345-6789", address: "789 Business Park, San Francisco, CA", totalOrders: 180, totalSpent: 15300.0, type: "Corporate", joinDate: "2025-06-01" },
  { id: "CUST-004", name: "Emma Wilson", email: "emma.w@email.com", phone: "+1 (555) 456-7890", address: "321 Oak Lane, San Francisco, CA", totalOrders: 28, totalSpent: 462.0, type: "Regular", joinDate: "2025-09-10" },
  { id: "CUST-005", name: "David Lee", email: "david.lee@email.com", phone: "+1 (555) 567-8901", address: "654 Pine Road, San Francisco, CA", totalOrders: 52, totalSpent: 961.0, type: "Subscriber", subscriptionMonths: 12, joinDate: "2025-07-22" },
];

/* ----------------- Main Component ----------------- */
export default function Customers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [modalCustomer, setModalCustomer] = useState(null);

  const filteredCustomers = customers.filter(
    (c) =>
      (c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (typeFilter === "all" || c.type === typeFilter)
  );

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 md:mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
        <p className="text-gray-500">Manage your customer database</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6 md:mb-8">
  {/* Total Customers */}
  <Card className="p-4 flex flex-col items-center text-center">
    <Users className="w-6 h-6 text-gray-500 mb-2" />
    <p className="text-sm text-gray-600 mb-1">Total Customers</p>
    <h3 className="text-2xl font-bold">{customers.length}</h3>
  </Card>

  {/* Subscribers */}
  <Card className="p-4 flex flex-col items-center text-center">
    <UserPlus className="w-6 h-6 text-green-500 mb-2" />
    <p className="text-sm text-gray-600 mb-1">Subscribers</p>
    <h3 className="text-2xl font-bold text-green-600">
      {customers.filter((c) => c.type === "Subscriber").length}
    </h3>
  </Card>

  {/* Corporate Clients */}
  <Card className="p-4 flex flex-col items-center text-center">
    <Briefcase className="w-6 h-6 text-purple-500 mb-2" />
    <p className="text-sm text-gray-600 mb-1">Corporate Clients</p>
    <h3 className="text-2xl font-bold text-purple-600">
      {customers.filter((c) => c.type === "Corporate").length}
    </h3>
  </Card>

  {/* Avg Lifetime Value */}
  <Card className="p-4 flex flex-col items-center text-center">
    <TrendingUp className="w-6 h-6 text-blue-500 mb-2" />
    <p className="text-sm text-gray-600 mb-1">Avg Lifetime Value</p>
    <h3 className="text-2xl font-bold text-green-600">
      ₹
      {(
        customers.reduce((sum, c) => sum + c.totalSpent, 0) /
        customers.length
      ).toFixed(0)}
    </h3>
  </Card>
</div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <Card className="flex-1 relative flex items-center">
          <Search className="absolute left-4 w-4 h-10 text-gray-400" />
          <Input
            placeholder="Search customers by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 py-2 w-full"
          />
        </Card>

        <Card className="w-60 p-2">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-300"
          >
            <option value="all">All Types</option>
            <option value="Subscriber">Subscriber</option>
            <option value="Regular">Regular</option>
            <option value="Corporate">Corporate</option>
          </select>
        </Card>
      </div>

      {/* Customers Table */}
      <Card className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Total Orders</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((c) => (
              <TableRow key={c.id} className="hover:bg-gray-50 transition-all">
                <TableCell>
                  <p className="font-medium">{c.name}</p>
                  <p className="text-xs text-gray-500">{c.id}</p>
                </TableCell>
                <TableCell>
                  <p className="flex items-center gap-1 text-sm">
                    <Mail className="w-3 h-3" />
                    {c.email}
                  </p>
                  <p className="flex items-center gap-1 text-sm">
                    <Phone className="w-3 h-3" />
                    {c.phone}
                  </p>
                </TableCell>
                <TableCell className="max-w-xs">
                  <p className="flex items-start gap-1 text-sm">
                    <MapPin className="w-3 h-3 mt-0.5" />
                    {c.address}
                  </p>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={
                      c.type === "Subscriber"
                        ? "bg-green-50 text-green-600 border-green-200"
                        : c.type === "Corporate"
                        ? "bg-purple-50 text-purple-600 border-purple-200"
                        : "bg-blue-50 text-blue-600 border-blue-200"
                    }
                  >
                    {c.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <ShoppingBag className="w-4 h-4 text-gray-400" />
                    {c.totalOrders}
                  </div>
                </TableCell>
                <TableCell className="font-semibold text-green-600">₹{c.totalSpent.toFixed(2)}</TableCell>
                <TableCell>{c.joinDate}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" onClick={() => setModalCustomer(c)}>
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Modal */}
      {modalCustomer && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full p-6 relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 text-gray-500"
              onClick={() => setModalCustomer(null)}
            >
              <X />
            </Button>
            <h2 className="text-xl font-bold mb-2">{modalCustomer.name}</h2>
            <p className="text-sm text-gray-500 mb-1">ID: {modalCustomer.id}</p>
            <p className="text-sm text-gray-500 mb-1">Email: {modalCustomer.email}</p>
            <p className="text-sm text-gray-500 mb-1">Phone: {modalCustomer.phone}</p>
            <p className="text-sm text-gray-500 mb-1">Address: {modalCustomer.address}</p>
            <p className="text-sm text-gray-500 mb-1">Type: {modalCustomer.type}</p>
            {modalCustomer.type === "Subscriber" && (
              <p className="text-sm text-gray-500 mb-1">
                Subscription Duration: {modalCustomer.subscriptionMonths} months
              </p>
            )}
            <p className="text-sm text-gray-500 mb-1">Total Orders: {modalCustomer.totalOrders}</p>
            <p className="text-sm text-gray-500 mb-1">Total Spent: ₹{modalCustomer.totalSpent.toFixed(2)}</p>
            <p className="text-sm text-gray-500">Joined: {modalCustomer.joinDate}</p>
          </Card>
        </div>
      )}
    </div>
  );
}
