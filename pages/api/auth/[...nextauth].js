import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],

  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: "aHkae7ByQ8Tp35wg1rhOpvVW9PrZdDrC8kAa8eUrty0=",
    maxAge: 60 * 60 * 24 * 30,
  },
});
