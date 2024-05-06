import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import User from "@/models/user";
import { connectToDatabase } from "@/lib/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user?.email,
      });
      if (session && sessionUser) {
        // @ts-ignore
        session.user.id = sessionUser?._id;
        // @ts-ignore
        session.user.username = sessionUser?.username;
      }
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDatabase();

        // Check if user exists in the database
        const userExists = await User.findOne({ email: profile?.email });

        // If user does not exist, create a new user
        if (!userExists) {
          await User.create({
            email: profile?.email,
            username: profile?.email?.split("@")[0].toLocaleLowerCase(),
            image: profile?.image,
          });
        }
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
