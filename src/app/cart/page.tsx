"use client";
import { clearCart, getCart } from "@/actions/cart.action";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { cartI, cartProductI } from "../../../types/cart.type";
import CartItem from "@/components/cart/cart-item";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import { CartContext } from "@/provider/cart-provider";
import { CheckoutModal } from "@/components/cart/checkout-modal";

export default function Cart() {
  const [products, setProducts] = useState<cartProductI[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingClear, setIsLoadingClear] = useState(false);

  const { getCartData , noOfCartItems , totalCartPrice} = useContext(CartContext);

  async function getAllProductCart() {
    try {
      setIsLoading(true);
      const response: cartI = await getCart();
      //  console.log(response);
      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function clearOurCart() {
    try {
      setIsLoadingClear(true);
      const response = await clearCart();
      console.log(response);
      setProducts(response.data.products);
      getCartData();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingClear(false);
    }
  }

  useEffect(() => {
    getAllProductCart();

    // call get cart
  }, []);

  if (isLoading) {
    return (
      <>
        <div className="flex h-screen items-center justify-center flex-col gap-6">
          <div className="nav-logo ">
            <div className="bg-black w-10 h-10 text-white flex items-center justify-center rounded-lg">
              S
            </div>
            ShopMart
          </div>

          {/*  spinner */}
          <Spinner className="size-8" />
          <p>Loading Cart..............</p>
        </div>
      </>
    );
  }

  if (products.length === 0) {
    return (
      <>
        <div className="flex h-screen items-center justify-center flex-col gap-6">
          <Link
            href="/products"
            className="inline-flex h-16 min-w-56 items-center justify-center rounded-2xl border-2 border-black bg-black px-10 text-xl font-bold text-white transition-colors hover:bg-white hover:text-black"
          >
            Go Shopping
          </Link>

          {/*  spinner */}

          <p>Your Cart is Empty..............</p>
        </div>
      </>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      {/* Clear Cart Button */}
      <div className="flex justify-end mt-6">
        <button
          onClick={() => clearOurCart()}
          className="flex cursor-pointer items-center gap-2 text-red-500 hover:underline border border-red-500 rounded-md px-4 py-2"
        >
          {isLoadingClear ? <Spinner /> : <Trash2 className="w-4 h-4 " />}
          <span>Clear Cart</span>
        </button>
      </div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-black mb-2">Shopping Cart</h1>
        <p className="text-gray-500 text-sm">{noOfCartItems} items in your cart</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column - Cart Items */}
        <div className="flex-1 space-y-5">
          {products &&
            products.map((product) => (
              <CartItem
                key={product._id}
                item={product}
                setProducts={setProducts}
              />
            ))}
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:w-96">
          <Card className="p-6 shadow-md">
            <h2 className="font-bold text-black text-xl mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              {/* Subtotal */}
              <div className="flex justify-between items-center">
                <span className="text-black">Subtotal :{noOfCartItems} items</span>
                <span className="text-black">{totalCartPrice} EGP</span>
              </div>

              {/* Shipping */}
              <div className="flex justify-between items-center">
                <span className="text-black">Shipping</span>
                <span className="text-green-600">Free</span>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <span className="font-bold text-black">Total</span>
                <span className="font-bold text-black">{totalCartPrice} EGP</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
            
              <CheckoutModal/>
              <Button className="w-full bg-black text-white hover:bg-black/90 h-12 rounded-md">
              <Link href="/products">
                   Continue Shopping
              </Link>
           
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
