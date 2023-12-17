export interface FeedbackData {
  allData: Feedback[];
}
export interface Feedback {
  id: number;
  subject: string;
  message: string;
  contactInfo?: string;
  createdAt: string;
}
export interface FeedbackPayload {
  subject: string;
  message: string;
  contactInfo?: string;
}
