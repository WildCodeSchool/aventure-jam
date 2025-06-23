"use client"

import { signIn, signOut, useSession } from "next-auth/react"

export default function SignInPage() {
    const { data: session } = useSession()

    if (session) {
        return (
            <div style={{ padding: 20 }}>
                <p>Connecté en tant que {session.user?.email}</p>
                <button onClick={() => signOut()}>Déconnexion</button>
            </div>
        )
    }

    return (
        <div style={{ padding: 20 }}>
            <button onClick={() => signIn("google")}>Se connecter avec Google</button>
        </div>
    )
}
