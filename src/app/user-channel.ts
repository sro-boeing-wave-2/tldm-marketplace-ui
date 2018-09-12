export class UserChannel {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  emailId: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
