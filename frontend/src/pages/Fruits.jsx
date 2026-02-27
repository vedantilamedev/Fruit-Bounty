import FruitCard from "../components/FruitCard";
import { useState, useEffect } from "react";
import { getAllFruits } from "../api/api";

const Fruits = () => {
  const [fruits, setFruits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFruits = async () => {
      try {
        const response = await getAllFruits();
        if (response.data.success) {
          // Filter only non-bowl items (individual fruits) that are available
          const fruitItems = response.data.data
            .filter(item => !item.isBowl && item.available)
            .map(item => ({
              id: item._id,
              name: item.name,
              price: item.price,
              image: item.image || `/images/${item.name.toLowerCase()}.webp`,
              available: item.available,
              stock: item.stock
            }));
          setFruits(fruitItems);
        }
      } catch (err) {
        console.error("Error fetching fruits:", err);
        // Fallback to default
        setFruits([
          { id: 1, name: "Apple", price: 50, image: "/images/apple.webp" },
          { id: 2, name: "Banana", price: 30, image: "/images/banana.webp" },
          { id: 3, name: "Mango", price: 80, image: "/images/mango.webp" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchFruits();
  }, []);

  if (loading) {
    return <div className="p-6 text-center">Loading fruits...</div>;
  }

  return (
    <div className="p-6 grid grid-cols-3 gap-4">
      {fruits.map((fruit) => (
        <FruitCard key={fruit.id} fruit={fruit} />
      ))}
    </div>
  );
};

export default Fruits;
