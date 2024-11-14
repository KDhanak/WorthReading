import React, { useEffect, useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import { CiSquareMinus } from "react-icons/ci";
import './custom.css'

interface CounterProps {
    availableCopies: number;
    onQuantityChange: (quantity: number) => void;
}

const Counter: React.FC<CounterProps> = ({ availableCopies, onQuantityChange }) => {
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        onQuantityChange(quantity);
    }, [quantity, onQuantityChange]);

    const incrementQuantity = () => {
        if (quantity < availableCopies) {
            setQuantity(prevQuantity => prevQuantity + 1);
        }
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    }

    const handleInputChange = (e: any) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value >= 1) {
            setQuantity(value);
        }
    };

    return (
        <div className='flex items-center mr-3'>
            <button onClick={decrementQuantity}><CiSquareMinus className='size-7 text-primary_3' /></button>
            <input
                type="number"
                value={quantity}
                onChange={handleInputChange}
                className="w-16 text-center bg-primary_1"
                min="1"
            />
            <button onClick={incrementQuantity}><CiSquarePlus className='size-7 text-primary_3' /></button>
        </div>
    )
}

export default Counter;
