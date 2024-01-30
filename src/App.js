import { useSelector, useDispatch } from "react-redux";
import { Fragment, useEffect } from "react";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { uiAction } from "./components/Store/ui-cart";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const isCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    async function sendCartData() {
      try {
        dispatch(uiAction.showNotification({
          status: 'pending',
          title: 'Sending...',
          message: 'Sending cart data!',
        }))
        const res = await fetch(
          `https://expensetracker-6f9fd-default-rtdb.firebaseio.com/cart.json`,
          {
            method: "PUT",
            body: JSON.stringify(cart),
          }
        );
        
        if (!res.ok) {
          throw new Error('Sending cart data failed.');
        }

        dispatch(uiAction.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent cart data successfully!',
        }))
        
      } catch (err) {
        console.log(err);
        dispatch(uiAction.showNotification({
          status: 'error',
          title: 'Error...',
          message: 'Sending cart data failed!',
        }))
      }
    }

    if(isInitial) {
      isInitial = false;
      return;
    }
    sendCartData();
    
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && <Notification
      status={notification.status}
      title={notification.title}
      message={notification.message}
      />}
      <Layout>
        {isCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
