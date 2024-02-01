// components/NavBar.tsx
import Link from 'next/link';
import { FaHome, FaShoppingCart, FaSearch } from 'react-icons/fa';
import { useCart } from '../contexts/cartContext';
import styles from './NavBar.module.css'; // You may need to adjust the styles

interface NavBarProps {
    onSearch: (value: string) => void;
  }

const NavBar = ({ onSearch }: NavBarProps) => {
    const { cartItems } = useCart();
    const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <div className={styles.navBar}>
            <div className={styles.navLeft}>
                <h2>BURGER</h2>
                <Link href="/">
                    <FaHome />
                </Link>
            </div>
            <div className={styles.navRight}>
                <div className={styles.searchWrapper}>
                    <FaSearch className={styles.searchIcon}/>
                    <input
                        type="text"
                        placeholder="Type to search."
                        className={styles.searchInput}
                        onChange={(e) => onSearch(e.target.value)}
                    />
                </div>
                <Link href="/cart">
                    <div className={styles.cartWrapper}>
                        <FaShoppingCart />
                        {totalItemsInCart > 0 && (
                            <span className={styles.cartBadge}>{totalItemsInCart}</span>
                        )}
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default NavBar;
