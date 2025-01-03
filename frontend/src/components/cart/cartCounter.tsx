import React, { useEffect, useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import { CiSquareMinus } from "react-icons/ci";
import { useCart } from "../../contexts/cartContext";
import '../bookDescription/custom.css';

interface CartCounterProps {
    availableCopies: number;
    onQuantityChange: (quantity: number) => void;
    cartProductId: string;
}

const CartCounter: React.FC<CartCounterProps> = ({ availableCopies, onQuantityChange, cartProductId }) => {
    const [quantity, setQuantity] = useState(1);
    const { cart, updateCart, fetchCart } = useCart();

    const quantityFromDatabase = (cart.find(item => item.productId?._id === cartProductId))?.quantity

    useEffect(() => {
        if (quantityFromDatabase !== undefined) {
            setQuantity(quantityFromDatabase);
        }
    }, [quantityFromDatabase]);

    useEffect(() => {
        onQuantityChange(quantity);
    }, [quantity, onQuantityChange]);

    const incrementQuantity = () => {
        if (quantity < availableCopies) {
            const newQuantity = quantity + 1;
            setQuantity(newQuantity);
            updateCart(cartProductId, newQuantity);
            fetchCart();
        }
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            updateCart(cartProductId, newQuantity);
            fetchCart();
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value >= 1 && value <= availableCopies) {
            setQuantity(value);
            updateCart(cartProductId, value);
            fetchCart();
        }
    };

    return (
        <div className='flex items-center mr-3'>
            <button onClick={decrementQuantity}><CiSquareMinus className='size-7 text-primary_3' /></button>
            <input
                type="number"
                value={quantity}
                onChange={handleInputChange}
                className="w-12 text-center bg-inherit"
                min="1"
                max={availableCopies}
            />
            <button onClick={incrementQuantity} disabled={quantity >= availableCopies}><CiSquarePlus className='size-7 text-primary_3' /></button>
        </div>
    )
}

export default CartCounter;
