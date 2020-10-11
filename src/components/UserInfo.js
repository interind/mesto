export class UserInfo {
  constructor(infoUser) {
    this._selectorName = infoUser.user;
    this._selectorJob = infoUser.job;
    this._selectorAvatar = infoUser.avatar;
    this._user = document.querySelector(this._selectorName);
    this._job = document.querySelector(this._selectorJob);
    this._avatar = document.querySelector(this._selectorAvatar);
  }
  getUserInfo() {
    return { name: this._user, about: this._job };
  }
  setUserInfo(info) {
    this._user.textContent = info[0].name;
    this._user.title = this._user.textContent;
    this._job.textContent = info[0].about;
    this._job.title = this._job.textContent;
  }
  setUserAvatar(info) {
    this._avatar.src = info.avatar;
  }
}