import { useRef } from "react";
import NavLinks from "../NavLinks/NavLinks";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Header.css";

const Hamburger: React.FC = () => {
  const navRef = useRef<HTMLElement>(null);

  const showNavbar = () => {
    if (navRef.current) {
      navRef.current.classList.toggle("responsive_nav");
    }
  };

  return (
    <header>
      <h1>
        Grupp5<span>TechStore</span>
      </h1>
      <nav ref={navRef}>
        <NavLinks />
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
};

export default Hamburger;