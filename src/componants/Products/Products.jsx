import React, { useState } from "react";
import { Link } from "react-router-dom";
import ShoppingCartRounded from "@mui/icons-material/ShoppingCartRounded";

const Products = ({
  products,
  onAddToCart,
  loading,
  fetchProductsByCategories,
  categories,
}) => {
  return (
    <div>
      <div className="navbar bg-gray-50">
        <div className="buttons d-flex gap-3">
          <select
            value={categories.name}
            onChange={(e) => fetchProductsByCategories(e.target.value)}
            className="form-control w-full px-3 py-2 mb-1 border-2 border-green-400 rounded-md focus:outline-none focus:border-green-400 transition-colors cursor-pointer">
            {categories &&
              categories.map((categories) => (
                <option className=" border-2 border-green-400 hover:bg-green-400 ">
                  {categories.name}
                </option>
              ))}
          </select>
        </div>
      </div>
      {loading ? (
        <div className="h-screen d-flex justify-center align-items-center">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-green-400"></div>
        </div>
      ) : (
        <div className="d-grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 place-items-center">
          {products.map((product) => (
            <div
              key={product.id}
              className=" max-w-sm mt-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <Link to={`/product/${product.id}`}>
                <img
                  className="p-8 rounded-t-lg h-80 w-96"
                  src={product.image.url}
                  alt="product"
                />
              </Link>
              <div className="px-5 pb-5">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {product.name}
                </h5>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {product.price.formatted_with_symbol}
                  </span>
                  <button
                    onClick={() => onAddToCart(product.id)}
                    type="button"
                    className="h-8 btn btn-ghost btn-sm font-semibold rounded-xl bg-green-400 text-white">
                    <ShoppingCartRounded className="mr-1" />
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Products;
