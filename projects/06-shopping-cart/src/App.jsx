import { Products } from './components/Products.jsx';
import { products as initialProducts } from './mocks/products.json';
import { Header } from './components/Header.jsx';
import { Footer } from './components/Footer.jsx';
import { useFilters } from './hooks/useFilters.js';
import { CartProvider } from './context/cart.jsx';

function App() {
  const { filterProducts } = useFilters();

  const filteredProducts = filterProducts(initialProducts);

  return (
    <>
      <CartProvider>
        {/* prop drilling */}
        {/* <Header changeFilters={setFilters} /> */}
        {/* with context */}
        <Header />

        <Products products={filteredProducts} />

        {/* prop drilling */}
        {/* <Footer filters={filters} /> */}
        {/* with context */}
        <Footer />
      </CartProvider>
    </>
  );
}

export default App;
