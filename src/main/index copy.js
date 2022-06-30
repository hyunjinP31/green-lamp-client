import React, { useEffect, useState, useContext } from 'react';
import './index.scss';
import axios from 'axios';
import ProductLists from './ProductLists';

//주소를 여기서 불러주는 이유는 각 페이지마다 불러올 값이 다를 수 있기 때문(불러올 값이 다를 때마다 새로운 주소만 넣어주면 되니까)
async function getItems(){
    const response = await axios.get('localhost:3000/products');
    return response.data;
}
const ProductsCostomHook = ()=>{
    
    
}

const MainPageContext = () => {

    return (
        <div>
            <div id='main'>
                <div id='banner'>
                <img src="images/banners/banner1.png" alt="" />
                </div>
                <div id='product-list' className='inner'>
                    <h2>그린조명 최신상품</h2>
                    <ProductLists/>
                </div>
            </div>
        </div>
    );
};

export default MainPageContext;