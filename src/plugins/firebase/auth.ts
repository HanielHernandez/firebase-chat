import { LoginRequest, RegisterRequest, User } from '@/models/auth'
import { addDoc, collection } from '@firebase/firestore'

import {
  createUserWithEmailAndPassword,
  UserCredential,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import { auth, db } from '.'

export class Auth {
  register(data: RegisterRequest): Promise<UserCredential> {
    return createUserWithEmailAndPassword(auth, data.email, data.password).then(
      async (crendetials: UserCredential) => {
        const user = {
          name: data.name,
          email: data.email,
          profile_image_url: null
        } as User
        const refid = await addDoc(this.users(), user)
        console.log('Usuario guardado', refid)
        return crendetials
      }
    )
  }

  singin(data: LoginRequest): Promise<UserCredential> {
    return signInWithEmailAndPassword(auth, data.email, data.password)
  }

  users() {
    return collection(db, 'users')
  }
  signOut() {
    return signOut(auth)
  }
}
export default new Auth()
