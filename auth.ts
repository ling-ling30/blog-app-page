import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { verifyUser } from "./actions/login";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { username, password } = credentials;
        console.log(username, password);
        credentials.username;
        let user = null;

        const data = await verifyUser(username as string, password as string);
        console.log(data);
        if (!!data) {
          user = data;
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
    error: "/admin/error",
  },
  callbacks: {
    async signIn(params) {
      return true;
    },
    async jwt(params) {
      // console.log(params);
      return params.token;
    },
    async session(params) {
      // console.log(params);
      return params.session;
    },
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
});
