import React from "react";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { useBook } from '../../contexts/bookContext';

interface StarRatingProps {
    stars: number;
}

const StarRating: React.FC<StarRatingProps> = ({ stars }) => {
    const filledStars = Math.round(stars);
    const starArray = new Array(5).fill(false).map((_, index) => index < filledStars);

    return (
        <div className="flex">
            {starArray.map((isFilled, index) => (
                isFilled ? (
                    <FaStar key={index} style={{ color: '#FFD700', stroke: 'black', strokeWidth: 2, fontSize: '17px' }} />
                ) : (
                    <FaRegStar key={index} style={{ color: '#D3D3D3', stroke: 'black', fontSize: '17px', strokeWidth: 2 }} />
                )
            ))}
        </div>
    )
};

export default StarRating;
