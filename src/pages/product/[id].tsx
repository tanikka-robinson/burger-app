import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { Product } from '@/types';
import { useCart } from '@/contexts/cartContext';
import NavBar from '@/components/NavBar';
import styles from './ProductPage.module.css';
import { FaArrowLeft } from "react-icons/fa";

interface ProductPageProps {
  product: Product | null;
}

const ProductPage: NextPage<ProductPageProps> = ({ product }) => {
  const router = useRouter();

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!product) {
      return;
    }
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    });
    router.push('/cart');
  };

  if (router.isFallback || !product) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <NavBar onSearch={() => {}}/>
      <div className={styles.modal}>
        <button className={styles.goBackButton} onClick={() => router.back()}>
          <FaArrowLeft />
          Go Back
        </button>
        <img src={product.image} alt={product.name} className={styles.productImage} />
        <h2>{product.name}</h2>
        <p>${product.price / 100}</p>
        <p>{product.description}</p>
        <p>Calories: {product.calorie}</p>
        <button className={styles.addToCartButton} onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const response = await fetch('https://burgerhub00.github.io/data/products.json');
    const products: { id: string }[] = (await response.json())?.products ?? [];
  
    const paths = products.map((product) => ({
      params: { id: product.id },
    }));
  
    return { paths, fallback: 'blocking' };
  };
  

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const id = params?.id as string;
  const response = await fetch('https://burgerhub00.github.io/data/products.json');
    const products: { id: string }[] = (await response.json())?.products ?? [];

  const product: Product = products.find((product) => product.id === id) as Product ?? {
    id: id,
    name: "Burger A",
    price: 499,
    image: "https://images.unsplash.com/photo-1596662951482-0c4ba74a6df6",
    description: "A classic beef patty topped with lettuce, tomato, and our special sauce, served in a sesame seed bun.",
    calorie: 760,
    slug: "burger-a"
  };

  return {
    props: {
      product,
    },
    revalidate: 60,
  };
};

export default ProductPage;
