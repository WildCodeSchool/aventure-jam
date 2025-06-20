import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Aventure</h1>

      <Link href="/jeu">
        <button>
          Lancer l’histoire
        </button>
      </Link>
    </main>
  );
}