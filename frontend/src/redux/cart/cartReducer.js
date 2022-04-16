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
      return {
        ...state
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