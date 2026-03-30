import { getUserToken } from "@/lib/auth";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function Brands() {
  const data = await getServerSession(authOptions);

  console.log(data, "session data");
  if(!data){

    redirect("/login")
  }

  // const myToken =await getUserToken();

  // console.log(myToken);

  return <div>Brands</div>;
}
