export interface TWOFA_Attributes {
  email: string
  code: string
  type: string
  createdAt: Date
  updatedAt: Date
}
export interface TWOFA_Input {
  email: string
  code: string
  type: string
}
export interface TWOFA_VERIFY_BODY {
  code: string
  type: CODE_TYPES
  email: string
}
export interface SET_2FA_STATUS_BODY extends  TWOFA_VERIFY_BODY{
  status:boolean
}

export interface RESET_PW_2FA_BODY extends  TWOFA_VERIFY_BODY{
  password:string
}
export enum CODE_TYPES {
  RESET_PW = 'RESET_PW',
  VERIFY_EMAIL = 'VERIFY_EMAIL',
  TWO_FA = '2FA'
}