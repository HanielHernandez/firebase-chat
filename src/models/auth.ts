export interface LoginRequest {
  email: string
  password: string
}
export interface RegisterRequest extends LoginRequest {
  name: string
  phoneNumber: string
  confirmPassword: string
}
export interface User {
  id?: string
  name: string
  email: string
  profileImageUrl: string
  code?: string
  phoneNumber: string
}
