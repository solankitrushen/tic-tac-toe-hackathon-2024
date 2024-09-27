import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const options = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};

const handler = (req, res) => NextAuth(req, res, options);

export { handler as GET, handler as POST };
