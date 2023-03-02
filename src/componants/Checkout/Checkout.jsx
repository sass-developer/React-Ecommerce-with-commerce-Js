import React, { useEffect, useState } from "react";
import { commerce } from "../../lib/Commerce";
const Checkout = ({ cart }) => {
  const [checkoutToken, setCheckoutToken] = useState("");
  const [ShippingCountries, setShippingCountries] = useState([]);
  const [ShippingCountry, setShippingCountry] = useState("");
  const [ShippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [ShippingSubdivision, setShippingSubdivision] = useState("");
  const [ShippingOptions, setShippingOptions] = useState([]);
  const [ShippingOption, setShippingOption] = useState("");

  const countries = Object.entries(ShippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));
  const subdivisions = Object.entries(ShippingSubdivisions).map(
    ([code, name]) => ({ id: code, label: name })
  );
  const options = ShippingOptions.map((shippingOption) => ({
    id: shippingOption.id,
    label: `${shippingOption.description} - ${shippingOption.price.formatted_with_symbol}`,
  }));
  const items = checkoutToken.line_items;

  // const subtotal = cart.subtotal.formatted_with_symbol
  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  };
  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );
    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };
  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    region = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country, region }
    );
    setShippingOptions(options);
    setShippingOption(options[0].id);
  };
  //Generate Token
  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });
        console.log(token);
        setCheckoutToken(token);
      } catch (error) {
        console.log(error);
      }
    };
    generateToken();
  }, []);

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);

  useEffect(() => {
    fetchSubdivisions(ShippingCountry);
  }, [ShippingCountry]);

  useEffect(() => {
    fetchShippingOptions(
      checkoutToken.id,
      ShippingCountry,
      ShippingSubdivision
    );
  }, [ShippingSubdivision]);
  return (
    <div className="d-flex">
      <div style={{ width: "300px" }} className="d-flex  flex-col gap-3 mt-16">
        {checkoutToken &&
          checkoutToken.line_items.map((item) => (
            <div className="bg-white ml-2 text-gray-700 w-full max-w-md flex flex-col rounded-xl border p-4">
              <div className="flex items-center justify-between space-x-10">
                <div className="text-md font-bold">{item && item.name}</div>
                <div>
                  <h1 className="btn btn-ghost btn-sm border border-gray-300">
                    {item.price && item.price.formatted_with_symbol}
                  </h1>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="d-flex flex-col">
        <div className="min-w-screen flex  px-5 pb-10 pt-16">
          <div
            className="w-full mx-auto rounded-lg bg-white border p-5 text-gray-700"
            style={{ width: 700 }}>
            <div className="mb-10">
              <h1 className="text-center font-bold text-xl uppercase">
                USER INFO
              </h1>
            </div>
            <div className="mb-3">
              <label className="font-bold text-sm mb-2 ml-1">UserName</label>
              <div className="d-flex gap-1">
                <input
                  className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-green-400 transition-colors"
                  placeholder="User name"
                  type="text"
                />
                <input
                  className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-green-400 transition-colors"
                  placeholder="Email"
                  type="email"
                />
              </div>
              <label className="font-bold text-sm mb-2 ml-1">Region</label>
              <div className="d-flex gap-1">
                <select
                  onChange={(e) => setShippingCountry(e.target.value)}
                  className=" w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-green-400 transition-colors cursor-pointer">
                  {countries.map((country) => (
                    <option
                      value={country.id}
                      className="bg-green-400  text-white"
                      key={country.id}>
                      {country.label}
                    </option>
                  ))}
                </select>

                <select
                  value={ShippingSubdivision}
                  onChange={(e) => setShippingSubdivision(e.target.value)}
                  className=" w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-green-400 transition-colors cursor-pointer">
                  {subdivisions.map((subdivision) => (
                    <option
                      value={subdivision.id}
                      className="bg-green-400 text-white"
                      key={subdivision.id}>
                      {" "}
                      {subdivision.label}{" "}
                    </option>
                  ))}
                </select>
              </div>
              <div className="d-flex align-items-center gap-1">
                <div>
                  <label className="font-bold text-sm mb-2 ml-1">
                    Shipping options
                  </label>
                  <select
                    value={ShippingOption}
                    onChange={(e) => setShippingOption(e.target.value)}
                    className=" w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-green-400 transition-colors cursor-pointer">
                    {options.map((option) => (
                      <option
                        value={option.id}
                        className="bg-green-400 text-white"
                        key={option.id}>
                        {" "}
                        {option.label}{" "}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={{ marginTop: "26.5px" }}>
                  <input
                    className=" px-3 lg:w-96 max-md:w-90 max-sm:w-40 py-2  border-2 border-gray-200 rounded-md focus:outline-none focus:border-green-400 transition-colors"
                    placeholder="Home Adress"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="min-w-screen flex  px-5 pb-2">
          <div className="w-full mx-auto rounded-lg bg-white border p-5 text-gray-700">
            <div className="mb-10">
              <h1 className="text-center font-bold text-xl uppercase">
                CARD INFO
              </h1>
            </div>
            <div className="mb-3">
              <label className="font-bold text-sm mb-2 ml-1">
                Name on Card
              </label>
              <input
                className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-green-400 transition-colors"
                placeholder="Name on Card"
                type="text"
              />
              <label className="font-bold text-sm mb-2 ml-1">Card number</label>
              <div>
                <input
                  className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-green-400 transition-colors"
                  placeholder="0000 0000 0000 0000"
                  type="text"
                />
              </div>
            </div>

            <div>
              <button className="block w-full max-w-xs mx-auto bg-green-400 hover:bg-green-500 focus:bg-green-500 text-white rounded-lg px-3 py-3 font-semibold">
                <i className="mdi mdi-lock-outline mr-1" /> PAY
                <span className="bold ml-2 ">
                  {cart.subtotal && cart.subtotal.formatted_with_symbol}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
