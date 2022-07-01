import React from 'react';
import { Link } from 'react-router-dom';

//부모 컴포넌트인 index2에서 props로 넘겨준 값을 받는다.
//알맞은 곳에 각각의 값들을 넣어준다.
const MainProduct2 = ({id, name, price, imgsrc, seller}) => {
    return (
        <>
            <div className='product-card'>
                <Link to={`/product/${id}`}>
                <div className='product-image'>
                    <img src={imgsrc} alt='' />
                </div>
                <div className='product-contents'>
                    <span className='product-name'>{name}</span>
                    <span className='product-price'>{price}</span>
                    <div className='product-seller'>
                        <img src='images/icons/avatar.png' alt='seller' />
                        {seller}
                    </div>
                </div>
                </Link>
            </div>
        </>
    );
};

export default MainProduct2;