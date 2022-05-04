import React from 'react';
import './CheckoutPage.css';
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const CheckoutPage = () => {
  const [shippingState, setShippingState] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/shipping/all')
      .then(res => {
        if(res.ok){
          return res.json()
        }
      })
      .then(jsonResponse => setShippingState(jsonResponse.data))
  },[]);

  const cookieString = document.cookie.split("&");
  const price = cookieString[3].split("=")[1];
  const id = cookieString[2].split("=")[1];

  const [shippingPriceState, setShippingPriceState] = useState(0);

  const [ValueAddr, setValueAddr] = React.useState('');
  const handleChangeAddr = (event) => {
    setValueAddr(event.target.value);
    console.log("bar: " + event.target.value);
  };
  const [ValueShip, setValueShip] = React.useState('');
  const handleChangeShip = (event) => {
    setValueShip(event.target.value);
    console.log("foo: " + event.target.value);
    setShippingPriceState(parseFloat(event.target.value));
  };

  const [addressesState, setAddressesState] = React.useState([]);

  let longAddress = "";

  let updateAddress = (event) => {
    longAddress = event.target.value;
    //console.log(longAddress)
  }

  let submitLongAddress = () => {
    console.log(longAddress);
    fetch ('http://localhost:8000/api/address/input', {
      method: 'post',
      headers: {
        'Accept'      : 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify({
        "userId": id,
        "address": longAddress,
      })
    }).then(function(response) {
      return response.json();
    }).then(function(data) {
      window.location.reload();
      console.log(data);
    })
  }

  useEffect(() => {
    fetch('http://localhost:8000/api/address/user/' + id)
      .then(res => {
        if(res.ok){
          return res.json()
        }
      })
      .then(jsonResponse => setAddressesState(jsonResponse.data))
  },[]);

  let foo = (event) => {
    console.log(event);
  }

  return (
    <>
      <Navbar/>
      <div className='chk-title'>Checkout details</div>

      {/*
        NOTICE.
        The implementations done below are all hard coded
      */}

      {/* Dropdown for address*/}
      { addressesState.addresses && 
        <select value={ValueAddr} onChange={handleChangeAddr} className='chk-sel-addr-dropdown'>
          <option value="addrtemp" selected hidden></option>
            {addressesState.addresses[0] && <option value={addressesState.addresses[0].address}>{addressesState.addresses[0].address}</option>}
            {addressesState.addresses[1] && <option value={addressesState.addresses[1].address}>{addressesState.addresses[1].address}</option>}
            {addressesState.addresses[2] && <option value={addressesState.addresses[2].address}>{addressesState.addresses[2].address}</option>}
        </select>
      }

      {shippingState.shipping && shippingState.shipping.map(ship => {console.log(ship)})}
      {shippingState.shipping &&
      <select value={ValueShip} onChange={handleChangeShip} className='chk-ship-dropdown'>
        <option value="shiptemp" selected hidden></option>
        {<option value={shippingState.shipping[0].shippingFee}>{shippingState.shipping[0].shippingCompanyName} | {shippingState.shipping[0].shippingDuratoin} | Rp {shippingState.shipping[0].shippingFee}</option>}
        {<option value={shippingState.shipping[1].shippingFee}>{shippingState.shipping[1].shippingCompanyName} | {shippingState.shipping[1].shippingDuratoin} | Rp {shippingState.shipping[1].shippingFee}</option>}
        {<option value={shippingState.shipping[2].shippingFee}>{shippingState.shipping[2].shippingCompanyName} | {shippingState.shipping[2].shippingDuratoin} | Rp {shippingState.shipping[2].shippingFee}</option>}
      </select>
      }
      
      <div className='chk-tot-price-bg-long'/>
      <div className='chk-tot-rp-bg'/>
      <div className='chk-tot-price-bg'/>
      <div className='chk-tot-rp-txt'>Rp</div>
      <div className='chk-tot-price-txt'>Total Price</div>
      <div className='chk-tot-num-txt'>{(parseFloat(price) + parseFloat(shippingPriceState))}</div>

      <div className='chk-deli-bg-long'/>
      <div className='chk-deli-rp-bg'/>
      <div className='chk-deli-bg'/>
      <div className='chk-deli-rp-txt'>Rp</div>
      <div className='chk-deli-price-txt'>Delivery</div>
      <div className='chk-deli-num-txt'>{shippingPriceState}</div>

      <div className='chk-price-bg-long'/>
      <div className='chk-rp-bg'/>
      <div className='chk-price-bg'/>
      <div className='chk-rp-txt'>Rp</div>
      <div className='chk-price-txt'>Price</div>
      <div className='chk-num-txt'>{price}</div>

      <div className='chk-pay-bg'/>
      <div className='chk-pay-txt'>Proceed to Payment</div>
      <div className='chk-cart-bg'/>
      <Link to='/cart' activeStyle> 
        <div className='chk-cart-txt'>Return to Cart</div>
      </Link>

      <div className='chk-sel-addr-txt'>Select Address</div>
      <div className='chk-add-addr-txt'>Add New Address</div>
      <div className='chk-add-addr-bg'/>
      <input type="text" placeholder="ex. 123 Street Avaenue" className='chk-add-addr-type' onChange={(e) => {updateAddress(e)}}>
      </input>
      <div className='chk-save-addr-bg'/>
      <div className='chk-save-addr-txt' onClick={submitLongAddress}>Save Address</div>
      <div className='chk-ship-txt'>Select Shipping Plan</div>

      <Footer/>
    </>
  );
};
export default CheckoutPage;