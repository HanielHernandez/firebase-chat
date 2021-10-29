import { auth } from '@/plugins/firebase'

export const AuthGuard = (to: any, from: any, next: any) => {
  if (to.meta.requiresAuth && !auth.currentUser) {
    return next({ name: 'SignIn' })
  }
  next()
}

export const NoAuthGuard = (to: any, from: any, next: any) => {
  console.log('Current user', auth.currentUser)

  if (to.meta.requiresNoAuth && auth.currentUser) {
    return next({ name: 'Home' })
  }
  next()
}
