// src/components/ProductCard.tsx
import React from "react";
import { Product } from "../types/Product.type";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  console.log(product);
  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <img
        src={product.imageURL}
        alt={product.name}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-gray-600">{product.price.toFixed(2)}đ</p>
      <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
``;
