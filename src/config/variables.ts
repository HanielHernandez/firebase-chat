export const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
}

export const EMAIL_NOT_VERIFIED = 'EMAIL_NOT_VERIFIED'
export const USER_NOT_FOUND = 'USER_NOT_FOUND'

export const CONVERSATION_STARTED = 'CONVERSATION_STARTED'
export const NOT_LOG_IN = 'USER_NOT_SIGN_IN'
export const CONVRESATION_AREADY_EXIST = 'CONVERSATION ALREADY_EXISTS'
export const USER_ALREADY_EXIS_EXCEPTION = 'USER_AREADY_EXIST'

export const SYSTEM_MESSAGE_TYPE = 'SYSTEM'
export const SMS_MESSAGE_TYPE = 'SMS'
export const MMS_MESSAGE_TYPE = 'MMS'

export const CONVERSATION_CREATED = 'CONVERSATION_CREATED'
export const CONVERSATION_ARCHIVED = 'CONVERSATION_ARCHIVED'

export const SYSTEM_MESSAGES = [CONVERSATION_CREATED, CONVERSATION_ARCHIVED]
