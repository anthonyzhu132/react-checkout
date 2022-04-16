import { FC, ReactElement, useState } from "react";
import { connect } from "react-redux";
import "./product-card.styles.css";
import { addToCart } from "../../redux/cart/cartActions"
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Chip, Button, Dialog, MenuItem } from '@mui/material';

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
  const [typeIndex, setTypeIndex] = useState(-1);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //Function that tracks the change of selector, and sets index state to track which variant is selected
  const handleChange = (event: SelectChangeEvent) => {
    setTypeIndex(+event.target.value);
  };

  //Function that that checks if the parent is valid, as well as child (variants) are valid.
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

  //Function that fires action to add to cart, as well as user feedback with toast
  const onSubmit = (id:string, variantId:string, typeIndex:number) => {
    addToCart(id, variantId, typeIndex);
    toast('Item Added To Cart ✅');
  };

  //Function that converts priceCents to dollars, with currency.
  const convertToDollars = (cents:number) => {
    let total = cents /= 100;
    return total.toLocaleString("en-US", {style:"currency", currency:"CAD"});
  }

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

          {/* 
          - Checks if dialog is open, if it is open
          - If open, will map through all of the variants
          - If variant is valid, return the variant card, with a select and add to cart button
          - Maps through all of the selectable options for each variant, and creates a menu item for user to select and submit.
          */}
          {open ?
              variants.map((variant) => {
                if (variant.isDiscontinued === false && variant.quantity > 0) {
                  return (
                    <div key={variant.id} className="selection-container">
                      <img src={variant.image} alt="Product"/>

                      <div className="actions-container">
                        <p>Price: {convertToDollars(variant.priceCents)}</p>
                        <Select
                          labelId="variant-select-label-id"
                          id="variant-select-id"
                          defaultValue=""
                          label="type"
                          onChange={handleChange}
                        >
                          {variant.selectableOptions.map((option, index) => (
                            <MenuItem key={Math.random()} value={index}> {option.type} : {option.value}</MenuItem>
                          ))}
                        </Select>
                        <Button variant="contained" onClick={() => onSubmit(id, variant.id, typeIndex)}>Add To Cart</Button>
                      </div>
                    </div>
                  )
                }
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
    addToCart: (id:string, variantId:string, typeIndex:number) => dispatch(addToCart(id, variantId, typeIndex))
  }
}

export default connect(null, mapDispatchToProps)(ProductCard);
