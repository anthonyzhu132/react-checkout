import { useContext } from 'react';
import { CartContext } from './cart-context';
import Cart from './components/cart/cart';
import ProductCard from './components/product-card/product-card';
import Navigation from './components/navigation/navigation';
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


// REPLACE WITH API FETCHED ITEMS
const TEMPORARY_ITEMS = [
  {
    id: 1,
    name: 'Hat',
    description:
      'Fashion moves so quickly that, unless you have a strong point of view, you can lose integrity.',
    imageSrc:
      'https://media.istockphoto.com/photos/hat-on-white-background-picture-id526131500?b=1&k=20&m=526131500&s=170667a&w=0&h=TVhckgzmxLZ6b1V74eel7XbFy73tldESzBcH0ZG6g0c=',
  },
  {
    id: 2,
    name: 'Shirt',
    description: 'Fashion never stops. There is always the new project, the new opportunity.',
    imageSrc:
      'https://media.istockphoto.com/photos/blank-white-tshirt-front-with-clipping-path-picture-id482948743?b=1&k=20&m=482948743&s=170667a&w=0&h=DetzN8rTsgQDTyBDSWvc7gUNz0gae0CUQecM-KNN3WY=',
  },
];

const App = () => {
  const { isOpen } = useContext(CartContext);

  return (
    <div className="App">
      <Navigation />
      {isOpen ? <Cart /> : null}
      <div className="products-listing">
        {TEMPORARY_ITEMS.map((productItem) => (
          <ProductCard key={productItem.id} product={productItem} />
        ))}
      </div>
    </div>
  );
};

export default App;
