import { useDispatch, useSelector } from 'react-redux';

import { cartAction } from '../Store/cart';
import classes from './CartButton.module.css';
import { showUniqueItems } from './Cart';

const CartButton = (props) => {
  const dispatch = useDispatch();
  const isCart = useSelector(state => state.cart.isCart);
  const cartItems = useSelector(state => state.cart.cartItems);

  const uniqueItems = showUniqueItems(cartItems)

  const showCartHandler = () => {
    dispatch(cartAction.setCart(true));
  }

  const closeCartHandler = () => {
    dispatch(cartAction.setCart(false));
  }

  return (
    <button className={classes.button} onClick={isCart ? closeCartHandler : showCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{uniqueItems.length}</span>
    </button>
  );
};

export default CartButton;
