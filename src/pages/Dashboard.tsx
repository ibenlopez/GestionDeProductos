import { useEffect, useState } from "react";
import { deleteProduct, getProducts } from "../services/productDetailService";
import { Product } from "../interface/IProduct";

import { FaPen, FaTrash, FaFileArchive, FaPlusCircle, FaEye } from 'react-icons/fa';
import { validateToken } from "../services/authService";


function Dashboard() {
    const [products, setProducts] = useState<Product[]>([]);
    const [selected, setSelected] = useState<Product | undefined>();

    useEffect(() => {
        getProducts().then(products => setProducts(products));
        validateToken();
    }, []);

    const deleteSelected = async () => {
        
        if (selected) {
            await deleteProduct(selected);

            setSelected(undefined);

            location.reload();
        }
    }

    return (
        <>
            <h2 className="mt-5">Bienvenido al administrador de productos</h2>

            <div className="container mt-5">

                <div className="row mb-5">
                    <a href="/products/add" className="btn btn-info">
                        <FaPlusCircle /> Agregar nuevo producto
                    </a>
                </div>

                <div className="row">


                    {products.map(product => {
                        return <div className="col-12 col-sm-6 col-md-3 mb-4" key={product.id}>
                            <div className="card">
                                <img src={product.img_url} className="card-img-top" />
                                <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text">{product.description}</p>
                                    <a href={`/products/edit/${product.id}`} className="btn btn-info text-white"><FaPen /></a>
                                    &nbsp;
                                    <a href="#" className="btn btn-danger" onClick={e => setSelected(product)} data-bs-toggle="modal" data-bs-target="#exampleModal"><FaTrash /></a>
                                    &nbsp;
                                    <a href={`/products/${product.id}`} className="btn btn-secondary"><FaEye /></a>
                                </div>
                            </div>
                        </div>
                    })}

                </div>
            </div>

            <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Eliminar {selected?.name}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {selected?.description}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={e => setSelected(undefined)}>Cancelar</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={deleteSelected}>Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
