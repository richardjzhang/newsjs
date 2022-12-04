import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import User from "models/user";
import { validateAllOnce } from "utils/common";

export const authOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      async authorize(credentials, req) {
        try {
          // Add logic here to look up the user from the credentials supplied
          // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };
          const { email, password } = credentials;
          validateAllOnce({ email, password });
          const user = await User.findOne({ email }).exec();

          if (!user) {
            throw new Error("Something went wrong");
          }

          const userDoc = user._doc;
          const isMatched = await bcrypt.compare(password, userDoc.password);

          if (user && isMatched) {
            // Any object returned will be saved in `user` property of the JWT
            return userDoc;
          } else {
            // If you return null then an error will be displayed advising the user to check their details.
            // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
            throw new Error("Email or Password incorrect");
          }
        } catch (e) {
          throw new Error(e);
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      if (user && user.id) {
        session.user.id = user.id;
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authOptions);
