"use server"

import { getUserToken } from "@/lib/auth";

export async function addProductTocart(productId: string) {


  const token = await getUserToken();

  if (!token) {
    throw new Error("You Are Not authenticated To Do This Actions");
  }

  const response = await fetch("https://ecommerce.routemisr.com/api/v2/cart", {
    method: "POST",
    body: JSON.stringify({ productId }),
    headers: {
      token: token as string,
      "Content-type": "application/json",
    },
  });

  const data = await response.json();

  return data;
}


export async function getCart() {


  const token = await getUserToken();

  if (!token) {
    throw new Error("Unauthenticated User");
  }

  const response = await fetch("https://ecommerce.routemisr.com/api/v2/cart", {
    method: "GET",
 
    headers: {
      token: token as string,
      "Content-type": "application/json",
    },
  });

  const data = await response.json();

  return data;
}


export async function removeProductFromCart(productId: string) {


  const token = await getUserToken();

  if (!token) {
    throw new Error("Unauthenticated User");
  }

  const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productId}`, {
    method: "DELETE",
    headers: {
      token: token as string,
      "Content-type": "application/json",
    },
  });

  const data = await response.json();

  return data;
}


export async function updateProductFromCart(productId: string, count : number) {


  const token = await getUserToken();

  if (!token) {
    throw new Error("Unauthenticated User");
  }

  const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productId}`, {
    method: "PUT",
      body: JSON.stringify({ count }),
    headers: {
      token: token as string,
      "Content-type": "application/json",
    },
  });

  const data = await response.json();

  return data;
}



export async function clearCart() {


  const token = await getUserToken();

  if (!token) {
    throw new Error("Unauthenticated User");
  }

  const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
    method: "DELETE",
    headers: {
      token: token as string,
      "Content-type": "application/json",
    },
  });

  const data = await response.json();

  return data;
}

