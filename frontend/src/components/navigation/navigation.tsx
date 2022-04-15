import { useContext } from "react";

import { CartContext } from "../../cart-context";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import "./navigation.styles.css";

const Navigation = () => {
  const { isOpen, setIsOpen } = useContext(CartContext);

  const toggleCart = () => setIsOpen(!isOpen);

  return (
    <nav className="navigation-bar">
      <ShoppingCartIcon className="cart-icon" onClick={toggleCart} />
    </nav>
  );
};

export default Navigation;
