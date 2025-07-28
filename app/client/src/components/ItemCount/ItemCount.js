import { useState } from "react";
import "./ItemCount.css";

export default function ItemCount({ handleUpdate, count }) {
    const [currCount, setCount] = useState(count);



    function handleClick(adjustment) {
        if (parseInt(currCount) > 0 || adjustment > 0) {
            handleUpdate(adjustment);
            setCount((currCount) => parseInt(currCount) + adjustment);
        }
    }

    return <div className="item-count-div">
        <button className="minus-button" onClick={() => handleClick(-1)}><p>-</p></button>
        <div className="count">{currCount}</div>
        <button onClick={() => handleClick(1)}><p>+</p></button>
    </div>
}