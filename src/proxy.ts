import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {

    const {pathname} = request.nextUrl

    console.log(pathname , "my request");
    

    // route handler , proxy 
const token = await getToken({req : request});

// return boolean 
// const isAuthPages = pathname === "/login" || pathname==="/register";

// more generic 
 const isAuthPages= ["/login", "/register"].includes(pathname);

//   have token && auth pages 

 if(token && isAuthPages ){

    return  NextResponse.redirect(new URL('/products', request.url))
 }

 if(!token && !isAuthPages){

    return  NextResponse.redirect(new URL('/login', request.url))
 }

return NextResponse.next()






//   return NextResponse.redirect(new URL('/home', request.url))
}
 
// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }
 
export const config = {
  matcher: ["/login", "/register", "/cart", "/wish-list", "/brands"],
}