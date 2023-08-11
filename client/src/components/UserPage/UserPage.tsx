import { useContext } from "react";
import { AuthContext } from "../../context/UserContext";
import AccountDetails from "../UserNavLinks/AccountDetails/AccountDetails";
import OrderHistory from "../UserNavLinks/OrderHistory/OrderHistory";
import "./UserPage.css";
import { useNavigate } from "react-router-dom";

const UserPage: React.FC = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate()

  return (
    <div className="user-container">
      <div className="user-name__container">
        <h1 className="user-name__title">Kontouppgifter</h1>
        <div className="user-logout__container">
          <button className="user-info__button" onClick={() => { logout(); navigate("/") }}>
            Logga ut
          </button>
        </div>
      </div>
      <div className="user-info__wrapper">
        <section className="user-info__options">
          <nav>
            <h2>Account</h2>
            <ul>
              <li>
                <button
                  className="user-info__button"
                  onClick={() => setSelectedComponent(() => AccountDetails)}
                >
                  Account Details
                </button>
              </li>
              <li>
                <button
                  className="user-info__button"
                  onClick={() => setSelectedComponent(() => OrderHistory)}
                >
                  Order History
                </button>
              </li>
            </ul>
          </nav>
        </section>
        <section className="user-info__information">
          <AccountDetails />
          <OrderHistory />
        </section>
      </div>

      {/* </div> */}
      {/* <div className="user-content__container">
        {/* <div className="user-content__item">Item 1</div>
        <div className="user-content__item">Item 2</div>
        <div className="user-content__item">Item 3</div> */}
      {/* </div>  */}

      {/* <div className="parent-div">
        <div className="collapsible-container">
          <input type="checkbox" id="collapsible" />
          <label htmlFor="collapsible">Collapsible</label>
          <div className="collapsible-item">
            <h2>Collapsible Heading</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
              incidunt a veniam laboriosam? Nobis et distinctio maiores quas quo
              mollitia.
            </p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default UserPage;
