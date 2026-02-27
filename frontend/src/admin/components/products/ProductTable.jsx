import { Pencil, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { getAllFruits } from "../../../api/api";

const ProductTable = ({ onEdit }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllFruits();
        if (response.data.success) {
          const mappedProducts = response.data.data.map(item => ({
            id: item._id,
            name: item.name,
            category: item.isBowl ? "Bowl" : "Fruit",
            price: item.price,
            stock: item.stock,
            image: item.image || item.images?.[0] || "https://via.placeholder.com/50"
          }));
          setProducts(mappedProducts);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        // Fallback
        setProducts([
          { id: 1, name: "Mango", category: "Fruits", price: 120, stock: 40, image: "https://via.placeholder.com/50" },
          { id: 2, name: "Apple", category: "Fruits", price: 180, stock: 25, image: "https://via.placeholder.com/50" },
          { id: 3, name: "Banana", category: "Fruits", price: 60, stock: 80, image: "https://via.placeholder.com/50" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="p-4 text-center">Loading products...</div>;
  }
  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">

      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm">Image</th>
            <th className="px-4 py-3 text-left text-sm">Name</th>
            <th className="px-4 py-3 text-left text-sm">Category</th>
            <th className="px-4 py-3 text-left text-sm">Price</th>
            <th className="px-4 py-3 text-left text-sm">Stock</th>
            <th className="px-4 py-3 text-right text-sm">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-t">
              <td className="px-4 py-3">
                <img
                  src={product.image}
                  alt=""
                  className="w-12 h-12 rounded-lg object-cover"
                />
              </td>
              <td className="px-4 py-3 font-medium">
                {product.name}
              </td>
              <td className="px-4 py-3">
                {product.category}
              </td>
              <td className="px-4 py-3">
                ₹{product.price}
              </td>
              <td className="px-4 py-3">
                {product.stock}
              </td>
              <td className="px-4 py-3 flex justify-end gap-3">
                <button
                  onClick={() => onEdit(product)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Pencil size={18} />
                </button>
                <button className="text-red-600 hover:text-red-800">
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default ProductTable;
