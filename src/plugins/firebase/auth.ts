import { EMAIL_NOT_VERIFIED, USER_ALREADY_EXIS_EXCEPTION } from '@/config/variables'
import { type LoginRequest, type RegisterRequest, type User } from '@/models/auth'
import { addDoc, collection } from '@firebase/firestore'

import {
    createUserWithEmailAndPassword,
    type UserCredential,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,
    type User as FirebaseUser,
    sendEmailVerification,
    applyActionCode
} from 'firebase/auth'
import { auth, db } from '.'
import users from './users'

export const generateCode = (length: number): string => {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}

export class Auth {
    constructor() {
        auth.useDeviceLanguage()
    }
    async register(data: RegisterRequest): Promise<UserCredential | null> {
        const alreadExist = await users.findBy('phone_number', data.phoneNumber)

        if (alreadExist) {
            throw USER_ALREADY_EXIS_EXCEPTION
        }

        return createUserWithEmailAndPassword(auth, data.email, data.password).then(
            async (crendetials: UserCredential) => {
                const { email, name, phoneNumber } = data
                const userProfile = {
                    name,
                    email,
                    phoneNumber,
                    profileImageUrl: `https://ui-avatars.com/api/?name=${data.name}`,
                    code: generateCode(8)
                } as User

                const user = await this.currentUser()

                if (!user) {
                    return null
                }

                await updateProfile(user, {
                    displayName: data.name,
                    photoURL: `https://ui-avatars.com/api/?name=${data.name}`
                })

                try {
                    await addDoc(this.users(), userProfile)
                } catch (e) {
                    console.log('error add', e)
                    console.error(e)
                }

                await sendEmailVerification(user, {
                    url: 'http://localhost:8080/email-confirmation'
                })
                localStorage.setItem('userToVerifyEmail', data.email)
                await signOut(auth)
                return crendetials
            }
        )
    }

    singin(data: LoginRequest): Promise<UserCredential> {
        return signInWithEmailAndPassword(auth, data.email, data.password).then(async (cred: UserCredential) => {
            const user = await this.currentUser()
            // // console.log(user)
            if (user && !user.emailVerified) {
                sendEmailVerification(user)

                this.signOut()
                throw EMAIL_NOT_VERIFIED
            }
            return cred
        })
    }

    users() {
        return collection(db, 'users')
    }
    signOut() {
        return signOut(auth)
    }

    async currentUser(): Promise<FirebaseUser | null> {
        return new Promise((resolve, reject) => {
            const unsubscribe = onAuthStateChanged(
                auth,
                (user) => {
                    unsubscribe()
                    resolve(user)
                },
                reject
            )
        })
    }

    async verifyEmail(actionCode: string): Promise<void> {
        return applyActionCode(auth, actionCode)
    }

    async sendVerifyEmail() {
        return this.currentUser().then((user: FirebaseUser | null) => {
            if (!user) return
            sendEmailVerification(user, {
                url: 'http://localhost:8080/email-confirmation'
            })
        })
    }

    currentUserProfile(): Promise<User | null> {
        return this.currentUser().then(async (user: FirebaseUser | null) => {
            let userProfile = null
            if (user && user.email) {
                userProfile = await users.findByEmail(user.email)
            }
            return userProfile
        })
    }
}
export default new Auth()
