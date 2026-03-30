import React, { useContext, useEffect, useState } from "react";
import { Card } from "../ui/card";
import { cartProductI } from "../../../types/cart.type";
import Image from "next/image";
import {
  removeProductFromCart,
  updateProductFromCart,
} from "@/actions/cart.action";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { CartContext } from "@/provider/cart-provider";

export default function CartItem({
  item,
  setProducts,
}: {
  item: cartProductI;
  setProducts: (products: cartProductI[]) => void;
}) {
  // console.log(item);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUpdateInc, setIsLoadingUpdateInc] = useState(false);
  const [isLoadingUpdateDec, setIsLoadingUpdateDec] = useState(false);

  const [productCounter, setProductCounter] = useState(0);

  const { getCartData } = useContext(CartContext);

  useEffect(() => {
    setProductCounter(item.count);
  }, [item, setProducts]);

  async function removeProduct(prodId: string) {
    try {
      setIsLoading(true);
      const response = await removeProductFromCart(prodId);
      // console.log(response);
      toast.success(response.message);
      setProducts(response.data.products);
      getCartData();
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

  async function updateCart(prodId: string, count: number) {
    try {
      // setIsLoadingUpdate(true)
      if (count > productCounter) {
        setIsLoadingUpdateInc(true);
      } else {
        setIsLoadingUpdateDec(true);
      }
      const response = await updateProductFromCart(prodId, count);
      // console.log(response);
      toast.success(response.message);
      //   setUpdateCounter(response.data.)
      setProducts(response.data.products);
      getCartData();
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
    } finally {
      setIsLoadingUpdateDec(false);
      setIsLoadingUpdateInc(false);
    }
  }

  return (
    <>
      <Card className="p-6 shadow-md">
        <div className="flex gap-6">
          {/* Product Image */}
          <div className="w-24 h-24 bg-gray-200 rounded shrink-0 relative overflow-hidden">
            <Image
              src={item.product.imageCover}
              alt="Product"
              fill
              className="object-cover rounded"
              sizes="200"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-black text-lg mb-1">
                {item.product.title}
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                {item.product.brand.name} {item.product.category.name}
              </p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-300 rounded">
                <button
                  disabled={isLoadingUpdateDec}
                  onClick={() =>
                    updateCart(item.product._id, productCounter - 1)
                  }
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l
                    disabled:cursor-not-allowed 
                    "
                >
                  {isLoadingUpdateDec ? <Spinner /> : "-"}
                </button>
                <span className="px-4 py-1 border-x border-gray-300">
                  {productCounter}
                </span>
                <button
                  disabled={isLoadingUpdateInc}
                  onClick={() =>
                    updateCart(item.product._id, productCounter + 1)
                  }
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r
                    disabled:cursor-not-allowed 
                    "
                >
                  {isLoadingUpdateInc ? <Spinner /> : "+"}
                </button>
              </div>
            </div>
          </div>

          {/* Price and Remove */}
          <div className="flex flex-col items-end justify-between">
            <div className="font-bold text-black text-lg mb-2">

              <p className="text-sm text-gray-400">Unit Price: {item.price} /Item EGP</p>
              <p className="text-lg ">Total Price: {item.price * item.count} EGP</p>
            </div>
            <button
              onClick={() => removeProduct(item.product._id)}
              className="text-red-500 text-sm hover:underline border cursor-pointer border-red-500 rounded-md px-4 py-2"
            >
              {isLoading ? <Spinner /> : "Remove"}
            </button>
          </div>
        </div>
      </Card>
    </>
  );
}
