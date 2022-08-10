import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState} from 'react'
import { auth } from '../lib/firebase.prod'

export default function useAuthListener() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')))

    useEffect(() => {
        const listener = onAuthStateChanged(auth, (authUser) => {
            if (authUser) {
                localStorage.setItem('authUser', JSON.stringify(authUser))
                setUser(authUser)
            } else {
                localStorage.removeItem('authUser')
                setUser(null)
            }
        })
        return () => listener()
    }, [user])

    return { user }
}
