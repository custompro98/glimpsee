import NextAuth from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import env from "@/lib/env";
import { assertNever, isPresent } from "@/lib/util";
import { db } from "@/lib/database";
import { users } from "@/lib/database/tables";
import { eq } from "drizzle-orm";

enum Provider {
    GOOGLE = "google",
}

const handler = NextAuth({
    providers: [
        GoogleProvider({
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

                    if (!isPresent(googleProfile?.email)) {
                        throw new Error("no email from google provider");
                    }

                    try {
                        const [existingUser] = await db
                            .select()
                            .from(users)
                            .where(eq(users.email, googleProfile.email))
                            .limit(1)
                            .execute();

                        if (existingUser) {
                            await db.update(users).set({
                                avatar: googleProfile.picture,
                            });
                        } else {
                            await db.insert(users).values({
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
    },
});

export { handler as GET, handler as POST };
