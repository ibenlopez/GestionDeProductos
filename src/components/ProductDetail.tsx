import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { deleteReviews, getProduct } from '../services/productDetailService';
import { FaStar, FaStarHalfAlt, FaRegStar, FaTrash } from 'react-icons/fa';
import { isLoggedIn } from '../services/api';
import ReviewFrom from './ReviewForm';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("ID de producto no válido.");
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const data = await getProduct(Number(id));
        setProduct(data.data);
        console.log(data);

      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center">Cargando producto...</p>;
  if (error) return <p className="text-danger text-center">Error: {error}</p>;

  // Funcion para calcular el promedio de calificacion
  const calculateAverageRating = () => {
    if (!product.reviews || product.reviews.length === 0) return 0;

    const totalRating = product.reviews.reduce((sum: number, review: any) => sum + Number(review.rating), 0);
    return (totalRating / product.reviews.length).toFixed(1);
  };

  const averageRating = calculateAverageRating();

  // Función para renderizar estrellas
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-warning" />);
      } else if (i - 0.5 <= rating) {
        stars.push(<FaStarHalfAlt key={i} className="text-warning" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-secondary" />);
      }
    }
    return stars;
  };

  const deleteReview = async (review: any) => {
    await deleteReviews(review.id);

    location.reload();
  }

  return (
    <div className="container mt-4">
      <div className="row">

        {/* Imagen del producto */}
        <div className="col-md-4">
          <img
            src={product.img_url}
            alt={product.name}
            className="img-fluid border rounded"
          />
        </div>

        {/* Información del producto */}
        <div className="col-md-8">
          <h2 className="fw-bold">{product.name}</h2>
          <p>{product.description}</p>
          <h5 className="fw-bold text-info">Precio: ${product.price}</h5>
          <p className="fw-bold">
            Calificación: {averageRating} {renderStars(Number(averageRating))}
          </p>
        </div>
      </div>

      {/* Sección de reseñas */}

      {(isLoggedIn() && id && <div className="mt-4">
        <ReviewFrom productId={parseInt(id)} />
      </div>)}

      <div className="mt-4">
        <h3>Reseñas:</h3>
        {product.reviews && product.reviews.length > 0 ? (
          <div className="list-group">
            {product.reviews.map((review: any) => (
              <div key={review.id} className="list-group-item">
                {isLoggedIn() && <a href="#" onClick={e => deleteReview(review)} className="btn btn-danger">
                  <FaTrash></FaTrash>
                </a>}
                <p><strong>Usuario:</strong> {review.username || "Anónimo"}</p>
                <p><strong>Calificación:</strong> {renderStars(Number(review.rating))}</p>
                <p><strong>Comentario:</strong> {review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No hay reseñas para este producto.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;