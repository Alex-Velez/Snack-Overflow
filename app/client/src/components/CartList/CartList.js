import React from "react";
import CartItem from "./CartItem/CartItem";
import './CartList.css'

export default function CartList({items, handleUpdate, total, setTotal}){
  console.log(items);
  return <section className="cart-container">
    <div className="cart-items">
      {items.map((item) => <CartItem key={item.sku} item={item} updateItem={handleUpdate} setTotal={setTotal} total={total}></CartItem>)}
    </div> 
  </section>
}