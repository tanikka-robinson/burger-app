import { AppProps } from 'next/app';
import { CartProvider } from '../contexts/cartContext'; // Adjust the path as necessary
import '../globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  );
}

export default MyApp;
