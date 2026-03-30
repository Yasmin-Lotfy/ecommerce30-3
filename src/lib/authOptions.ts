import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode, JwtPayload } from "jwt-decode";


interface jwtExtendI extends JwtPayload {
  id:string
}
export const authOptions: NextAuthOptions = {


  pages: { signIn: "/login" },
  providers: [
    Credentials({
      name: "Credentials",

      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const res = await fetch(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          },
        );
        const data = await res.json();
        const decodedToken = jwtDecode<jwtExtendI>(data.token);
        // console.log(decodedToken, "decodedToken");

        if (data.message === "success") {
          return {
            id: decodedToken.id ?? decodedToken.sub ?? "",
            user: data.user,
            token: data.token,
          };
        } else {
          throw new Error(data.message || "Wrong Credentails ");
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user.user;
        token.token = user.token;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = token.user;
      }
      return session;
    },
  },
};
