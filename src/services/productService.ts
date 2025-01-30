import api from './api';

export const getProductById = async (id: number) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data; // Retorna los datos del producto
  } catch (error: any) {
    console.error('Error al obtener el producto:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Error al obtener el producto');
  }
};
