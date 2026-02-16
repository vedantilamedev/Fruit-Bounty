import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", sales: 1200 },
  { day: "Tue", sales: 1800 },
  { day: "Wed", sales: 1600 },
  { day: "Thu", sales: 2200 },
  { day: "Fri", sales: 2500 },
  { day: "Sat", sales: 2000 },
  { day: "Sun", sales: 2800 },
];

const SalesChart = () => {
  return (
    <>
      <h2 className="text-lg font-semibold mb-4">
        Weekly Sales
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#22c55e"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default SalesChart;
