
export interface UserActivityAttributes extends UserActivityInput{
  quantity: number
}
export interface UserActivityInput{
  userID:number
  subject:string
  algorithm:string
  actionDate: Date
  quantity: number
}

export interface ActivityBody{
  subject:string
  algorithm:string
}