import { collection, getDocs, doc, updateDoc } from 'firebase/firestore'
import { db } from '../lib/firebase.prod'

const userCollection = collection(db, 'users')

const getUsers = async () => {
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
    return suggestedUsers
}

export async function followingUser(userId, profileId, isFollowing) {
    const users = await getUsers()
    const user = users.find((user) => user.userId === userId)
    let following = user.following
    following = [...following, profileId]
    const newFollowing = { following: following }
    const userInfo = doc(userCollection, user.docId)
    console.log(userInfo)
    if (!isFollowing) updateDoc(userInfo, newFollowing)
}

export async function followedByUser(userId, profileId, isFollowed) {
    const users = await getUsers()
    const user = users.find((user) => user.userId === profileId)
    let followers = user.followers
    followers = [...followers, userId]
    const newFollower = { followers: followers }
    const userInfo = doc(userCollection, user.docId)
    console.log(userInfo)
    if (!isFollowed) updateDoc(userInfo, newFollower)   
}

export async function getFollowing(userId, following) {
    const users = await getUsers()
    let suggestedUsers = users.filter((user) => user.userId !== userId)
    following.map((id) => (
        suggestedUsers = suggestedUsers.filter((user) => user.userId === id)
    ))
    return suggestedUsers
}