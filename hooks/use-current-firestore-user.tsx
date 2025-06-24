"use client"

import getUserData from "@/actions/getUserData";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function useCurrentFirestoreUser() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const {userId} = useUser()

    useEffect(() => {
        const getUserInfo = async () => {
            setIsLoading(true)
            if (!userId) {
                setIsError(true);
                setIsLoading(false)
                return;
            }
            const userData = await getUserData(userId);
            setUser(userData);
            setIsLoading(false);
        }
        getUserInfo()
    }, [])

    return { user, isLoading, isError };
}