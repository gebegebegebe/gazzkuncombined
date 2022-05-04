import React from 'react'
import { useEffect, useState } from 'react'
import './Category.css'

const Category = () => {
  const [categoryState, setCategoryState] = useState([])

  const [categoryExtState, setCategoryExtState] = useState(1)

  useEffect(() => {
    fetch('http://localhost:8000/api/products/categories')
      .then(res => {
        if(res.ok){
          return res.json()
        }
      })
      .then(jsonResponse => setCategoryState(jsonResponse.data))
  },[]);

  return (
    <>
      <div className='categories'>Categories</div>
      {categoryState.categories && categoryState.categories.map((category, index) => (
        <>
          <div onClick={() => {setCategoryExtState(index)}}>
            <div className={'cat-con-' + index}/>
            <div className={'cat-txt-' + index}>{category.name}</div>
          </div>
        </>
      ))}
    </>
  )
}

export default Category