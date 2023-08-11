import { useState } from "react";
import CartIcon from "../CartIcon/CartIcon";
import LoginBtn from "../LoginBtn/LoginBtn";
import { IoSearch } from "react-icons/io5";
import "./UserMenu.css";

const UserMenu = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className={`user-wrapper ${isHovered ? "hovered" : ""}`}>
      <div
        className={`search-wrapper ${isHovered ? "hovered" : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <input type="text" placeholder="Search" className="search-input" />
        <div className="search-icon">
          <IoSearch />
        </div>
      </div>
      <div className="icons-wrapper">
        <LoginBtn />
        <CartIcon />
      </div>
    </div>
  );
};

export default UserMenu;
