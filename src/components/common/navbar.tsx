"use client";
import Link from "next/link";
import React, { useContext } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Heart, ShoppingCart, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { signOut, useSession } from "next-auth/react";
import { CartContext } from "@/provider/cart-provider";
import { Spinner } from "../ui/spinner";
export default function Navbar() {
  const { data: session, status } = useSession();

  console.log(status);
  


const {noOfCartItems , isLoading } = useContext(CartContext)


  function handleLogout(){

    signOut({callbackUrl:"/login"})
  }

  return (
    <>
      <nav className="bg-gray-100 p-5 fixed top-0 w-full z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="nav-logo ">
            <Link className="text-3xl font-bold flex gap-2 " href="/">
              <div className="bg-black w-10 h-10 text-white flex items-center justify-center rounded-lg">
                S
              </div>
              ShopMart
            </Link>
          </div>

          <div className="nav-links">
            <NavigationMenu>
              <NavigationMenuItem className="list-none flex items-center  gap-3">
                <NavigationMenuLink
                  asChild
                  className="bg-transparent hover:bg-black text-black hover:text-white text-lg transition-all duration-500"
                >
                  <Link href="/">Home</Link>
                </NavigationMenuLink>
                <NavigationMenuLink
                  asChild
                  className="bg-transparent hover:bg-black text-black hover:text-white text-lg transition-all duration-500"
                >
                  <Link href="/products">Products</Link>
                </NavigationMenuLink>
                <NavigationMenuLink
                  asChild
                  className="bg-transparent hover:bg-black text-black hover:text-white text-lg transition-all duration-500"
                >
                  <Link href="/brands">Brands</Link>
                </NavigationMenuLink>
                <NavigationMenuLink
                  asChild
                  className="bg-transparent hover:bg-black text-black hover:text-white text-lg transition-all duration-500"
                >
                  <Link href="/categories">Categories</Link>
                </NavigationMenuLink>
                <NavigationMenuLink
                  asChild
                  className="bg-transparent hover:bg-black text-black hover:text-white text-lg transition-all duration-500"
                >
                  <Link href="/sub-categories">Sub Categories</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenu>
          </div>

          <div className="nav-icons flex gap-4 items-center">
            {session && (
              <>
                <p>{`Welcome ${session.user?.name}`}</p>
              </>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <UserRound className="cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  {session ? (
                    <>
                      <DropdownMenuItem>Your Orders</DropdownMenuItem>
                      <DropdownMenuItem onClick={()=>handleLogout()}>Logout</DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <Link href="/login">
                        <DropdownMenuItem>Login</DropdownMenuItem>
                      </Link>
                      <Link href="/register">
                        <DropdownMenuItem>Register</DropdownMenuItem>
                      </Link>
                    </>
                  )}
                </DropdownMenuGroup>
                <DropdownMenuGroup></DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            {session && (
              <>
                <div className="relative">
                  <Link href="/cart">
                  <Badge className="absolute  start-full bottom-full translate-y-1/2 -translate-x-1/2">
                    {isLoading ? <Spinner/> : noOfCartItems}
                  </Badge>
                  <ShoppingCart className="cursor-pointer" />
                  </Link>
                </div>


                
                <div className="relative">
                  <Link href="/wish-list">
                  <Badge className="absolute  start-full bottom-full translate-y-1/2 -translate-x-1/2">
                    4
                  </Badge>
                  <Heart className="cursor-pointer" />
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
