import { collection, getDoc, query, where } from 'firebase/firestore'
import { db } from '../lib/firebase.prod'

export async function doesUsernameExist(username) {
    const userCollection = collection(db, 'users')

    const res = query(userCollection, where('username', '==', username))
    const results = getDoc(res)

    console.log(results)
    const n = results.docs.map((user) => user.data().length > 0)
    return n
}