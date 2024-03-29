// pages/cart.tsx
import React, { useMemo } from 'react';
import { FaTrashAlt } from 'react-icons/fa'; // For delete icon
import { useCart } from '../contexts/cartContext';
import styles from './CartPage.module.css'; // Adjust the import path
import NavBar from '@/components/NavBar';

const CartPage = () => {
    const { cartItems, removeFromCart } = useCart();

    const totalPrice = useMemo(() => cartItems.reduce((res, cur) => res += (cur.price * cur.quantity) / 100, 0), [cartItems])

    return (
        <div className={styles.container}>
            <NavBar onSearch={() => { }} />
            <div className={styles.modal}>
                <h1>Shopping Cart</h1>
                {cartItems.map((item) => (
                    <div key={item.id} className={styles.cartItem}>
                        <span className={styles.cartSpan}>
                            <img className={styles.iconCircle} src={item.image} alt={item.name} />
                            <span className={styles.productName}>{item.name} ({item.quantity})</span>
                        </span>
                        <span className={styles.cartSpan}>
                            <span className={styles.productPrice}>${(item.price * item.quantity) / 100}</span>
                            <FaTrashAlt className={styles.deleteIcon} onClick={() => removeFromCart(item.id)} />
                        </span>
                    </div>
                ))}
                <div>
                    <div>
                        Total: ${(totalPrice).toFixed(2)}
                    </div>
                    <div>
                        Tax: ${(totalPrice * 5 / 100).toFixed(2)}
                    </div>
                    <div>
                        Final Price: ${(totalPrice * 105 / 100).toFixed(2)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
