export class User {
  id: string;
  firstName: string;
  lastName: string;
  emailId: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
