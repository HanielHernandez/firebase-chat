import fbAuth from '@/plugins/firebase/auth'
export const AuthGuard = async (
  to: any,
  from: any,
  next: any
): Promise<void> => {
  const requiresAuth = to.matched.some(
    (record: any) => record.meta.requiresAuth
  )
  const currentUser = await fbAuth.currentUser()
  if (requiresAuth && !currentUser) {
    return next({ name: 'SignIn' })
  }
  next()
}

export const NoAuthGuard = async (
  to: any,
  from: any,
  next: any
): Promise<void> => {
  const requiresNoAuth = to.matched.some(
    (record: any) => record.meta.requiresNoAuth
  )
  const currentUser = await fbAuth.currentUser()

  if (requiresNoAuth && currentUser) {
    return next({ name: 'Messenger' })
  }
  next()
}
