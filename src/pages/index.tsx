import { Product } from '@/types';
import Link from 'next/link';
import styles from './HomePage.module.css';
import { useState } from 'react';
import NavBar from '@/components/NavBar';

interface Props {
    products: Product[];
}

export async function getStaticProps() {
    const res = await fetch('https://burgerhub00.github.io/data/products.json');
    const products = (await res.json())?.products;

    return {
        props: {
            products: products ?? []
        }
    };
}

const HomePage = ({ products = [] }: Props) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={styles.container}>
            <NavBar onSearch={setSearchQuery} />

            <div className={styles.productGrid}>
                {filteredProducts.map((product) => (
                    <Link href={`/product/${product.id}`} key={product.id}>
                        <div className={styles.productCard}>
                            <img src={product.image} alt={product.name} className={styles.productImage} />
                            <div className={styles.productInfo}>
                                <h3 className={styles.productTitle}>{product.name}</h3>
                                <p className={styles.productPrice}>${product.price / 100}</p>
                                <p className={styles.productDescription}>{product.description}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default HomePage;