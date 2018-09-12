import { User } from "./user";

export class Message {
  messageId: string;
  messageBody: string;
  timestamp: string;
  isStarred: boolean;
  sender: User;
}
