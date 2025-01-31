import api from './api'; //Importacion de archivo que contiene a la API

//Extrayendo los productos a partir del endpoint /products de la API
export const showProducts = async () => {
    try {
        const response = await api.get('/products');                        //Se espera la respuesta de la API del endpoint /products y despues se muestran los productos
        return Array.isArray(response.data.data) ? response.data.data : []; //Los datos se devuelven en un array y se verifican. Si no se cumple, se devuelve un array vacio
    } catch (error: any) {
        console.error('Error al obtener los productos:', error.response?.data || error.message);  //Manejo de errores
        throw new Error(error.response?.data?.message || 'Error al obtener los productos');
    }
};


