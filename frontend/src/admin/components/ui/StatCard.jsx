const StatCard = ({ title, value }) => {
  return (
    <div className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-2xl font-bold text-gray-800 mt-1">
        {value}
      </h2>
    </div>
  );
};

export default StatCard;
