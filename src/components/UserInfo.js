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
    return { name: this._user, about: this._job};
  }

  get getID() {
    return this.myID;
  }

  set setId(id) {
    this.myID = id;
  }
  setUserInfo({
    name = this._user.textContent,
    about = this._job.textContent,
    avatar = this._avatar.style.backgroundImage,
    _id = this.getID,
  }) {
      this._avatar.style.backgroundImage = `url(${avatar})`;
      this.setId = _id;
      this._user.textContent = name;
      this._user.title = name;
      this._job.textContent = about;
      this._job.title = about;
  }
}
