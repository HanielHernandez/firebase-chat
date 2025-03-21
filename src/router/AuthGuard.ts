import fbAuth from '@/plugins/firebase/auth'
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'

export const AuthGuard = async (
    to: RouteLocationNormalized,
    _: RouteLocationNormalized,
    next: NavigationGuardNext
): Promise<void> => {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
    const currentUser = await fbAuth.currentUser()
    if (requiresAuth && !currentUser) {
        return next({ name: 'SignIn' })
    }
    next()
}

export const NoAuthGuard = async (
    to: RouteLocationNormalized,
    _: RouteLocationNormalized,
    next: NavigationGuardNext
): Promise<void> => {
    const requiresNoAuth = to.matched.some((record) => record.meta.requiresNoAuth)
    const currentUser = await fbAuth.currentUser()

    if (requiresNoAuth && currentUser) {
        return next({ name: 'Messenger' })
    }
    next()
}
