import React from 'react';
import './product.scss';
import axios from 'axios';
import useAsync from '../comtomHook/useAsync';
import { useParams } from 'react-router-dom';
import {Button} from 'antd';
import 'antd/dist/antd.css';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config/contansts';

async function getProduct(id){
    const response = await axios.get(`${ API_URL}/product/${id}`);
    return response.data
}

const ProductPage3 = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [state] = useAsync(()=>getProduct(id),[id]);
    //data key를 product라는 변수명으로 받겠다.
    const { loading, data:product, error} = state;
    if(loading) return <div>로딩중</div>
    if(error) return <div>에러발생</div>
    if (!product) return <div>로딩중</div>
    function productDel(id){
        axios.delete(`${API_URL}/product/${id}`)
        
        .then(result=>{
            navigate("/");
            console.log(result);
        })
        .catch(e=>{
            console.log(e);
        })
        navigate("/");
    }
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
                    <li>{product.description}</li>
                </ul>
            </div>
            <div>
                <Button onClick={()=>{productDel(id)}} htmlType='button'>삭제하기</Button>
            </div>
        </div>
    );
};

export default ProductPage3;