import { useDispatch, useSelector } from 'react-redux';

import { uiAction } from '../Store/ui-cart';
import classes from './CartButton.module.css';

const CartButton = (props) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cartItems);

  const showCartHandler = () => {
    dispatch(uiAction.toggle());
  }

  return (
    <button className={classes.button} onClick={showCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartItems.length}</span>
    </button>
  );
};

export default CartButton;
