import NextAuth, { AuthOptions} from 'next-auth';
import { FirestoreAdapter } from '@auth/firebase-adapter';
import { cert } from 'firebase-admin/app'
import GoogleProvider from 'next-auth/providers/google';
import { Adapter } from "next-auth/adapters";
import { collection, getDocs, query,  where } from 'firebase/firestore';
import { db } from '../../../../firebase';

export const authOptions : AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      async profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          createdAt: Date.now(),
        };
      }
    }),
  ],
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
    }),
  }) as Adapter,

  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/unauthorized",


  },
  callbacks: {
    async signIn({ user }) {
      console.log(user.email)
      try {
        const authorizedEmailsRef = collection(db, 'allowedEmails');
        const q = query(authorizedEmailsRef, where('email', '==', user.email));

        const querySnapshot = await getDocs(q);

        // If the querySnapshot is empty, the email was not found
        if (querySnapshot.empty) {

          return Promise.resolve(false);
          
        }

        // If the email is allowed, continue the sign in
        return Promise.resolve(true);
      } catch (error) {
        console.log(error);
        // If an error occurs, cancel the sign in
        return Promise.resolve(false);
      }
    },


    }
  }

export default NextAuth(authOptions);