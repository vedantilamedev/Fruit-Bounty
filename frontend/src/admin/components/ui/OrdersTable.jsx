const orders = [
  { id: "#1023", customer: "Amit", total: "₹540", status: "Paid" },
  { id: "#1024", customer: "Neha", total: "₹1,200", status: "Pending" },
  { id: "#1025", customer: "Rahul", total: "₹760", status: "Paid" },
  { id: "#1026", customer: "Pooja", total: "₹980", status: "Cancelled" },
];

const OrdersTable = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">
        Recent Orders
      </h2>

      <div className="space-y-3">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex justify-between items-center border-b pb-2"
          >
            <div>
              <p className="font-medium">{order.customer}</p>
              <p className="text-xs text-gray-500">
                Order {order.id}
              </p>
            </div>

            <div className="text-right">
              <p className="font-semibold">{order.total}</p>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  order.status === "Paid"
                    ? "bg-green-100 text-green-600"
                    : order.status === "Pending"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersTable;
