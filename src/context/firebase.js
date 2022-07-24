import { createContext, useContext } from "react";
import { db } from "../lib/firebase.prod";

const FirebaseContext = createContext(null)

export default function FirebaseProvider({children, ...restProps }) {

    return (
        <FirebaseContext.Provider value={{ db }}>
            {children}
        </FirebaseContext.Provider>
    )
}

export function FirebaseCont(){
    return useContext(FirebaseContext)
}