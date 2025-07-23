import "./Checkout.css"
import { Link } from "react-router-dom"
import Checkbox from "./Checkbox.js";
import { useState } from "react";

const DELIVERY_FEE = 2.99;

export default function Checkout({total = 0, handleOrder}){
  const [hasTip, setHasTip] = useState(false);
  const subtotal = Number(total || 0);
  const tip = hasTip ? 1 : 0;
  const finalTotal = (subtotal + DELIVERY_FEE + tip).toFixed(2);

  function handleTipChange(checked){
    setHasTip(checked);
  }
  
  return <section className="checkout">
    <div className="total-box">
      <div className="total-box-inner">
        <h1>
          Subtotal: ${(parseFloat(subtotal) + (hasTip ? 1 : 0)).toFixed(2)}
        </h1>
        <h2>
          <p>Delivery Fee: ${DELIVERY_FEE.toFixed(2)}</p>
          <p>Total: ${finalTotal}</p>
          <div style={{marginTop: "10px", fontSize: "24px", display: "flex", justifyContent: "center", alignItems: "center", gap: "5px"}}>
            <Checkbox handleChange={handleTipChange}/>
            Add a $1 tip?
          </div>
        </h2>
      </div>
      <Link to="/">
        <button className="order-button" onClick={handleOrder}>
          Place Order
        </button>
      </Link>
    </div>
  </section>
}