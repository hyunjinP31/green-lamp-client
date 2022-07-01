import React from 'react';
import { Link } from 'react-router-dom';

const MainProduct = ({id, name, price, imgsrc,seller}) => {
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

export default MainProduct;