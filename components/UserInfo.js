export class UserInfo {
 constructor(profileName, profileJob) {
  this._profileName = profileName.textContent;
  this._profileJob = profileJob.textContent;
 
 }
 getUserInfo(inputName, inputJob) {
     inputName.placeholder = this._profileName;
     inputJob.placeholder = this._profileJob;
 }
 setUserInfo(inputName, inputJob) {
     this._inputName = inputName.value;
     this._inputJob = inputJob.value;
     this._profileName = this._inputName;
     this._profileJob =  this._inputJob;
    }
}