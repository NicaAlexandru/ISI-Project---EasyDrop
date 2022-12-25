/* This class defines a User */

export class User {
  id: string;
  username: string;
  password: string;
  email: string;
  type: string;
  phone_number: string;

  constructor(id: string, username: string, password: string,
              email: string, type: string, phone_number: string) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.type = type;
    this.phone_number = phone_number;
  }

  getUserInfo() {
    if (this.username != null && this.password != null) {
      console.log("User " + this.username + " with password " + this.password);
    }
  }
}
