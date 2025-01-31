import { useState, useEffect } from 'react';
import { showProducts } from "../services/showProductsService";
import { useNavigate } from 'react-router-dom'; 

//Interface usada para definir el tipo de dato de los campos (Usado como validacion y manejo)
interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    img_url: string;
}

const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([]); //Tiene la lista de productos, inicializandose como un array vacio
    const [loading, setLoading] = useState<boolean>(true);   //Se indica si aun se estan cargando los productos
    const [error, setError] = useState<string | null>(null); //Usado para detectar errores
    const navigate = useNavigate();                          //Usado para manejar la ruta de los detalles con react-router-dom

    //Se obtienen los productos cargados de la API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await showProducts();
                setProducts(data);
            } catch (error) {
                setError("No se pudieron cargar los productos.");
            } finally {
                setLoading(false);
            }
        };

        //Aqui se llama a la funcion "showProducts" desde el archivo en "Services" para hacer solicitud a la API
        fetchProducts();
    }, []);

    //Redirige al detalle del producto haciendo click en la imagen
    const handleImageClick = (id: number) => {
        navigate(`/products/${id}`); 
    };

    if (loading) return <p>Cargando productos...</p>;
    if (error) return <p>{error}</p>;

    //Retorno de los datos una vez hecha la peticion
    return (
        <div>
            <h2 className="fw-bold text-center my-4">Lo más novedoso</h2>
            <div className="container">
                <div className="row">
                    {products.map((product) => (
                        <div className="col-12 col-sm-6 col-md-3 mb-4" key={product.id}>
                            <div className="card h-100">
                                <img
                                    src={product.img_url}
                                    alt={product.name}
                                    className="card-img-top"
                                    onClick={() => handleImageClick(product.id)} // Redirige al hacer click y muestra los detalles del producto
                                />
                                <div className="card-body">
                                    <h4 className="card-title fw-bold">{product.name}</h4>
                                    <p className="card-text">{product.description}</p>
                                    <p className="card-text text-info fw-bold"><strong>Precio: ${product.price}</strong></p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductList;
