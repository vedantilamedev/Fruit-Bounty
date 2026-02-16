import { useState } from "react";

const ProductForm = ({ product, onClose }) => {
  const [form, setForm] = useState({
    name: product?.name || "",
    price: product?.price || "",
    stock: product?.stock || "",
    category: product?.category || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white w-full max-w-md rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">
          {product ? "Edit Product" : "Add Product"}
        </h2>

        <div className="space-y-3">
          <input
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            name="stock"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg">
            Save
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductForm;
