import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CHANGE_QUANTITY,
  ADD_PRODUCTS
} from "./cartTypes";

const INITIAL_STATE = {
  products: [],
  cart: [],
}

const cartReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case ADD_PRODUCTS:
      return {
        ...state,
        products: action.payload.products
      }
    case ADD_TO_CART:
      // Great Item data from products array
      const parentProduct = state.products.find((product) => product.id === action.payload.id);

      // Find that specific variant
      const variant = parentProduct.variants.find((variant) => variant.id === action.payload.variantId);

      // Find type & value pair with typeIndex in selectableOptions
      const type = variant.selectableOptions[action.payload.typeIndex];

      // Check if Item is in cart already
      const inCart = state.cart.find((item) => item.variantId === action.payload.variantId ? true : false);

      // If it's in the cart, return cart state and modify item quantity
      if (inCart) {
        return {
          ...state,
          cart: state.cart.map((item) =>
          item.variantId === action.payload.variantId ?
          {...item, quantity: item.quantity + 1} : item) 
        }
      } else {
        // create cart item object with fields needed for cartItem to display
        const item = {
          id: parentProduct.id,
          variantId: variant.id,
          name: parentProduct.name,
          defaultImage: variant.image,
          priceCents: variant.priceCents,
          quantity: 1,
          description: parentProduct.description,
          type: type
        }
        //Return state with new item object
        return {
          ...state,
          cart: [...state.cart, item ]
        }
      }
    case REMOVE_FROM_CART:
      return {
        ...state
      }
    case CHANGE_QUANTITY:
      return {
        ...state
      }
    default:
      return state;
  }
}

export default cartReducer;