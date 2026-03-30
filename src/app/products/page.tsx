import React from "react";
import { ProductI } from "../../../types/product.type";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart, Star } from "lucide-react";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,

} from "@/components/ui/carousel";
import AddToCartBtn from "@/components/cart/AddToCartBtn";
import { getAllProducts } from "@/services/product.services";




export default async function Products() {


  const data = await getAllProducts()

  const products: ProductI[] = data.data;
  console.log(products);



  return (
    <>
      <main>
        <div className="container mx-auto py-5">
          <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 xl:grid-cols-12 gap-3">
            {products.map((product)=> <React.Fragment key={product._id}>
            <div className="col-span-3">
              <Card>
                <Link href={`/products/${product._id}`}>
                <CardHeader>
                 <Carousel>
                <CarouselContent>
                    {product.images.map((img)=><React.Fragment key={img}>
                     <CarouselItem>
               
                    <Image
                      width={1000}
                      height={1000}
                      className="w-full h-90 object-cover"
                      alt="product"
                      src={img}
                      loading="eager"
                      fetchPriority="high"
                    />
                  </CarouselItem>
                    </React.Fragment>)}
                 
                </CarouselContent>
               
         
              </Carousel>
                  <div className="card-brand text-gray-400 text-lg">
                    {product.brand.name}
                  </div>
                  <CardTitle className="text-black text-xl font-bold">
                    {product.title}
                  </CardTitle>
                  <div className="card-brand text-gray-400 text-sm">
                    {product.category.name}
                  </div>
                  <div className="flex gap-2">
                    <div className="flex gap-1 items-center">
                      {[0, 1, 2, 3, 4].map((star, index) => {
                        const filledStar =
                          index < Math.floor(product.ratingsAverage);
                        return (
                          <React.Fragment key={index}>
                            <Star
                              className={`${filledStar ? "text-yellow-500 fill-yellow-500" : "text-gray-500 fill-gray-500"}`}
                            />
                          </React.Fragment>
                        );
                      })}
                    </div>
                    <p className="text-sm text-gray-400">
                      ({product.ratingsAverage})
                    </p>
                  </div>
                </CardHeader>
                </Link>
                <CardContent>
                  <p className="text-black text-xl font-bold">
                    EGP: {product.price}
                  </p>
                </CardContent>
                <CardFooter className="gap-5">
                <AddToCartBtn prodId={product._id}/>
                  <Heart />
                </CardFooter>
              </Card>
            </div>
            </React.Fragment>)}
          </div>
        </div>
      </main>
    </>
  );
}
