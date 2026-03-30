import React from "react";
import { ProductI } from "../../../../types/product.type";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,

} from "@/components/ui/carousel";
import { getAllProducts } from "@/services/product.services";
import { productI } from "../../../../types/cart.type";
import AddToCartBtn from "@/components/cart/AddToCartBtn";
export default async function ProductDetails({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  console.log(productId);

  const response = await fetch(
    `${process.env.BASE_URL}/products/${productId}`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    },
  );

  const data = await response.json();
  const product: ProductI = data.data;
  console.log(product);
  const relatedProducts = await getAllProducts(product.category._id)
  const related : productI[] = relatedProducts.data;
  console.log(related);
  

  return (
    <>
      <main>
        <div className="max-w-7xl mx-auto py-10">
          <Breadcrumb className="py-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link className="text-black text-lg" href="/">
                    Home
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link className="text-black text-xl" href="/products">
                    Products
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-black text-2xl font-bold">
                  {product?.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Card className="grid grid-cols-3 gap-2">
            <div className="col-span-1">
              <Carousel>
                <CarouselContent>
                    {product?.images.map((img)=><React.Fragment key={img}>
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
            </div>
            <div className="col-span-2  flex flex-col justify-center items-center space-y-4">
              <CardHeader className="w-full">
                <div className="card-brand text-gray-400 text-lg">
                  {product?.brand.name}
                </div>
                <CardTitle className="text-black text-xl font-bold">
                  {product?.title}
                </CardTitle>
                <div className="card-brand text-gray-400 text-sm">
                  {product?.category.name}
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

              <CardContent className="w-full">
                <p className="text-black text-xl font-bold">
                  EGP: {product.price}
                </p>
              </CardContent>
              <CardFooter className="gap-5 w-full">
                <Button className="grow">
                  <ShoppingCart />
                  Add To Cart
                </Button>
                <Heart />
              </CardFooter>
            </div>
          </Card>
        </div>
      </main>
       <main>
        <div className="max-w-7xl mx-auto py-5">
          <h2 className="text-3xl font-bold mb-3">Related Products</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 xl:grid-cols-12 gap-3">
            {related.map((product)=> <React.Fragment key={product._id}>
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
