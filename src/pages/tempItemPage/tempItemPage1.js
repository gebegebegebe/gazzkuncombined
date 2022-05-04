import React from 'react';
import './tempItemPage.css'
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import arrowDownIcon from '../../assets/arrowDown.png';
import arrowUpIcon from '../../assets/arrowUp.png';
import item2Temp1x1 from '../../assets/itemTemp-2-1x1.png';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const TempItemPage1 = () => {
  const [productsState, setProductsState] = useState([])
  const [userState, setUserState] = useState([])
  const location = useLocation()

  const id = location.search.substring(1)

  useEffect(() => {
    fetch('http://localhost:8000/api/users/' + id)
      .then(res => {
        if(res.ok){
          return res.json()
        }
      })
      .then(jsonResponse => setUserState(jsonResponse.data))
  },[]);

  const addTransaction = (product, user) => {
    fetch ('http://localhost:8000/api/transactions/transaction', {
      method: 'post',
      headers: {
        'Accept'      : 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify({
        "transactionTimeId": user.transactionAmount, 
        "userId": user.userId,
        "productId": product.productId,
        "productName": product.productName,
        "quantity": 1,
        "price": product.price,
        "productImage": product.productImage,
      })
    }).then(function(response) {
      return response.json();
    }).then(function(data) {
      console.log(data);
    }
  )};

  let incrementVisits = (id, visits) => {
    console.log("foo")
    fetch('http://localhost:8000/api/product/visitation', {
      method: 'put',
      headers: {
        'Accept'      : 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify({
        "prodId": id,
        "quantity": visits + 1
      })
    }).then(function(response) {
      return response.json();
    }).then(function(data) {
      console.log(data);
    }
    )
  }

  useEffect(() => {
    fetch('http://localhost:8000/api/products/product/' + id)
      .then(res => {
        if(res.ok){
          return res.json()
        }
      })
      .then(jsonResponse => setProductsState(jsonResponse.data))
  },[]);

  return (
    <>
      <Navbar/>
      { productsState.product && incrementVisits(productsState.product.productId, productsState.product.visits) }
      { productsState.product && 
        <>
          <div className='temp-name'>{productsState.product.productName}</div>
          <div className='temp-price'>Price: ${productsState.product.price}</div>
          <div className='temp-category'>Category: {productsState.product.categoryName}</div>
          <div className='temp-description'>Description of Product: {productsState.product.productDescription}</div>
          <img src={productsState.product.productImage} alt='item2Temp1x1' className='temp-item-main'/>
          <img src={item2Temp1x1} alt='item2Temp1x1' className='temp-item-top'/>
          <img src={item2Temp1x1} alt='item2Temp1x1' className='temp-item-mid'/>
          <img src={item2Temp1x1} alt='item2Temp1x1' className='temp-item-bot'/>
        </>
      }
      <img src={arrowDownIcon} alt='arrowDownIcon' className='temp-arrow-down'/>
      <img src={arrowUpIcon} alt='arrowDownIcon' className='temp-arrow-up'/>
      <div className='temp-cart-bg'/>
      { userState.user && <div className='temp-cart-content' onClick={() => addTransaction(productsState.product, userState.user)}>Add to cart</div>}
      <div className='temp-wishlist-bg'/>
      <div className='temp-wishlist-content'>Add to wishlist</div>
      <Footer/>
    </>
  );
};

export default TempItemPage1;