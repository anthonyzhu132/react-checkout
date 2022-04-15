import { FC, ReactElement } from "react";

import "./product-card.styles.css";

export interface IProduct {
  name: string;
  description: string;
  defaultImage: string;
  id: string;
  isDiscontinued: boolean;
}

interface IProductCardProps {
  product: IProduct;
}

const ProductCard: FC<IProductCardProps> = ({ product }): ReactElement => {
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

export default ProductCard;
