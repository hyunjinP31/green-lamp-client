import React, { useEffect, useState } from 'react';
import './index.scss';
import axios from 'axios';
import MainProduct from './MainProduct';

//product배열 서버에서 받아오기
const MainPage = () => {
    //상태 만들어줌
    const [ products, setProducts ] = useState([]);
    useEffect(()=>{
        //axios로 받아옴
        axios.get("http://localhost:3000/products")
        //result로 결과 값을 받아옴
        .then( result => {
        const products = result.data;
        console.log(result)
        //받아온 변수를 상태에 넣어줌
        setProducts(products);
        //error나면 catch로 받아오기
    }).catch((e)=>{
        console.log(e);
    })
    }, [])
    if(products === []) return <div>로딩중입니다.</div>;
    return (
        <div>
            <div id='main'>
                <div id='banner'>
                <img src="images/banners/banner1.png" alt="" />
                </div>
                <div id='product-list' className='inner'>
                    <h2>그린조명 최신상품</h2>
                    <div id='product-items'>
                        {products.map(product=>
                            <MainProduct 
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            price={product.price}
                            imgsrc={product.imageUrl}
                            seller={product.seller}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainPage;