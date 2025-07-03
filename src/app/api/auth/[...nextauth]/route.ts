import { db } from "@/lib/db";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { User } from "@/model/userModel";



export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/",
    },

    callbacks: {
        async signIn({ user }) {
            if (!user.email) {
                return false;
            }

            const name = user.name ? user.name.split(" ")[0] : "Guerrier";
            const image = "https://img.freepik.com/premium-vector/dark-fantasy-portrait-witch-illustration_961307-7342.jpg";

            try {
                const [rows] = await db.query(
                    "SELECT * FROM users WHERE email = ?",
                    [user.email]
                ) as [User[], unknown];

                if (rows.length === 0) {
                    await db.query(
                        `INSERT INTO users (pseudo, avatar, email) VALUES (?, ?, ?)`,
                        [name, image, user.email]
                    );
                    
                }

                return true;
            } catch (error) {
                console.error("Error during signIn callback:", error);
                return false;
            }
        }
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
