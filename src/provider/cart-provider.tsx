"use client";
import { getCart } from "@/actions/cart.action";
import React, { createContext, useEffect, useState } from "react";
import { cartI } from "../../types/cart.type";
import { useSession } from "next-auth/react";

interface cartContextI {
  noOfCartItems: number;
  getCartData: () => void;
  isLoading: boolean;
  totalCartPrice: number;
  cartId: string;
}

export const CartContext = createContext<cartContextI>({
  noOfCartItems: 0,
  getCartData: () => {},
  isLoading: false,
  totalCartPrice: 0,
  cartId: "",
});

export default function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [noOfCartItems, setNoOfCartItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCartPrice, settotalCartPrice] = useState(0);
  const [cartId, setCartId] = useState("");

  const { status } = useSession();

  async function getCartData() {
    try {
      setIsLoading(true);
      const response: cartI = await getCart();
      // console.log(response);

      const totalCartItems = response.data.products.reduce(
        (acc, product) => acc + product.count,
        0,
      );
      setNoOfCartItems(totalCartItems);
      settotalCartPrice(response.data.totalCartPrice);
      setCartId(response.cartId);
    } catch (error) {
      // console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (status === "unauthenticated") return;

    if (status === "authenticated") {
      getCartData();
    }
  }, [status]);

  return (
    <CartContext.Provider
      value={{ noOfCartItems, getCartData, isLoading, totalCartPrice, cartId }}
    >
      {children}
    </CartContext.Provider>
  );
}
