import { LoginRequest, RegisterRequest, User } from '@/models/auth'
import { addDoc, collection } from '@firebase/firestore'

import {
  createUserWithEmailAndPassword,
  UserCredential,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  User as FirebaseUser,
  sendEmailVerification
} from 'firebase/auth'
import { auth, db } from '.'
const generateUserCode = (email: string): string => {
  let result = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < email.length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

export class Auth {
  register(data: RegisterRequest): Promise<UserCredential> {
    return createUserWithEmailAndPassword(auth, data.email, data.password).then(
      async (crendetials: UserCredential) => {
        const userProfile = {
          name: data.name,
          email: data.email,
          profile_image_url: null,
          code: generateUserCode(data.email)
        } as User
        const user = await this.currentUser()
        await updateProfile(user, {
          displayName: data.name,
          photoURL: `https://ui-avatars.com/api/?name=${data.name}`
        })
        await addDoc(this.users(), userProfile)
        await sendEmailVerification(user, {
          url: 'http://localhost:8080/email-confirmation'
        })
        await signOut(auth)
        return crendetials
      }
    )
  }

  singin(data: LoginRequest): Promise<UserCredential> {
    return signInWithEmailAndPassword(auth, data.email, data.password).then(
      async (cred: UserCredential) => {
        const user = await this.currentUser()
        console.log(user)
        if (!user.emailVerified) {
          this.signOut()
          throw 'Error, email not verified'
        }
        return cred
      }
    )
  }

  users() {
    return collection(db, 'users')
  }
  signOut() {
    return signOut(auth)
  }

  async currentUser(): Promise<FirebaseUser> {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(
        auth,
        (user: any) => {
          unsubscribe()
          resolve(user)
        },
        reject
      )
    })
  }
}
export default new Auth()
