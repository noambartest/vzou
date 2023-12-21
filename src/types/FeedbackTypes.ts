export interface FeedBackAttrs {
       id: number
       subject: string
       message: string
       contactInfo?: string
       createdAt: Date
       updatedAt: Date
}
export interface FeedBackInput {
       subject: string
       message: string
       contactInfo?: string
}
