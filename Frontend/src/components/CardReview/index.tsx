import { Review } from 'types/Review';
import Star from 'assets/images/star.png';

import './styles.css';

type Props = {
  review: Review;
};
const CardReview = ({ review }: Props) => {
  return (
    <div className="card-review-container" key={review.id}>
      <div className="card-review-title">
        <img src={Star} alt="star" />
        <h6>{review.user.name}</h6>
      </div>
      <p>{review.text} </p>
    </div>
  );
};

export default CardReview;
