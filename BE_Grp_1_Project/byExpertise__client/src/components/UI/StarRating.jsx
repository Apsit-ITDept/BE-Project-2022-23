import { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({ onChange }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseOver = (event) => {
    const rating = parseInt(event.currentTarget.getAttribute("data-value"));
    setHoverRating(rating);
  };

  const handleMouseOut = () => {
    setHoverRating(0);
  };

  const handleClick = (event) => {
    const rating = parseInt(event.currentTarget.getAttribute("data-value"));
    setRating(rating);
    onChange && onChange(rating);
  };

  return (
    <div>
      {[...Array(5)].map((_, i) => {
        const ratingValue = i + 1;
        const isFilled = ratingValue <= (hoverRating || rating);
        const fill = isFilled ? "#ffc107" : "#e4e5e9";

        return (
          <FaStar
            key={i}
            data-value={ratingValue}
            size={24}
            color={fill}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onClick={handleClick}
            style={{ marginRight: "5px", cursor: "pointer" }}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
