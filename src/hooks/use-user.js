import { useContext, useEffect, useState } from "react";
import UserContext from "../context/user";
import { db } from '../lib/firebase.prod'

export default function useUser() {
    const [activeUser, setActiveUser] = useState({})
    const { user } = useContext(UserContext)

    useEffect(() => {
        async function getUserByObjectId() {
            
        }
    }, [user])
}