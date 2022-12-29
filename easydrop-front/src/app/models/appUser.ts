/* This class defines a AppUser */

export class AppUser {
  idUser: string;
  userName: string;
  userPassword: string;
  email: string;
  userType: string;
  phoneNumber: string;

  constructor(idUser: string, userName: string, userPassword: string,
              email: string, userType: string, phoneNumber: string) {
    this.idUser = idUser;
    this.userName = userName;
    this.userPassword = userPassword;
    this.email = email;
    this.userType = userType;
    this.phoneNumber = phoneNumber;
  }

  getUserInfo() {
    if (this.userName != null && this.userPassword != null) {
      console.log("AppUser " + this.userName + " with password " + this.userPassword);
    }
  }
}
