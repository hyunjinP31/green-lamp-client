import React, { useState, useEffect } from 'react';
import './product.scss';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductPage = () => {
    const [product, setProduct] = useState(null);
    //useParams() 실행되면 파라미터 값을 가지고 있는 객체를 반환
    //product/1
    const { id } = useParams();
    useEffect(()=>{
        axios.get(`http://localhost:3000/product/${id}`)
        .then(result=>{
            const data = result.data;
            setProduct(data);
        })
        .catch(e=>{
            console.log(e);
        })
    },[])
    if (!product) return <div>로딩중</div>
    return (
        <div className='inner'>
            <div id='image-box'>
                <img src={product.imageUrl} alt='' />
            </div>
            <div id='profile-box'>
                <ul>
                    <li>
                        <div>
                            <img src='/images/icons/avatar.png' alt="" />
                            <span>{product.seller}</span>
                        </div>
                    </li>
                    <li>{product.name}</li>
                    <li>{product.price}</li>
                    <li>등록일 2022년 06월 02일</li>
                    <li>상세설명</li>
                </ul>
            </div>
        </div>
    );
};

export default ProductPage;