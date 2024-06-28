import User from "@lib/models/user";
import { connectToDB } from "@lib/utils/database";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        })
    ],
    callbacks: {
        async session({ session }) {
            if (!session.user) {
                return session;
            }

            const sessionUser = await User.findOne({ email: session.user.email });

            (session.user as any).id = sessionUser?._id.toString();
        
            return session;
        },

        async signIn({ profile }) {
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
                        image: profile.image,
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