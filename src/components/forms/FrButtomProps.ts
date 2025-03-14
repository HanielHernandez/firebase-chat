import type { Color } from '@/config/consts'

export default interface FrButtonProps {
    disabled?: boolean
    to?: string | Record<string, unknown>
    link?: boolean
    loading?: boolean
    block?: boolean
    color?: Color // Assuming Color is a string, or you can use a specific type if you have one
    type?: string
    flat?: boolean
    bordered?: boolean
    rounded?: boolean
    icon?: boolean
}
