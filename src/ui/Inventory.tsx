"use client";

import { useEffect, useState } from "react";
import styles from "./Inventory.module.css";
import { useUser } from "@/context/UseSessionContext";
import { useSession } from "next-auth/react";
import { fetchInventoryForHistory } from "@/service/AventureService";

export default function Inventory({historyId} : {historyId: number} ) {
    const { data: session } = useSession()
    
    const [isVisible, setIsVisible] = useState(false)
    const { setUser, user } = useUser();


    function handleClick() {

        setIsVisible(!isVisible)
    }

    useEffect(() => {
        const email = session?.user?.email
        const fetchUser = async () => {
            try {
                const data = await fetchInventoryForHistory(email as string, historyId);
                console.log(data)
                setUser(prevUser => ({
                    ...prevUser,
                    ...data,
                    inventaire: data
                }));
            } catch (error) {
                console.error("Erreur lors du chargement de l'utilisateur :", error);
            }
        };

        fetchUser();
    }, [session, historyId]);

    return (
        <>
            <div className={styles.inventoryContainer}>
                <img src="https://png.pngtree.com/png-vector/20231214/ourmid/pngtree-cartoon-style-durable-gaming-backpack-png-image_11350357.png" alt="backpack" onClick={handleClick} className={styles.backpack} />
                <ul className={isVisible ? styles.inventoryContent : styles.disabled}>
                    {user.inventaire.map(
                        ({ id, name, image }: { id: number; name: string; image: string }) => (
                            <li key={`item-${id}`}>
                                {name}
                                <img src={`/images/${image}`} alt={name} />
                            </li>
                        )
                    )}
                </ul>
            </div>
        </>
    )
}