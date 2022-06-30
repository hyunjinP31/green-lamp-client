import React, { useEffect, useState } from 'react';
import './index.scss';
import axios from 'axios';
import ProductLists from './ProductLists';

const MainPage = () => {
    const [ products, setProducts ] = useState([]);
    useEffect(()=>{
        axios.get("http://localhost:3000/products")
        .then( result => {
        const products = result.data.products;
        setProducts(products);
    }).catch((e)=>{
        console.log(e);
    })
    }, [])
    if(!products) return;
    return (
        <div>
            <div id='main'>
                <div id='banner'>
                <img src="images/banners/banner1.png" alt="" />
                </div>
                <div id='product-list' className='inner'>
                    <h2>그린조명 최신상품</h2>
                    <ProductLists products={products}/>
                </div>
            </div>
        </div>
    );
};

export default MainPage;