import ReactDOM from 'react-dom';
import './CartModal.css'
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function CartModal({handlePurchase, user}){
  const [address, setAddress] = useState();
  const [modal, setModal] = useState(address ? "complete" : "address");
  const [error, setError] = useState(null);
  const addressRef = useRef();

  function swapModal(){
    if(modal === "complete"){
      setModal("address")
    }
    else{
      setModal("complete")
    }
  }

  async function handleSave(e){
    e.preventDefault();
    setError(null);
    
    const value = addressRef.current.value;
    if(!value || value.trim() === ""){
      setError("BAD_ADDRESS");
      return;
    }
    
    try {
      let body = {
          "address": value,
          "uid": user
      };

      console.log('Sending request with body:', body);
      let res = await fetch("/api/users/update", {
          method: "PATCH",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
      });

      const data = await res.json();
      console.log('Response:', { status: res.status, data });

      if (!res.ok) {
        console.error('Server error:', data);
        setError("SERVER_ERROR");
        return;
      }
      
      setAddress(value);
      swapModal();
    } catch (err) {
      setError("SERVER_ERROR");
      console.error(err);
    }
  }

  function AddressForm(){
    return <form className='address-form' onSubmit={handleSave}>
      <textarea 
        ref={addressRef}
        name="address"
        placeholder="Enter delivery address"
      />
      {error === "BAD_ADDRESS" && <p className='error-text'>Address cannot be blank</p>}
      {error === "SERVER_ERROR" && <p className='error-text'>Unable to save address. Please try again.</p>}
      <button className='add-address-button' type='submit'>
        {address ? 'Save Address' : 'Add Address'}
      </button>
    </form>
  }

  function CompleteForm(){
    return <div className='address-form'>
      <h1>Delivering to:</h1>
      <p>{address}</p>
      <button className='edit-address' onClick={swapModal}>Edit Address</button>
      <Link to="/">
        <button className='complete-button' onClick={handlePurchase}>Complete Purchase</button>
      </Link>
    </div>
  }
  
  return (ReactDOM.createPortal(<div className='cart-modal'>
      <div className='cart-modal-content'>
        {modal === "complete" ? <CompleteForm/> : <AddressForm/>}
      </div>
    </div>,
    document.body))
}