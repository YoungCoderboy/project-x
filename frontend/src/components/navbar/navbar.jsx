import { useState } from "react";

const Navbar = () => {
  const [login, SetLogin] = useState(true);
  return (
    <div className="flex bg-red-400 h-16 items-center justify-between m-auto relative">
      <div className="navigations flex gap-5 ml-10">
        <div className="home">
          <a href="/">Home</a>
        </div>
        <div className="products">
          <a href="/products">Products</a>
        </div>
        <div className="community">
          <a href="/community">Community</a>
        </div>
        <div className="about">
          <a href="/about">About</a>
        </div>
      </div>
      <div className="logo mr-40">Logo</div>
      <div className="login-btn mr-10 gap-5 flex">
        <a href="/cart" className="cart">
          Cart
        </a>
        <button
          className="login-logout"
          onClick={() => {
            SetLogin((prev) => !prev);
          }}
        >
          {login ? <p>Login</p> : <p>Logout</p>}
        </button>
      </div>
    </div>
  );
};
export default Navbar;
