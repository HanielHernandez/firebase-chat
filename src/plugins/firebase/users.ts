import { type User } from '@/models/auth'
import {
    collection,
    CollectionReference,
    type DocumentData,
    getDocs,
    limit,
    query,
    QuerySnapshot,
    where
} from '@firebase/firestore'
import { db } from '.'

export class Users {
    documentRef: CollectionReference<DocumentData>

    constructor() {
        this.documentRef = collection(db, 'users')
    }
    /**
     * Search a user by it's email
     * @param email email of the user
     * @returns Promise<User|null> if user Not found promise will return null
     */

    async findByEmail(email: string): Promise<User | null> {
        const q = query(this.documentRef, where('email', '==', email), limit(1))
        return await getDocs(q).then((querySnapshot: QuerySnapshot) => {
            return this.parseSnapshop(querySnapshot)
        })
    }

    /**
     * Search a user by a property
     * @param property string property ause to find the user
     * @param value value of the property use to find the user
     * @returns Promise<User|null> if user Not found promise will return null
     */

    async findBy(property: string, value: string | number): Promise<User | null> {
        const q = query(this.documentRef, where(property, '==', value), limit(1))
        return await getDocs(q).then((querySnapshot: QuerySnapshot) => {
            return this.parseSnapshop(querySnapshot)
        })
    }

    parseSnapshop(snapshot: QuerySnapshot) {
        if (snapshot.docs.length > 0) {
            const user = {
                ...snapshot.docs[0].data()
            }
            user.id = snapshot.docs[0].id

            return user as User
        } else {
            return null
        }
    }

    async find(userId: string): Promise<User | null> {
        const q = query(this.documentRef, where('code', '==', userId), limit(1))
        return await getDocs(q).then((querySnapshot: QuerySnapshot) => {
            return this.parseSnapshop(querySnapshot)
        })

        // const docRef = doc(db, 'users', where())
        // const docSnap = await getDoc(docRef)
        // if (docSnap.exists()) {
        //   return docSnap.data() as User
        // } else {
        //   return null
        // }
    }
}
export default new Users()
