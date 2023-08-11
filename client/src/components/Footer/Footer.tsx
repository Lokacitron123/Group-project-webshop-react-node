import React, { useState, useEffect, useMemo } from "react";
import "./Footer.css";
import {
  FiMenu,
  FiX,
  FiInstagram,
  FiFacebook,
  FiTwitter,
} from "react-icons/fi";

interface ColumnProps {
  title: string;
  content: (string | JSX.Element)[];
}

const Footer: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean[]>([]);
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleDropdown = (index: number) => {
    if (isMobileScreen) {
      setDropdownOpen((prevState) =>
        prevState.map((state, i) => (i === index ? !state : state))
      );
    }
  };

  const columns: ColumnProps[] = useMemo(
    () => [
      {
        title: "Customer Service",
        content: [
          <a href="#">Customer Service</a>,
          <a href="#">Contact us</a>,
          <a href="#">Support</a>,
        ],
      },
      {
        title: "Information",
        content: [
          <a href="#">Cookies</a>,
          <a href="#">Personal information</a>,
          <a href="#">Avtal6</a>,
        ],
      },
      {
        title: "Socials",
        content: [
          <a href="#">
            <FiInstagram />
          </a>,
          <a href="#">
            <FiFacebook />
          </a>,
          <a href="#">
            <FiTwitter />
          </a>,
        ],
      },
    ],
    []
  );

  useEffect(() => {
    const initialDropdownState = columns.map(() => false);
    setDropdownOpen(initialDropdownState);
  }, [columns]);

  return (
    <footer className="footer-container">
      <div className="column">
        <div className="column-header column-header__copyright">
          <h4>Grupp5TechStore</h4>
          <p>©2023 Grupp5TechStore. All rights reserved</p>
        </div>
      </div>
      {columns.map((column, index) => (
        <div className="column" key={index}>
          <div className="column-header">
            <h4>{column.title}</h4>
            {isMobileScreen && (
              <>
                {dropdownOpen[index] ? (
                  <FiX className="icon" onClick={() => toggleDropdown(index)} />
                ) : (
                  <FiMenu
                    className="icon"
                    onClick={() => toggleDropdown(index)}
                  />
                )}
              </>
            )}
          </div>
          {dropdownOpen[index] && isMobileScreen && (
            <ul className="footer-ul">
              {column.content.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul>
          )}
          {!isMobileScreen && (
            <ul className="footer-ul">
              {column.content.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </footer>
  );
};

export default Footer;
