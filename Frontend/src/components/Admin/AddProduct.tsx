// src/components/AddProduct.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import productsApi from "../../apis/product.api";
import { Product } from "../../types/Product.type"; // Ensure the Product type includes 'id', 'name', 'description', 'price', 'stock', and 'imageUrl'

const AddProduct: React.FC = () => {
  const [product, setProduct] = useState<Product>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    imageURL: "", // Add imageUrl to the state
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Send the product data to the API
      await productsApi.createProduct(product);
      navigate("/admin/products"); // Redirect to product list after adding
    } catch (err) {
      setError("Failed to add product"); // Handle the error
    }
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Add Product</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}{" "}
      {/* Display error message */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Name:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Description:</label>
          <input
            type="text"
            name="description"
            value={product.description}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Price:</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Stock:</label>
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Image URL:</label>{" "}
          {/* New input for image URL */}
          <input
            type="text"
            name="imageURL"
            value={product.imageURL}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
