import React from 'react';
import ProductList from './ProductList';

const ProductLists = ({products}) => {
    return (
        <>
            <div id='product-items'>
                {products.map(product=>
                    <ProductList 
                    key={product.id}
                    name={product.name}
                    price={product.price}
                    imgsrc={product.imgsrc}
                    seller={product.seller}
                    />
                )}
            </div>
        </>
    );
};

export default ProductLists;