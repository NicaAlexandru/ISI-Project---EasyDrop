/* This class defines a AppUser */

export class AppUser {
  idUser!: string;
  userName: string;
  userPassword: string;
  email: string;
  userType: string;
  phoneNumber: string;


  constructor(userName: string, userPassword: string, email: string, userType: string, phoneNumber: string) {
    this.userName = userName;
    this.userPassword = userPassword;
    this.email = email;
    this.userType = userType;
    this.phoneNumber = phoneNumber;

  }

  setIdUser(idUser: string) {
    this.idUser = idUser;
  }

  getUserInfo(): string {
    if (this.userName != null && this.userPassword != null) {
      return ("AppUser " + this.userName + " with password " + this.userPassword);
    } else {
      return "Invalid user"
    }
  }
}
