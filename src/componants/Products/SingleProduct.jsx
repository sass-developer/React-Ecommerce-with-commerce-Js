import React from "react";
import { useParams } from "react-router-dom";
import ShoppingCartRounded from "@mui/icons-material/ShoppingCartRounded";

const SingleProduct = ({ products, onAddToCart }) => {
  const { id } = useParams();
  const product = products.find((product) => product.id === id);
  return (
    <div>
      <div>
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
            <div className="flex flex-col md:flex-row -mx-4">
              <div className="md:flex-1 px-4">
                <div>
                  <div className="h-64 md:h-80 rounded-lg mb-4 lg:ml-20">
                    <div className=" h-80 w-80  rounded-lg bg-gray-100 mb-4 flex items-center justify-center">
                      <img
                        src={product && product.image.url}
                        alt=""
                        className="w-100 h-100"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:flex-1 px-4 max-sm:mt-20 max-md:mt-5 justify-center">
                <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">
                  {product && product.name}
                </h2>
                <div className="flex items-center space-x-4 my-4">
                  <div>
                    <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                      <span className="font-bold text-green-400 text-3xl">
                        {product && product.price.formatted_with_symbol}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-green-500 text-xl font-semibold">
                      Save 12%
                    </p>
                    <p className="text-gray-400 text-sm">
                      Inclusive of all Taxes.
                    </p>
                  </div>
                </div>
                <div className="" style={{ height: "100px" }}>
                  <p
                    className=" text-gray-500 overflow-hidden  h-100"
                    dangerouslySetInnerHTML={{
                      __html: product && product.description,
                    }}
                    style={{ lineHeight: "20px" }}></p>
                </div>
                <div className="flex py-4 space-x-4">
                  <button
                    onClick={() => onAddToCart(product.id)}
                    type="button"
                    className="h-12 btn btn-ghost btn-sm font-semibold rounded-xl bg-green-400 text-white">
                    <ShoppingCartRounded className="mr-1" />
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
