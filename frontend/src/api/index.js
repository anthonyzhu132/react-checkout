import axios from 'axios';

export const getProducts = async () => {
  const { data } = await axios.get('http://localhost:8000/products');

  return data;
};