"use client";
import React, { useContext, useState } from "react";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { addProductTocart } from "@/actions/cart.action";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { CartContext } from "@/provider/cart-provider";
import { redirect } from "next/navigation";

export default function AddToCartBtn({ prodId }: { prodId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const { getCartData } = useContext(CartContext);

  async function addToCart(productId: string) {
    try {
      setIsLoading(true);
      const response = await addProductTocart(productId);
      // console.log(response);
      getCartData();
      toast.success(response.message);
    } catch (error) {
      toast.error((error as Error).message);
      redirect("/login")
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      <Button
        disabled={isLoading}
        onClick={() => addToCart(prodId)}
        className="grow cursor-pointer"
      >
        {isLoading ? <Spinner /> : <ShoppingCart />}
        Add To Cart
      </Button>
    </>
  );
}
