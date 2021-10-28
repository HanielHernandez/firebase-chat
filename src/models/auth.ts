export interface LoginRequest {
  email: string
  password: string
}
export interface RegisterRequest extends LoginRequest {
  name: string
  confirm_password: string
}
export interface User {
  name: string
  email: string
  image_url?: string
}
