export class Application {
  id: number;
  name: string;
  emailId: string;
  info: string;
  developer: string;
  appUrl: string;
  logoUrl: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
