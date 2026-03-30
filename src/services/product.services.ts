export async function getAllProducts(categoryId? :string){


    const base = `${process.env.NEXT_PUBLIC_BASE_URL}/products`;
    const url = categoryId ? `${process.env.NEXT_PUBLIC_BASE_URL}/products?category[in]=${categoryId}`: base ;

    const response = await fetch(url,  {

        method:"GET",
    
        headers:{
            "Content-type":"application/json"
        }

    })

    const data =await  response.json();

    return data
}
