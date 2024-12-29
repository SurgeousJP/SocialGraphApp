import React, { useEffect, useState } from "react";
import productsApi from "../../apis/product.api";
import { Product } from "../../types/Product.type";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productsApi.getProducts();
        setProducts(response.data);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2 className="text-2xl mb-4">Product List</h2>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Description</th>
            <th className="border border-gray-300 p-2">Price</th>
            <th className="border border-gray-300 p-2">Stock</th>
            <th className="border border-gray-300 p-2">Image</th>{" "}
            {/* New column for image */}
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="border border-gray-300 p-2">{product.id}</td>
              <td className="border border-gray-300 p-2">{product.name}</td>
              <td className="border border-gray-300 p-2">
                {product.description}
              </td>
              <td className="border border-gray-300 p-2">
                {product.price.toFixed(2)}đ
              </td>
              <td className="border border-gray-300 p-2">{product.stock}</td>
              <td className="border border-gray-300 p-2">
                <img
                  src={product.imageURL}
                  alt={product.name}
                  className="w-16 h-16 object-cover"
                />
              </td>{" "}
              {/* Displaying the product image */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
