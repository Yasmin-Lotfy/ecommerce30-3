"use server"

import { getUserToken } from "@/lib/auth";
import { checkoutI } from "../../types/cart.type";

export async function cashCheckOut(shippingData: checkoutI,   cardId: string) {


  const token = await getUserToken();

  if (!token) {
    throw new Error("You Are Not authenticated To Do This Actions");
  }

  const response = await fetch(`https://ecommerce.routemisr.com/api/v2/orders/${cardId}`, {
    method: "POST",
    body: JSON.stringify({ shippingData }),
    headers: {
      token: token as string,
      "Content-type": "application/json",
    },
  });

  const data = await response.json();

  return data;
}
