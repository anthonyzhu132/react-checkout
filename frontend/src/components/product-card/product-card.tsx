import { FC, ReactElement, useState } from "react";
import { connect } from "react-redux";
import "./product-card.styles.css";
import { addToCart } from "../../redux/cart/cartActions"

import { Chip, Button, Dialog } from '@mui/material';

import { toast } from "react-toastify";

export interface IOptions {
  type: string;
  value: string;
}

export interface IProduct {
  name: string;
  description: string;
  defaultImage: string;
  id: string;
  isDiscontinued: boolean;
  variants: [{ quantity: number, isDiscontinued: boolean, selectableOptions: IOptions[], priceCents: number, id: string, image: string }],
}

interface IProductCardProps {
  product: IProduct;
  addToCart: Function;
}

const ProductCard: FC<IProductCardProps> = ({ product, addToCart }): ReactElement => {
  const { name, defaultImage, description, isDiscontinued, variants, id } = product;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const isValid = () => {
    // Checking if item isn't valid
    if(!isDiscontinued) {
      // Checking if any variant isn't discontinued and is greater than 0
      const variantsValid = variants.some(variant => {
        return variant.isDiscontinued === false && variant.quantity > 0
      });
      return !variantsValid;
    }
    return true;
  }

  const onSubmit = (id:string) => {
    addToCart(id);
    toast('Item Added To Cart ✅');
  };

  return (
    <div className="product-card-container">
      <Chip className={`${!isValid() ? 'hidden' : ""}`} color="error" label="Out Of Stock"/>
      <img src={defaultImage} alt="Product" />
      <div className="product-card-details">
        <span className="product-name">{name} </span>
        <span className="product-description"> {description} </span>
      </div>

      <div>
        <Dialog
          open={open}
          className="variants-dialog"
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          fullWidth
        >
          {open ? 
              variants.map((variant) => {
                return (
                  <div key={variant.id} className="selection-container">
                    <img src={variant.image} alt="Product"/>
                    <div className="actions-container">
                      <p>Price: {variant.priceCents}</p>
                      <Button variant="contained" onClick={() => onSubmit(id)}>Add To Cart</Button>
                    </div>
                  </div>
                )
              }) 
            : 
              ""
          }
        </Dialog>
      </div>
      <div className="action-container">
        <Button disabled={isValid()} variant="contained" onClick={handleOpen}>VIEW ITEM</Button>
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
