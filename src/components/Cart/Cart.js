import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";

export function showUniqueItems(items) {
  const uniqueItems = [];
  const track = new Map();

  for (let i = 0; i < items.length; i++) {
    if (track.has(items[i].title)) {
      let idx = track.get(items[i].title);
      uniqueItems[idx] = {
        ...uniqueItems[idx],
        quantity: Number(uniqueItems[idx].quantity) + Number(items[i].quantity),
        total: Number(uniqueItems[idx].total) + Number(items[i].total),
      };
    } else {
      uniqueItems.push(items[i]);
      track.set(items[i].title, uniqueItems.length - 1);
    }
  }
  return uniqueItems;
}

const Cart = (props) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const uniqueItems = showUniqueItems(cartItems);

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {uniqueItems.map((item) => (
          <CartItem
            key={item.id}
            item={{
              id: item.id,
              title: item.title,
              quantity: item.quantity,
              total: item.total,
              price: item.price,
            }}
          />
        ))}
      </ul>
    </Card>
  );
};

export default Cart;
