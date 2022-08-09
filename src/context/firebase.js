import { createContext, useContext } from "react";
import { db, auth } from "../lib/firebase.prod";

const FirebaseContext = createContext(null)

export default function FirebaseProvider({children, ...restProps }) {

    return (
        <FirebaseContext.Provider value={{ db, auth }}>
            {children}
        </FirebaseContext.Provider>
    )
}

export function FirebaseCont(){
    return useContext(FirebaseContext)
}