import { useDispatch, useSelector } from 'react-redux';

import { uiAction } from '../Store/ui-cart';
import classes from './CartButton.module.css';

const CartButton = (props) => {
  const dispatch = useDispatch();
  const cartQuantity = useSelector(state => state.cart.totalQuantity);

  const showCartHandler = () => {
    dispatch(uiAction.toggle());
  }

  return (
    <button className={classes.button} onClick={showCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;
