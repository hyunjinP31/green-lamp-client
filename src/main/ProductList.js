import React from 'react';

const ProductList = ({name, price, imgsrc,seller}) => {
    return (
        <>
            <div className='product-card'>
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
            </div>
        </>
    );
};

export default ProductList;