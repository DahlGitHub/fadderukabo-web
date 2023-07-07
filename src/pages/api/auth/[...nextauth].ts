import NextAuth, { AuthOptions} from 'next-auth';
import { FirestoreAdapter } from '@auth/firebase-adapter';
import { cert } from 'firebase-admin/app'
import GoogleProvider from 'next-auth/providers/google';
import { Adapter } from "next-auth/adapters";
import { db } from '../../../../firebase';

export const authOptions : AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
    }),
  }) as Adapter,
  session: {
    strategy: 'jwt',

  },
  pages: {
    signIn: "/login",
  },

};

export default NextAuth(authOptions);
