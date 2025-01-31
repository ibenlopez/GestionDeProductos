import { data } from 'react-router-dom';
import { Product } from '../interface/IProduct';
import api from './api';

export const getProduct = async (id: number) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data; // Retorna los datos del producto
  } catch (error: any) {
    console.error('Error al obtener el producto:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Error al obtener el producto');
  }
};

export const getProducts = async () : Promise<Product[]> => {
  try {
    const response = await api.get(`/products`);
    return response.data["data"] as Product[];
  } catch (error: any) {
    console.error('Error al obtener el producto:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Error al obtener el producto');
  }
};

//Servicio para actualizar producto desde el dashboard

export const updateProduct = async (product: Product, file: File | undefined)  => {
  try {
    const formData = new FormData();
    if (file) {
      formData.append('img', file); //imagen tipo archivo
    }
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price.toFixed(2));

    await api.post(`/products/${product.id}`, formData, {headers: { "Content-Type": "multipart/form-data" }});
  } catch (error: any) {
    console.error('Error al obtener el producto:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Error al obtener el producto');
  }
};

//Servicio para crear un producto desde el dashboard

export const createProduct = async (product: Product, file: File | undefined)  => {
  try {
    const formData = new FormData();
    if (file) {
      formData.append('img', file);
    }
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price.toFixed(2));

    await api.post(`/products`, formData, {headers: { "Content-Type": "multipart/form-data" }});
  } catch (error: any) {
    console.error('Error al obtener el producto:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Error al obtener el producto');
  }
};

//Servicio para borrar un proudcto desde el dashboard

export const deleteProduct = async (product: Product)  => {
  try {
    await api.delete(`/products/${product.id}`);
  } catch (error: any) {
    console.error('Error al obtener el producto:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Error al obtener el producto');
  }
};

//Servicio para eliminar reseñas o rewvies desde el dashboard

export const deleteReviews = async (idReview: number)  => {
  try {
    await api.delete(`/reviews/${idReview}`);
  } catch (error: any) {
    console.error('Error al obtener el producto:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Error al obtener el producto');
  }
};

//Servicio para guardar reviews desde el dashboard

export const sendReview = async (review: {rating: number, comment: string}, productId: number)  => {
  try {
    await api.post(`/products/${productId}/review`, review);
  } catch (error: any) {
    console.error('Error al obtener el producto:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Error al obtener el producto');
  }
};