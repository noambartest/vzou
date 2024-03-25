export interface UserAttributes extends IUser {
  password: string
  createdAt?: Date
  updatedAt?: Date
}
export interface IUserRegister {
  email: string
  password: string
  firstName: string
  lastName: string
  gender: string
  isEnabled2FA: boolean
  birthYear: number
  role?: string
  lastSeen: Date
}
export interface IUserUpdate {
  firstName?: string
  lastName?: string
  gender?: string
  birthYear?: number
  isEnabled2FA?: boolean
}

export interface IUserLogin {
  email: string
  password: string 
}
export interface IUser extends IUserRegister {
  id: number
  isEmailConfirmed: boolean
  isEnabled2FA: boolean
}
