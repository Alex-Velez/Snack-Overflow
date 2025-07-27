import React from "react";
import './CartItem.css'
import ItemCount from "../../ItemCount/ItemCount.js";

const nearestHundredth = (val) => parseFloat(Math.round(val * 100)) / 100;
const titleStyle = {
    "fontSize": "40px",
    "marginBottom": "5px"
}
const priceStyle = {
    "fontSize": "30px"
}

export default function CartItem({ item, updateItem, total, setTotal }) {
    function updateCount(adjustment) {
        updateItem(item.sku, adjustment);
        let newTotal = nearestHundredth(total + parseFloat(item.price) * adjustment);
        setTotal(newTotal)
    }

    return <div className="cart-item">
        <div className="cart-item-left">
            <img src={item.img_path || "/img_not_found.svg"} alt="/img_not_found.svg" className="icon" />
            <div className="text-info">
                <h1 style={titleStyle}>
                    {item.item_name}
                </h1>
                <h2 style={priceStyle}>
                    ${item.price}
                </h2>
            </div>
        </div>
        <div style={{ flex: 1 }} />
        <ItemCount handleUpdate={updateCount} count={item.item_cnt}></ItemCount>
    </div>
}