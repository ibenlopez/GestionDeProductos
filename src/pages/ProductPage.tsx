import React from 'react';
import ProductDetail from '../components/ProductDetail';

const ProductPage: React.FC = () => {
  return (
    <div>
      <h1 className="my-5">Detalle del Producto</h1>
      <ProductDetail/>
    </div>
  );
};

export default ProductPage;