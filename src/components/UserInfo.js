export class UserInfo {
  constructor(infoUser) {
    this._selectorName = infoUser.user;
    this._selectorJob = infoUser.job;
    this._user = document.querySelector(this._selectorName);
    
    this._job = document.querySelector(this._selectorJob);
    
  }
  getUserInfo() {
    return { name: this._user, about: this._job };
  }
  setUserInfo(info) {
    this._user.textContent = info[0].name || info[0];
    this._user.title = this._user.textContent;
    this._job.textContent = info[0].about || info[1];
    this._job.title = this._job.textContent;
  }
}
