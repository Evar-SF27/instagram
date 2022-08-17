import { collection, getDocs } from 'firebase/firestore'
import { db } from '../lib/firebase.prod'

const getUsers = async () => {
    const userCollection = collection(db, 'users')
    const res = await getDocs(userCollection)
    const users = res.docs.map((user) => ({
        ...user.data(),
        docId: user.id
    }))

    return users
}


export async function doesUsernameExist(username) {
    
    const users = await getUsers()
    const user = users.find((user) => user.username === username)
    const n = user.length > 0

    return n
}

export async function getUserByUserId(userId) {
    const users = await getUsers()
    const user = users.find((user) => user.userId === userId)

    return user
}

export async function getSuggestedProfiles(userId, following) {
    const users = await getUsers()
    let suggestedUsers = users.filter((user) => user.userId !== userId)
    following.map((id) => (
        suggestedUsers = suggestedUsers.filter((user) => user.userId !== id)
    ))
    console.log(suggestedUsers)
    return suggestedUsers

}