export class UserInfo {
  constructor(selectorName, selectorJob) {
    this._selectorName = selectorName;
    this._selectorJob = selectorJob;
  }
  getUserInfo(inputName, inputJob) {
    this._name = document.querySelector(this._selectorName);
    inputName.value = this._name.textContent;
    this._job = document.querySelector(this._selectorJob);
    inputJob.value = this._job.textContent;
  }
  setUserInfo(inputName, inputJob) {
    this._name.textContent = inputName.value;
    this._job.textContent = inputJob.value;
  }
}
