import { useState } from 'react';
import { FaEnvelope } from 'react-icons/fa';
import { sendReview } from '../services/productDetailService';

const ReviewFrom = (props: {productId: number}) => {

    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState('');

    const send = async () => {
        await sendReview({rating, comment}, props.productId);

        location.reload()
    }

    return (
        <>
            <div className="mb-3">
                <label className="form-label">Calificación 1-5</label>
                <input type="number" value={rating} onChange={e => setRating(parseInt(e.target.value))} min={1} max={5} step={1} className="form-control" id="exampleFormControlInput1" placeholder="1" />
            </div>
            <div className="mb-3">
                <label className="form-label">Comentario</label>
                <textarea className="form-control" value={comment} maxLength={250} minLength={10} id="exampleFormControlTextarea1" onChange={e => setComment(e.target.value)} rows={3}></textarea>
            </div>

            <button onClick={send} className="btn btn-primary"><FaEnvelope /> Enviar</button>
        </>
    );
}

export default ReviewFrom;