import ReactDOM from 'react-dom';
import './CartModal.css'
import { useState } from 'react';

export default function CartModal(){
  const [address, setAddress] = useState();
  const [updateAddress, setUpdateAddress] = useState(address);

  function handleChange(element){
    setUpdateAddress(element.target.value)
  }

  function AddressForm(){
    return <form className='address-form'>
      <textarea type='text' onChange={handleChange} name="updateAddress" value={updateAddress}></textarea>
      <button type='button'>{address ? 'Update Address' : 'Add Address'}</button>
    </form>
  }

  function CompleteForm(){
    return <div className='address-form'>
      <p>{address}</p>
      <button type='button'>Complete Purchase</button>
    </div>
  }
  
  return (ReactDOM.createPortal(<div className='cart-modal'>
      <div className='cart-modal-content'>
        {address ? <CompleteForm/> : <AddressForm/>}
      </div>
    </div>,
    document.body))
}