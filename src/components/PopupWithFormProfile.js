import Popup from './Popup.js';
export class PopupWithFormProfile extends Popup {
 constructor(popupSelector, getInputValues, callbackSubmit) {
   super(popupSelector);
   this._callbackSubmit = callbackSubmit;
   this._getInputValues = getInputValues;
 }
 _setEventListeners() {
   super._setEventListeners();
     this._popupSelector.querySelector('.popup__container_type_profile').addEventListener('submit', () => {
     this._callbackSubmit();
     this.close();
   });
 }
 open() {
 super.open();
 this._getInputValues();
 }
 close() {
 super.close();
 }
 _handleEscClose(evt) {
   super._handleEscClose(evt);
 }
}