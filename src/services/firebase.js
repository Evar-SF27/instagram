import { collection, getDocs, doc, updateDoc, query, where } from 'firebase/firestore'
import { db } from '../lib/firebase.prod'

const userCollection = collection(db, 'users')
const photoCollection = collection(db, 'photos')

const getUsers = async () => {
    const res = await getDocs(userCollection)
    const users = res.docs.map((user) => ({
        ...user.data(),
        docId: user.id
    }))

    return users
}

const getAllPhotos = async () => {
    const res = await getDocs(photoCollection)
    const photos = res.docs.map((photo) => ({
        ...photo.data(),
        docId: photo.id
    }))

    return photos
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
    let { docId, following } = await getUserByUserId(userId)
    following = [...following, profileId]
    const newFollowing = { following: following }
    const userInfo = doc(userCollection, docId)
    console.log(userInfo)
    if (!isFollowing) updateDoc(userInfo, newFollowing)
}

export async function followedByUser(userId, profileId, isFollowed) {
    let { docId, followers } = await getUserByUserId(profileId)
    followers = [...followers, userId]
    const newFollower = { followers: followers }
    const userInfo = doc(userCollection, docId)
    console.log(userInfo)
    if (!isFollowed) updateDoc(userInfo, newFollower)   
}

export async function getFollowing(userId, following) {
    const users = await getUsers()
    let suggestedUsers = users.filter((user) => user.userId !== userId)
    let userFollowing = []
    following.map((id) => (
        suggestedUsers.map((user) => user.userId === id ? userFollowing = userFollowing = [...userFollowing, user] : null))
    )
    return userFollowing
}

export async function getPhotos(userId, following) {
    const q = query(photoCollection, where('userId', 'in', following))
    const photoSnap = await getDocs(q)
    const photos = photoSnap.docs.map((photo) => ({
        ...photo.data(),
        docId: photo.id
    }))
    
    console.log(photos)
}