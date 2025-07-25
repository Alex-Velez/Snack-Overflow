import ReactDOM from 'react-dom';
import './CartModal.css'
import { useState, useRef } from 'react';

export default function CartModal({handlePurchase, initialAddress, user}){
  const [address, setAddress] = useState(initialAddress);
  const [modal, setModal] = useState(initialAddress ? "complete" : "address");
  const [error, setError] = useState();
  const textRef = useRef();

  function swapModal(){
    if(modal === "complete"){
      setModal("address")
    }
    else{
      setModal("complete")
    }
  }

  async function handleSave(){
    setError(null)
    const value = textRef.current.value.trim();
    
    if(value === ""){
      setError("BAD_ADDRESS")
      return;
    }
    
    try {
      let body = {
        address: value,
        uid: user
      }
      
      let res = await fetch("/api/users/update", {
          method: "PATCH",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
      });
      
      if (res.ok) {
        setAddress(value);
        swapModal();
      } else {
        setError("Failed to save address");
      }
    } catch (err) {
      setError("Error saving address");
    }
  }

  function AddressForm(){
    return <form className='address-form'>
      <textarea 
        ref={textRef}
        defaultValue={address ?? ""}
        placeholder="Enter your delivery address"
      />
      <p className='error-text'>{error}</p>
      <button 
        className='add-address-button'
        type='button'
        onClick={handleSave}
      >
        {address ? 'Save Address' : 'Add Address'}
      </button>
    </form>
  }

  function CompleteForm(){
    return <div className='address-form'>
      <h1>Delivering to:</h1>
      <p>{address}</p>
      <button className='edit-address' onClick={swapModal}>Edit Address</button>
      <button className='complete-button' onClick={handlePurchase}>Complete Purchase</button>
    </div>
  }
  
  return (ReactDOM.createPortal(<div className='cart-modal'>
      <div className='cart-modal-content'>
        {modal === "complete" ? <CompleteForm/> : <AddressForm/>}
      </div>
    </div>,
    document.body))
}