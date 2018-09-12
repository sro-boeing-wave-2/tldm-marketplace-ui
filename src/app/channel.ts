import { User } from "./user";
import { Message } from "./message";

export class Channel {
  channelId: string;
  channelName: string;
  users: User[];
  admin: User;
  messages: Message[];
  workspaceId: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
