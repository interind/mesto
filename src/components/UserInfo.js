export class UserInfo {
  constructor(infoUser) {
    this._selectorName = infoUser.user;
    this._selectorJob = infoUser.job;
    this._user = document.querySelector(this._selectorName);
    this._job = document.querySelector(this._selectorJob);
  }
  getUserInfo() {
    return { user: this._user, job: this._job };
  }
  setUserInfo(input) {
    this._user.textContent = input.user;
    this._job.textContent = input.job;
  }
}
