import User from "@lib/models/user";
import { connectToDB } from "@lib/utils/database";
import NextAuth, { Profile, Session } from "next-auth";
import Google from "next-auth/providers/google";

interface IProfile {
    profile?: Profile & {
        picture?: string
    };
}

interface ISession {
    session: Session & {
        user?: {
            id?: string
        }
    }
}

const handler = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        })
    ],
    callbacks: {
        async session({ session }: ISession) {
            if (!session.user) {
                return session;
            }

            const sessionUser = await User.findOne({ email: session.user.email });

            session.user.id = sessionUser?._id.toString();

            return session;
        },

        async signIn({ profile }: IProfile) {
            try {
                if (!profile || !profile.email) {
                    console.error('Profile or profile email is undefined');
                    return false;
                }

                await connectToDB();

                // Check if user already exists in the database
                const existingUser = await User.findOne({ email: profile.email });

                // If not, create a new user
                if (!existingUser) {
                    const username = profile.name ? profile.name.replace(" ", "").toLowerCase() : profile.email.split('@')[0];
                    await User.create({
                        email: profile.email,
                        username,
                        image: profile.image || profile.picture,
                    });
                }

                return true;
            } catch (error) {
                console.error('Error signing in:', error);
                return false;
            }
        },
    }
});

export { handler as GET, handler as POST };