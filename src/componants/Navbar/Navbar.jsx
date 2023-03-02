import React from "react";
import { Badge } from "@mui/material";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { Link, useLocation } from "react-router-dom";
const Navbar = ({
  cart,
  categories,
  fetchProductsByCategories,
  loading,
  products,
}) => {
  const location = useLocation();
  return (
    <div className="d-grid">
      <div className="navbar bg-green-400">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost normal-case text-white text-xl">
            ICommerce
          </Link>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <Link to="/cart">
              {location.pathname !== "/cart" ? (
                <label tabIndex={0} className="btn btn-ghost btn-circle">
                  <Badge badgeContent={cart.total_items} color="primary">
                    <ShoppingCartRoundedIcon className="text-white" />
                  </Badge>
                </label>
              ) : null}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
