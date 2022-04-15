import { FC, ReactElement } from "react";
import { connect } from "react-redux";
import "./product-card.styles.css";
import { addToCart } from "../../redux/cart/cartActions"

import { Chip, Button, Dialog, MenuItem } from '@mui/material';

export interface IProduct {
  name: string;
  description: string;
  defaultImage: string;
  id: string;
  isDiscontinued: boolean;
}

interface IProductCardProps {
  product: IProduct;
  addToCart: Function;
}

const ProductCard: FC<IProductCardProps> = ({ product, addToCart }): ReactElement => {
  const { name, defaultImage, description } = product;

  return (
    <div className="product-card-container">
      <img src={defaultImage} alt="Product" />
      <div className="product-card-details">
        <span className="product-name">{name} </span>
        <span className="product-description"> {description} </span>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: (arg0: any) => any) => {
  return {
    addToCart: (id:string) => dispatch(addToCart(id))
  }
}

export default connect(null, mapDispatchToProps)(ProductCard);
