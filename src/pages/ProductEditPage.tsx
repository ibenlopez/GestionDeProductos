import React, { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { createProduct, getProduct, updateProduct } from '../services/productDetailService';
import { ProductDetail } from '../interface/IProductDetail';
import { FaSave } from 'react-icons/fa';

const ProductEditPage: React.FC = () => {

  const { id } = useParams<{ id?: string }>();

  const navigate = useNavigate();

  const [product, setProduct] = useState<ProductDetail | undefined>();

  const [name, setName] = useState<string>('')
  const [price, setPrice] = useState<number>(0.0)
  const [description, setDescription] = useState<string>('')
  const [image, setImage] = useState<File | undefined>()

  useEffect(() => {
    if (id != null) {
      getProduct(parseInt(id)).then(product => {
        console.log(product);
        setProduct(product["data"]);
      })
    }
  }, []);

  useEffect(() => {
    if (id != null) {
      setName(product?.name ?? '');
      setPrice(product?.price ?? 0);
      setDescription(product?.description ?? '');
    }
  }, [product]);

  const saveProduct = () => {
    if (id != null) {
      updateProduct({ id: parseInt(id), name, description, price }, image);
    } else {
      createProduct({ name, description, price }, image);
    }
    navigate('/dashboard', { replace: true });
  }

  return (
    <div className='container'>
      <div className="row">
        <h1>{id != null ? "Editar" : "Agregar Producto"}  {product?.name}</h1>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Precio</label>
          <input type="number" className="form-control" value={price} onChange={e => setPrice(parseFloat(e.target.value))} />
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea className="form-control" onChange={e => setDescription(e.target.value)} value={description} rows={3}></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Imagen (Sin cambios)</label>
          <input type="file" className="form-control" onChange={e => setImage(e.target.files != null ? e.target.files[0] : undefined)} />
        </div>
      </div>

      <div className="row">
        <div className="col-6">
          {product?.img != null && (<img src={product?.img_url} alt="" className="img-fluid" />)}
        </div>
      </div>

      <div className="row">
        <div className="col-6">
          <button onClick={saveProduct} className="bt-primary"><FaSave /> Guardar</button>
        </div>
      </div>

    </div>
  );
};

export default ProductEditPage;