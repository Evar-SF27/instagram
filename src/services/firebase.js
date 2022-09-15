import { collection, getDocs, doc, updateDoc, query, where, arrayUnion } from 'firebase/firestore'
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

export async function doesUsernameExist(username) {
    const q = query(userCollection, where('username', '==', username))
    const user = getDocs(q)
    const n = user.length > 0

    return n
}

export async function getUserByUsername(username) {
    const q = query(userCollection, where('username', '==', username))
    const result = await getDocs(q)
    const user = result.docs.map((user) => ({
        ...user.data(),
        docId: user.id
    }))

    return user
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
    let { docId } = await getUserByUserId(userId)
    const userInfo = doc(userCollection, docId)
    if (!isFollowing) updateDoc(userInfo, {
        following: arrayUnion(profileId)
    })
}

export async function followedByUser(userId, profileId, isFollowed) {
    let { docId } = await getUserByUserId(profileId)
    const userInfo = doc(userCollection, docId)
    if (!isFollowed) updateDoc(userInfo, {
        followers: arrayUnion(userId)
    })   
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
    const userPhotos = photoSnap.docs.map((photo) => ({
        ...photo.data(),
        docId: photo.id
    }))

    const photosWithUserDetails = await Promise.all(
        userPhotos.map(async (photo) => {
            let userLikedPhoto = false
            if (photo.likes.includes(userId)) {
                userLikedPhoto = true
            }
            const user = await getUserByUserId(photo.userId)
            const { username } = user

            return { username, ...photo, userLikedPhoto }
        })
    )

    return photosWithUserDetails
}

export async function getUserPhotosByUsername(username) {
    const [{ userId }] = await getUserByUsername(username)
    const q = query(photoCollection, where('userId', '==', userId))
    const photoSnap = await getDocs(q)
    const userPhotos = photoSnap.docs.map((photo) => ({
        ...photo.data(),
        docId: photo.id
    }))

    return userPhotos
}

export async function isUserFollowingProfile(loggedInUsername, profileUserId) {
    const query_one = query(userCollection, where('username', '==', loggedInUsername))
    const userSnap = await getDocs(query_one)
    const users = userSnap.docs.map((user) => ({
        ...user.data(),
        docId: user.id
    }))
    const following = users[0].following
    const isUserFollowing = following.includes(profileUserId)
    
    return isUserFollowing
}