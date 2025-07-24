import "./Checkout.css"
import { Link } from "react-router-dom"
import Checkbox from "./Checkbox.js";
import { use, useState } from "react";



export default function Checkout({total = 0, handleOrder}){
  const [hasTip, setHasTip] = useState(false);
  const [fastDelivery, setfastDelivery] = useState(false);
  const [discountCode, setDiscountCode] = useState();
  const [activeDiscount, setActiveDiscount] = useState(null)
  const subtotal = Number(total || 0);
  const tip = hasTip ? 1 : 0;
  const DELIVERY_FEE = fastDelivery ? 4.99 : 2.99;
  const finalTotal = (subtotal + DELIVERY_FEE + tip).toFixed(2);

  function handleChange(element){
    setDiscountCode(element.target.value)
  }

  async function submit(element){
    element.preventDefault();
    setActiveDiscount(discountCode)
  }

  function handleTipChange(checked){
    setHasTip(checked);
  }
  
  return <section className="checkout">
    <div className="total-box">
      <div className="total-box-inner">
        <h1>
          Subtotal: ${finalTotal}
        </h1>
        <h2>
          <p>Total: ${parseFloat(total)}</p>
          <p>Delivery Fee: ${DELIVERY_FEE.toFixed(2)}</p>
          <div style={{marginTop: "6px", fontSize: "14px", display: "flex", justifyContent: "center", alignItems: "center", gap: "5px", color: ""}}>
            <Checkbox handleChange={setfastDelivery}/>
            One-hour delivery? (+$2.00)
          </div>
          <div style={{marginTop: "6px", fontSize: "18px", display: "flex", justifyContent: "center", alignItems: "center", gap: "5px"}}>
            <Checkbox handleChange={handleTipChange}/>
            Add a $1 tip?
          </div>
        </h2>
        <form className="discount-form">
          <div className="discount-form-inner">
            <input className={"discount-input " + (activeDiscount ? "discount-applied" : "")} name="discountCode" value={discountCode} type="text" placeholder="Discount Code" onChange={handleChange}></input>
            <button type="button" className="discount-button" onClick={submit}>Apply</button>
          </div>
        </form>
      </div>
      <Link to="/">
        <button className="order-button" onClick={() => {handleOrder(hasTip, fastDelivery, activeDiscount)}}>
          Place Order
        </button>
      </Link>
    </div>
  </section>
}