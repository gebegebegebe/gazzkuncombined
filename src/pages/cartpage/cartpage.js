import React from 'react';
import './cartpage.css';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import deleteIcon from '../../assets/deleteIcon.png';
import addIcon from '../../assets/addIcon.png';

const Cartpage = () => {
  const [productListState, setProductListState] = useState([])

  const cookieString = document.cookie.split("&");
  const id = cookieString[2].split("=")[1];

  let total = 0;

  useEffect(() => {
    fetch('http://localhost:8000/api/transaction/user/' + id)
      .then(res => {
        if(res.ok){
          return res.json()
        }
      })
      .then(jsonResponse => setProductListState(jsonResponse.data))
  },[]);

  return (
    <>
    <Navbar/>
    <div className='car-cart-title'>My Cart</div>

    {productListState.transactions && productListState.transactions.map((transaction, index) => {
      total += transaction.price;
    })}
    {productListState.transactions && productListState.transactions.map((transaction, index) => {
      return (
        <>
          <div className={'car-item' + (3 - (index)) + '-bg'}/>
          <img src={transaction.productImage} alt='ItemT1' className={'car-item'+ (3 - (index)) + '-pic'}/>
          <Link to={'/tempItemPage1?' + (index+1)} activeStyle>
            <div className={'car-name' + ( 3 - (index)) + '-txt'}>{transaction.productName}</div>
          </Link>
          <div className={'car-price' + (3 - index) + '-txt'}>${transaction.price}</div>
          <div className={'car-qty' + (3 - index) + '-txt'}>{transaction.quantity}</div>
          <img src={deleteIcon} alt='deleteIcon' className={'car-dele-icon' + (3 - (index))}
          onClick={() => {
            fetch('http://localhost:8000/api/transaction/delete/product', {
              method: 'delete',
              headers: {
                'Accept'      : 'application/json',
                'Content-Type': 'application/json'
              },
              mode: 'cors',
              body: JSON.stringify({
                "transId": transaction.transactionTimeId,
                "prodId": transaction.productId,
                "usrId": transaction.userId,
              })
            }).then(function(response) {
              return response.json();
            }).then(function(data) {
              console.log(data);
              window.location.reload();
            }
            )
          }}/>
          <img src={addIcon} alt='addIcon' className={'car-add-icon' + (3 - (index))}
          onClick={() => {
            fetch('http://localhost:8000/api/transaction/update/product', {
              method: 'put',
              headers: {
                'Accept'      : 'application/json',
                'Content-Type': 'application/json'
              },
              mode: 'cors',
              body: JSON.stringify({
                "transId": transaction.transactionTimeId,
                "prodId": transaction.productId,
                "usrId": transaction.userId,
                "quantity": transaction.quantity + 1
              })
            }).then(function(response) {
              return response.json();
            }).then(function(data) {
              console.log(data);
              window.location.reload();
            }
            )
          }}/>
        </>
      )
    })}

    <div className='car-price-bg-long'/>
    <div className='car-rp-bg'/>
    <div className='car-price-bg'/>
    <div className='car-rp-txt'>Rp</div>
    <div className='car-price-txt'>Total Price</div>
    <div className='car-num-txt'>{total}</div>
    {(cookieString.length < 4) && total && (document.cookie = document.cookie + "&total=" + total)}
    {total && cookieString.length >= 4 && (document.cookie = document.cookie.replace(cookieString[3].split("=")[0] + "=" + cookieString[3].split("=")[1], "total=" + total))}
    {console.log(document.cookie)}
    <div className='car-chckout-bg'/>
    <Link to='/checkout' activeStyle>
      <div className='car-chckout-txt'>Proceed to Checkout</div>
    </Link>
    <Footer/>
    </>
  );
};

export default Cartpage;