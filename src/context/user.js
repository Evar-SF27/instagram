import { createContext } from "react";

const UserContext = createContext(null)

// export default function FirebaseProvider({ children, ...restProps }) {

//     return (
//         <FirebaseContext.Provider value={{ db, auth }}>
//             {children}
//         </FirebaseContext.Provider>
//     )
// }

export default UserContext
