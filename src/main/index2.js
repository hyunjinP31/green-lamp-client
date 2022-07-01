import React from 'react';
import './index.scss';
import axios from 'axios';
import useAsync from './useAsync';
import MainProduct2 from './MainProduct2';

//주소를 여기서 불러주는 이유는 각 페이지마다 불러올 값이 다를 수 있기 때문(불러올 값이 다를 때마다 새로운 주소만 넣어주면 되니까)
async function getItems(){
    const response = await axios.get("http://localhost:3000/products");
    return response.data;
}


const ProductsCostomHook = ()=>{
    //불러올 파일을 useAsync에 넣어 불러올 수 있도록 한다.
    const [state] = useAsync(getItems,[]);
    //state를 객체구조분해할당 해준다.
    const {loading, data, error} = state;
    //각 상태마다 return해줄 값을 정해준다.
    if (loading) return <div>로딩중</div>;
    if (error) return <div>에러발생</div>;
    if (!data) return;
    return (
        <div>
            <div id='main'>
                <div id='banner'>
                <img src="images/banners/banner1.png" alt="" />
                </div>
                <div id='product-list' className='inner'>
                    <h2>그린조명 최신상품</h2>
                    <div id='product-items'>
                        {data.map(product=>
                            <MainProduct2 
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
}


export default ProductsCostomHook;