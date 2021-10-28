import { firebaseConfig } from '@/config/variables'
import { initializeApp } from '@firebase/app'
import { getAuth } from '@firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseAp = initializeApp(firebaseConfig)
export const db = getFirestore(firebaseAp)
export const auth = getAuth(firebaseAp)
