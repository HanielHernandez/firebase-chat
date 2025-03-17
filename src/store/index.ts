import { type User } from '@/models/auth'
import Auth from '@/plugins/firebase/auth'
import { type Unsubscribe } from '@firebase/util'

import { defineStore } from 'pinia'
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage } from '@/plugins/firebase'
import { doc, updateDoc } from 'firebase/firestore'

export interface PaginatedStoreState<I> {
    items: I[]
    loading: boolean
    page: number
    endReach: boolean
    selected: I | null
    subscription: Unsubscribe | null
}

export type CommitFunction = (key: string, payload: unknown) => void
export type ActionFunction = (key: string, payload: unknown) => Promise<unknown>

export type SetterFunction = (state: { [key: string]: unknown }, payload: unknown) => void
export const setterFunction = (key: string): SetterFunction => {
    return (state: { [key: string]: unknown }, payload: unknown): void => {
        // // console.log('state', state)
        state[key] = payload
    }
}
export type RootState = {
    currentUser: User | null
}

const useRootStore = defineStore('root', {
    state: (): RootState => ({
        currentUser: null
    }),
    actions: {
        setCurrentUser(payload: User) {
            this.currentUser = payload
        },

        async fetchCurrentUser(): Promise<void> {
            const currentuser = await Auth.currentUserProfile()
            if (currentuser) this.setCurrentUser(currentuser)
        },
        /**
         * @description uploads a file to firebase
         * @param blob file blog
         * @returns Promive<String> promise with a url string for downloading the file
         */

        async UploadFile(blob: Blob): Promise<string | null> {
            const timestamp = Date.now()
            const randomString = Math.random().toString(36).substring(2, 10)

            const file = new File([blob], `${timestamp}-${randomString}`, { type: 'image/png' })
            const fileRef = storageRef(storage, `images/${file.name}`)
            try {
                const snapshot = await uploadBytes(fileRef, file)
                const downloadURL = await getDownloadURL(snapshot.ref)
                return downloadURL
            } catch (error) {
                console.error('Error uploading file:', error)
                return null
            }
        },
        async updateUser(id: string, user: User) {
            const userRef = doc(db, 'users', id)
            return await updateDoc(userRef, { ...user })
        }
    }
    // modules: {
    //   conversations: conversationsStore,
    //   messages
    // }
})
// store.registerModule('conversations', conversationsStore)
export default useRootStore
