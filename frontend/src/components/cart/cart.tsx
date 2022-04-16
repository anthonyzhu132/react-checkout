import { useContext, FC } from 'react';

import CartItem from '../cart-item/cart-item';
import { CartContext } from '../../cart-context';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { connect } from "react-redux";

import './cart.styles.css';

interface ICartProps {
  cart: [];
}

const Cart: FC<ICartProps> = ({ cart }) => {
  let total = 0;
  const { setIsOpen } = useContext(CartContext);
  const closeCart = () => setIsOpen(false);

  //Function takes in a number (priceCents) and divides it by 100 to convert to dollar
  const toDollars = (num: number) => {
    return num / 100;
  }

  //Function maps through provided cart, and returns total price by multiplying priceCents (converted) with quantity
  const totalPrice = (cart: []) => {
    cart.map((item: any) => {
      return total += toDollars(item.priceCents) * item.quantity
    })
    return total.toFixed(2);
  }

  return (
    <div className="cart-modal">
      <div className="cart-container">
        <ArrowForwardIcon className="close-button" onClick={closeCart} />
        <div className="cart-items-container">
          {cart.map((item: any) => (
            <CartItem cartItem={item} key={item.id}/>
          ))}
        </div>
        <div className="total-container">
          <span>Total: ${totalPrice(cart)}</span>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    cart: state.cart.cart
  }
}

export default connect(mapStateToProps)(Cart);
