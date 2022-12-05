import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCart, getProductsByIds, saveCart } from "../Api";
import { CartContext } from "../Contexts";
import { withUser } from "../withProvider";

type CartProvicerProps = { isLoggedIn: boolean; children: any };

const CartProvider: FC<CartProvicerProps> = ({ isLoggedIn, children }) => {
  const [cart, setCart] = useState([]);

  useEffect(
    function () {
      if (isLoggedIn) {
        getCart().then(function (savedCart) {
          setCart(savedCart);
          // setLoading(false);
        });
      } else {
        const savedDataString = localStorage.getItem("my-cart") || "{}";
        const savedData = JSON.parse(savedDataString);
        quantityMapToCart(savedData);
        // setLoading(false);
      }
    },
    [isLoggedIn]
  );

  // if (loading) {
  //   return <Loading />;
  // }

  function quantityMapToCart(quantityMap) {
    getProductsByIds(Object.keys(quantityMap)).then(function (products) {
      const savedCart = products.map((p) => ({
        product: p,
        quantity: quantityMap[p.id],
      }));

      setCart(savedCart);
    });
  }

  function addToCart(productId, count) {
    const quantityMap = cart.reduce(
      (m, cartItem) => ({ ...m, [cartItem.product.id]: cartItem.quantity }),
      {}
    );

    const oldCount = quantityMap[productId] || 0;

    const newCart = { ...quantityMap, [productId]: oldCount + count };
    updateCart(newCart);
  }

  function updateCart(quantityMap) {
    if (isLoggedIn) {
      saveCart(quantityMap).then(function (response) {
        //   setCart(response);
        quantityMapToCart(quantityMap);
      });
    } else {
      const quantityMapString = JSON.stringify(quantityMap);
      localStorage.setItem("my-cart", quantityMapString);
      quantityMapToCart(quantityMap);
    }
  }

  const cartCount = cart.reduce(function (previous, current) {
    return previous + current.quantity;
  }, 0);

  return (
    <CartContext.Provider value={{ cart, cartCount, updateCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default withUser(CartProvider);
// getCart().then(function (savedCart)
