import React, { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import CartList from '../components/CartList/CartList';
import Checkout from '../components/Checkout/Checkout';
import Page from '../components/Page/Page'
import EmptyCart from '../components/EmptyCart';

const nearestHundredth = (val) => parseFloat(Math.round(val * 100)) / 100

export default function CartPage({activeUser}) {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState();

    async function order(){
        let body = {
            "userId": activeUser,
        }

        let res = await fetch("/api/cart/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
    }

    async function updateCart(sku, cnt){
        let body = {
            "userId": activeUser,
            "sku": sku,
            "count": cnt
        }

        console.log(body)

        let res = await fetch("/api/cart/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        console.log("res" + res)
    }

    useEffect(() => {
        console.log("Using effect")
        async function fetchCart(){
            let totalCost = 0.0;
            const res = await fetch(`/api/cart/${activeUser}`);
            console.log("res: " + res)
            const data = await res.json();
            console.log("data: " + data)
            console.log(data)
            data.forEach(item => {
                let itemCost = parseFloat(item.price) * parseInt(item.item_cnt);
                totalCost += itemCost;
            });
            setCart(data)
            setTotal(nearestHundredth(totalCost));
        }
        fetchCart();
    }, []);
    console.log(cart);
    const mainBody = () => {
        if(cart.length === 0){
            return <EmptyCart/>
        }
        else{
            return <>
                <CartList items={cart} handleUpdate={updateCart} setTotal={setTotal} total={total}/>
                <Checkout total={total} handleOrder={order}/>
            </>
        }
    }
    return (
        <Page activeUser={activeUser}>
            {mainBody()}
        </Page>
    );
}
