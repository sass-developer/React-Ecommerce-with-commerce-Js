import React from "react";
import { Link } from "react-router-dom";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const Cart = ({
  cart,
  removeFromCart,
  handleEmptyCart,
  updateCart,
  loading,
}) => {
  const cartItems = cart.line_items;
  return (
    <>
      {loading ? (
        <div className="h-screen d-flex justify-center align-items-center">
          <div className="w-16 h-16 border-4  border-dashed rounded-full animate-spin  border-green-400"></div>
        </div>
      ) : (
        <div>
          {cartItems && cartItems.length > 0 ? (
            <div className="min-h-screen  pt-20">
              <h1 className="mb-10 text-center text-2xl font-bold">
                Cart Items ({cart.total_items})
              </h1>
              <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                <div className="rounded-lg md:w-2/ ">
                  {cart &&
                    cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start ">
                        <img
                          src={item.image.url}
                          alt={item.name}
                          className="w-full rounded-lg sm:w-40"
                        />
                        <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                          <div className="mt-5 sm:mt-0">
                            <h2 className="text-lg font-bold text-gray-900">
                              {item.name}
                            </h2>
                            <p className="mt-1 text-xs text-gray-700">
                              {item.price.formatted_with_symbol}
                            </p>
                          </div>
                          <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                            <div className="flex justify-end border-gray-100 gap-1">
                              <span
                                className="cursor-pointer rounded-lg bg-gray-100 duration-100  btn btn-ghost btn-sm"
                                onClick={() =>
                                  updateCart(item.id, item.quantity - 1)
                                }>
                                {" "}
                                -{" "}
                              </span>
                              <span className="cursor-pointer rounded-lg bg-green-400 text-white duration-100  btn btn-ghost btn-sm">
                                {" "}
                                {item.quantity}{" "}
                              </span>
                              <span
                                className="cursor-pointer rounded-lg bg-gray-100 duration-100  btn btn-ghost btn-sm"
                                onClick={() =>
                                  updateCart(item.id, item.quantity + 1)
                                }>
                                {" "}
                                +{" "}
                              </span>
                            </div>
                            <div className="flex items-center space-x-4">
                              <button
                                className="btn btn-sm  inline-block btn-ghost bg-red-500 text-white"
                                onClick={() => removeFromCart(item.id)}>
                                {loading ? (
                                  <div className="w-4 h-4 px-1 border-4 border-dashed rounded-full animate-spin border-red-700 bg-white"></div>
                                ) : (
                                  <h1 className="">
                                    <DeleteForeverRoundedIcon className="mr-1" />
                                    Remove
                                  </h1>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                  <div className="mb-2 flex justify-between">
                    <p className="text-gray-700">Subtotal</p>
                    <p className="text-gray-700">
                      {cart.subtotal.formatted_with_symbol}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-700">Shipping</p>
                    <p className="text-gray-700">$0.00</p>
                  </div>
                  <hr className="my-4" />
                  <div className="flex justify-between">
                    <p className="text-lg font-bold">Total</p>
                    <div className="">
                      <p className="mb-1 text-lg font-bold">
                        {cart.subtotal.formatted_with_symbol}
                      </p>
                      <p className="text-sm text-gray-700">including VAT</p>
                    </div>
                  </div>
                  <Link to="/checkout">
                    <button className="mt-6 w-full rounded-md bg-green-400 py-1.5 font-medium text-blue-50 hover:bg-green-500">
                      Proceed to Check out
                    </button>
                  </Link>
                  <button
                    className="mt-2 w-full rounded-md btn btn-ghost bg-red-400  font-medium text-white hover:bg-red-500"
                    onClick={handleEmptyCart}>
                    <DeleteOutlineIcon className="mr-2" />
                    Empty Cart
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-100 h-screen d-flex flex-col justify-center align-items-center">
              <h1 className="text-green-400 text-3xl">Your Cart is Empty</h1>
              <Link
                to="/"
                className="text-green-400 btn bg-white  mt-5 hover:border-green-400 hover:text-green-400 border-green-400">
                Add Some Products to Cart
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Cart;
