import NextAuth from "next-auth";
import Google, { GoogleProfile } from "next-auth/providers/google";
import { eq } from "drizzle-orm";

import env from "@/lib/env";
import { assertNever, isPresent } from "@/lib/util";
import { db, tables } from "@/lib/database";

export enum Provider {
  GOOGLE = "google",
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  secret: env.NEXTAUTH_SECRET,
  providers: [
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      const provider = account?.provider as Provider | undefined;

      if (!isPresent(provider)) {
        throw new Error("no account at signIn callback");
      }

      switch (provider) {
        case Provider.GOOGLE:
          const googleProfile = profile as GoogleProfile;

          try {
            const [existingUser] = await db
              .select()
              .from(tables.users)
              .where(eq(tables.users.email, googleProfile.email))
              .limit(1)
              .execute();

            if (isPresent(existingUser)) {
              await db.update(tables.users).set({
                avatar: googleProfile.picture,
              });
            } else {
              await db.insert(tables.users).values({
                email: googleProfile.email,
                avatar: googleProfile.picture,
              });
            }
          } catch (e) {
            console.log(e);

            return false;
          }

          break;
        default:
          assertNever(provider);
      }

      return true;
    },
    async jwt({ token }) {
      if (!isPresent(token.email)) {
        return token;
      }

      const [existingUser] = await db
        .select()
        .from(tables.users)
        .where(eq(tables.users.email, token.email))
        .limit(1)
        .execute();

      token.id = existingUser.id;

      return token;
    },
    async session({ session, token }) {
      if (token.id) {
        session.user.id = `${token.id}`;
      }

      return session;
    },
  },
});
