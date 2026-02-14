import FruitCard from "../components/FruitCard";

const fruits = [
  { id: 1, name: "Apple", price: 50 },
  { id: 2, name: "Banana", price: 30 },
  { id: 3, name: "Mango", price: 80 },
];

const Fruits = () => (
  <div className="p-6 grid grid-cols-3 gap-4">
    {fruits.map((fruit) => (
      <FruitCard key={fruit.id} fruit={fruit} />
    ))}
  </div>
);

export default Fruits;
