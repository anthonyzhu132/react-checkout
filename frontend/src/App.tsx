import { useContext } from 'react';
import { useQuery } from 'react-query'
import { getProducts } from './api';
import { CartContext } from './cart-context';
import Cart from './components/cart/cart';
import ProductCard from './components/product-card/product-card';
import Navigation from './components/navigation/navigation';
import { connect } from "react-redux";
import { addProducts } from "./redux/cart/cartActions"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

/*
 *** NOTES ***

 TODO: Use react query to manage data

 TODO: Replaced temporary data with data fetched from /products api

 TODO: Add Redux to track cart items ASAP
 *** USER STORIES ***

 TODO: AS A USER I CAN SELECT OPTIONS PROVIDED BY A DROPDOWN
      // WHERE PRODUCT IS NOT DISCONTINUED || QUANTITY > 0 || PARENT PRODUCT IS NOT DISCONTINUED
 TODO: AS A USER I CAN SEE A LABEL "OUT OF STOCK"
      // WHERE VARIANTS ARE INVALID || PRODUCT IS DISCONTINUED
 TODO: AS A USER I CAN ADD VALID VARIANTS TO THE CART
 TODO: AS A USER I CAN CHANGE THE QUANTITY OF VARIANTS IN THE CART
 TODO: AS A USER I CAN REMOVE ITEMS FROM THE CART
*/

const App = ({ addProducts }: any) => {
  const { data } = useQuery(
    ['products'], () => getProducts(), {
      onSuccess: (data) => {
        const productsArray = data?.products;
        addProducts(productsArray)
      }
    }
  )

  const { isOpen } = useContext(CartContext);

  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        theme="colored"
        closeOnClick
        limit={2}
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        icon={false}
      />
      
      <Navigation />

      {isOpen ? <Cart /> : null}
      <div className="products-listing">
        {data?.products.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}

      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: (arg0: any) => any) => {
  return {
    addProducts: (productsArray: any) => dispatch(addProducts(productsArray))
  }
}

export default connect(null, mapDispatchToProps)(App);
