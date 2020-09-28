export class UserInfo {
  constructor(infoUser) {
    this._selectorName = infoUser.name;
    this._selectorJob = infoUser.job;
    this._name = document.querySelector(this._selectorName);
    this._job = document.querySelector(this._selectorJob);
  }
  getUserInfo(inputName, inputJob) {
    inputName.value = this._name.textContent;
    inputJob.value = this._job.textContent;
  }
  setUserInfo(inputName, inputJob) {
    this._name.textContent = inputName.value;
    this._job.textContent = inputJob.value;
  }
}
