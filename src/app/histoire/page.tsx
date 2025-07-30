import { HistoryCards } from "@/components/HistoryCards"
import styles from "./page.module.css"

export default function Home() {
    return (
        <>
            <div className={styles.historiesContainer}>
                <HistoryCards />
            </div>
        </>
    )
}