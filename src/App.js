import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";

function App() {
  const isCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const [isNotification, setIsNotification] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function updateCartData() {
      setIsNotification(true);
      setTitle(`Sending...`);
      setMessage("Sending cart data!");
      try {
        const res = await fetch(
          `https://expensetracker-6f9fd-default-rtdb.firebaseio.co/cart.json`,
          {
            method: "PUT",
            body: JSON.stringify(cart),
          }
        );
        const data = await res.json();
        if (res.ok) {
          setTitle(`Success!`);
          setMessage("Sending cart data successfully!");
          setStatus("success");
          console.log("Successfully updated data", data);
        }
      } catch (err) {
        console.log(err);
        setTitle(`Error!`);
        setMessage("Sending cart data Failed!");
        setStatus("error");
      }
      setTimeout(() => {
        setIsNotification(false);
        setStatus('')
      }, 3000);
    }
    updateCartData();
  }, [cart]);

  return (
    <>
      {isNotification && (
        <Notification title={title} message={message} status={status} />
      )}
      <Layout>
        {isCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
