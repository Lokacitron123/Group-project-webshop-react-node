import { useContext } from "react";
import "./CustomerInfo.css";
import { AuthContext } from "../../context/UserContext"; 
import { Address } from "../../context/OrderContext"
import { useForm } from "react-hook-form";


interface CustomerInfoProps {
  customerAddress: Address;
  setCustomerAddress: React.Dispatch<React.SetStateAction<Address>>;
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({ customerAddress, setCustomerAddress }) => {
  const { user } = useContext(AuthContext);
  
  const onSubmit = (data: Address) => {
    setCustomerAddress(data);
  }
  
  const { register, handleSubmit, formState: { errors }} = useForm<Address>()
  const getErrorMessage = (fieldName: keyof Address) => errors?.[fieldName]?.type === "required" && <p>*</p>;

  return (
    <div className="customerInfo__container">
      {user ? (
        <div className="customer-info-wrapper">
            <div className="customer-info">
              <p>Namn: <span>{user?.firstName}</span></p>
              <p>Efternamn: <span>{user?.lastName}</span></p>
              <p>Email: <span>{user?.email}</span></p>
            </div>
            <div className="customer-address">
          <form onSubmit={handleSubmit(onSubmit)}>
              <label>Gata: 
                <input type="text" defaultValue={customerAddress.street} 
                {...register("street", {
                  required: true
                })} /> 
                {getErrorMessage("street")}
              </label>
              <label>Postnummer: 
                <input type="text" defaultValue={customerAddress.zipcode}
                {...register("zipcode", {
                  required: true
                })} />
                {getErrorMessage("zipcode")}
              </label>
              <label>Stad: 
                <input type="text" defaultValue={customerAddress.city}
                {...register("city", {
                  required: true
                })} />
                {getErrorMessage("city")}
              </label>
              <label>Land: 
                <input type="text" defaultValue={customerAddress.country}
                {...register("country", {
                  required: true
                })} />
                {getErrorMessage("country")}
              </label>
              <input type="submit" value="Spara"/>
          </form>
            </div>
        </div>
      ) : (
        <div className="missing-customer">
          <p>Du måste vara inloggad för att fortsätta</p>
        </div>
      )}
    </div>
  );
};

export default CustomerInfo;