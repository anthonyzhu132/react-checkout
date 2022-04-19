import { ADD_TO_CART, REMOVE_FROM_CART, CHANGE_QUANTITY, ADD_PRODUCTS } from "./cartTypes";

export const removeFromCart = (variantId) => {
  return {
    type: REMOVE_FROM_CART,
    payload: {
      variantId
    },
  };
};

export const addToCart = (id, variantId, typeIndex) => {
  return {
    type: ADD_TO_CART,
    payload: {
      id,
      variantId,
      typeIndex
    },
  };
};

export const changeQuantity = (id, value) => {
  return {
    type: CHANGE_QUANTITY,
    payload: {
      id,
      quantity: value
    },
  };
};

export const addProducts = (products) => {
  return {
    type: ADD_PRODUCTS,
    payload: {
      products
   },
  };
};