import { FC, ReactElement, useState } from 'react';
import { connect } from "react-redux";
import { removeFromCart, changeQuantity } from '../../redux/cart/cartActions';
import CloseIcon from '@mui/icons-material/Close';
import './cart-item.styles.css';

export interface IOptions {
  type: string;
  value: string;
}

export interface ICartItem {
  name: string;
  id: string;
  defaultImage: string;
  quantity: number;
  priceCents: number;
  description: string;
  variantId: string;
  type: IOptions;
  variants: [{ priceCents: number }]
}

interface ICartItemProps {
  cartItem: ICartItem;
  removeFromCart: Function;
  changeQuantity: Function;
}

const CartItem: FC<ICartItemProps> = ({ cartItem, removeFromCart, changeQuantity }): ReactElement => {
  const { variantId, name, defaultImage, quantity, description, priceCents } = cartItem;

  const [quantityInput, setQuantityInput] = useState(quantity);

  const toDollars = (num: number) => {
    return num / 100;
  }

  const calculateItemTotal = (num: number, quantityInput: number) => {
    return toDollars(num) * quantityInput;
  }

  const onChangeInput = (event: any) => {
    setQuantityInput(Number(event.target.value));
    changeQuantity(variantId, Number(event.target.value));
  }

  return (
    <div className="cart-item-container">
      <img src={defaultImage} alt="Product"/>
      <div className="cart-item-details">
        <CloseIcon className="remove-item-icon" onClick={() => removeFromCart(variantId)} />
        <h4>{name}</h4>
        <span className="cart-item-description">{description}</span>
        <p> <b>Quantity: {quantity} </b></p>
        <span>
          <b>
            price: ${calculateItemTotal(priceCents, quantity).toFixed(2)} 
          </b>
        </span>

        <input
          min="1"
          type="number"
          id="quantity"
          name="quantity"
          value={quantityInput}
          onChange={onChangeInput}
        />
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: (arg0: any) => any) => {
  return {
    removeFromCart: (variantId:any) => dispatch(removeFromCart(variantId)),
    changeQuantity: (variantId:any, value:any) => dispatch(changeQuantity(variantId, value))
  }
}

export default connect(null, mapDispatchToProps)(CartItem);
