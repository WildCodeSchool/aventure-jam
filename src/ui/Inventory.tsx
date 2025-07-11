"use client";

import { useEffect, useState } from "react";
import styles from "./Inventory.module.css";
import { useUser } from "@/context/UseSessionContext";
import { getInventoryByHistory } from "@/lib/getInventory";
import { useSession } from "next-auth/react";

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
                const data = await getInventoryByHistory(email as string, historyId);
                setUser(prevUser => ({
                    ...prevUser,
                    ...data,
                }));
            } catch (error) {
                console.error("Erreur lors du chargement de l'utilisateur :", error);
            }
        };

        fetchUser();
    }, []);

    return (
        <>
            <div className={styles.inventoryContainer}>
                <img src="https://png.pngtree.com/png-vector/20231214/ourmid/pngtree-cartoon-style-durable-gaming-backpack-png-image_11350357.png" alt="backpack" onClick={handleClick} className={styles.backpack} />
                <ul className={isVisible ? styles.inventoryContent : styles.disabled}>
                    {user.inventaire.map((item, id) => (
                        <li key={id}>
                            
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}