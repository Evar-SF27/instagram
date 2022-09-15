import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getUserByUsername } from '../services/firebase'
import Header from '../components/header/header'
import * as ROUTES from '../constants/routes'
import '../styles/profile.css'
import UserProfile from '../components/profile'

export default function Profile () {
    const { username } = useParams()
    const [user, setUser] = useState(null)
    const [userExists, setUserExists] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        async function checkUserExists() {
            const user = await getUserByUsername(username)
            if (user.length > 0) {
                setUser(user[0])
                setUserExists(true)
            } else {
                navigate(ROUTES.NOT_FOUND)
            }
        }

        checkUserExists()
    }, [username, navigate])

    return userExists ? (
        <>
            <Header />
            <UserProfile user={user}/>
        </>
    ) : null
}

