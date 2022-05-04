/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import './Arrivals.css';
import arrowLeft from '../../../assets/arrowLeft.png';
import arrowRight from '../../../assets/arrowRight.png';

const Arrivals = () => {
  const [productsState, setProductsState] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/api/products')
      .then(res => {
        if(res.ok){
          return res.json()
        }
      })
      .then(jsonResponse => setProductsState(jsonResponse.data))
  },[]);

  console.log(document.cookie)

  return (
    <>
      <div className='title'>New Arrivals</div>
      <img src={arrowLeft} alt='arrowLeft' className='arrow-left-a'/>
      {productsState.categories && productsState.categories.map((category, index) => (
        <>
          <img src={category.productImage} alt='itemTemp2' className={'item' + (index+1) + '-container'} />
          <Link to={'/tempItemPage1?' + (index+1)} activeStyle>
            <span className={'item'+ (index+1) +'-description'} style={{"display": "block"}}>
              {category.productName + " " + category.price + " " + category.categoryName}
            </span>
          </Link>
        </>
      ))}
      <img src={arrowRight} alt='arrowRight1' className='arrow-right-a' />
    </>
  )
};

export default Arrivals;