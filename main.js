(()=>{"use strict";var t={220:(t,e,n)=>{t.exports=n.p+"b39bbd5d5dfe54548b24.jpg"}},e={};function n(o){var r=e[o];if(void 0!==r)return r.exports;var i=e[o]={exports:{}};return t[o](i,i.exports,n),i.exports}n.p="",(()=>{function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}var e=function(){function e(t,n){var o=t.renderer;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderer=o,this._container=n}var n,o;return n=e,(o=[{key:"addItem",value:function(t,e){t.id===e?this._container.prepend(t):this._container.append(t)}},{key:"renderItems",value:function(t){var e=this;t.forEach((function(t){e._renderer(t)}))}}])&&t(n.prototype,o),e}();function o(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}var r=function(){function t(e,n,o){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._url=e.url,this._token=e.token,this._user=n,this._cards=o}var e,n;return e=t,(n=[{key:"getResponse",value:function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}},{key:"getInfoUser",value:function(){return fetch("".concat(this._url).concat(this._user),{headers:{authorization:"".concat(this._token)}}).then(this.getResponse)}},{key:"getInfoCards",value:function(){return fetch("".concat(this._url).concat(this._cards),{headers:{authorization:"".concat(this._token)}}).then(this.getResponse)}},{key:"updateUserInfo",value:function(t){return fetch("".concat(this._url).concat(this._user),{method:"PATCH",headers:{authorization:"".concat(this._token),"Content-Type":"application/json"},body:JSON.stringify({name:t.name,about:t.job})}).then(this.getResponse)}},{key:"updateUserAvatar",value:function(t){return fetch("".concat(this._url).concat(this._user,"/avatar"),{method:"PATCH",headers:{authorization:"".concat(this._token),"Content-Type":"application/json"},body:JSON.stringify({avatar:t.avatar})}).then(this.getResponse)}},{key:"addCard",value:function(t){return fetch("".concat(this._url).concat(this._cards),{method:"POST",headers:{authorization:"".concat(this._token),"Content-Type":"application/json"},body:JSON.stringify({name:t.place,link:t.card})}).then(this.getResponse)}},{key:"addLike",value:function(t){return fetch("".concat(this._url).concat(this._cards,"/likes/").concat(t),{method:"PUT",headers:{authorization:"".concat(this._token),"Content-Type":"application/json"}}).then(this.getResponse)}},{key:"deleteLike",value:function(t){return fetch("".concat(this._url).concat(this._cards,"/likes/").concat(t),{method:"DELETE",headers:{authorization:"".concat(this._token),"Content-Type":"application/json"}}).then(this.getResponse)}},{key:"deleteCard",value:function(t){return fetch("".concat(this._url).concat(this._cards,"/").concat(t),{method:"DELETE",headers:{authorization:"".concat(this._token),"Content-type":"application/json; charset=UTF-8"}}).then(this.getResponse)}}])&&o(e.prototype,n),t}(),i=n(220);function u(t){"Сохранить"===t.textContent?t.textContent="Сохранение...":t.textContent="Сохранить"}function s(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}var c=function(){function t(e,n,o,r,i,u,s){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._cardElement=document.querySelector(n).content,this._text=e.name,this._image=e.link,this.likes=e.likes,this._id=e._id,this._ownerID=e.owner,this._myId=s,this._handleCardClick=o,this._handleDeleteCardClick=r.bind(this),this._handleLikeCardClick=i,this._disLikesRequest=u,this.remove=this.remove.bind(this),this._element=this._cardElement.querySelector(".element").cloneNode(!0),this._imageCard=this._element.querySelector(".element__pic"),this._title=this._element.querySelector(".element__title"),this._buttonTrash=this._element.querySelector(".element__button-trash"),this._buttonLike=this._element.querySelector(".element__button-like"),this._counter=this._element.querySelector(".element__counter-like")}var e,n;return e=t,(n=[{key:"generateCard",value:function(){var t,e=this;return this._element.id=this._ownerID._id,this._element.cardId=this._id,(t=this._image,new Promise((function(e,n){var o=new Image;o.src=t,o.onload=function(){return e(t)},o.onerror=function(){return n(i)}}))).then((function(t){return e._imageCard.src=t})).catch((function(t){return e._imageCard.src=t})),this._imageCard.alt=this._text,this._imageCard.title=this._ownerID.name,this._title.textContent=this._text,this._title.title=this._title.textContent,this._setEventListeners(),this._counterLike(),this._element}},{key:"_setEventListeners",value:function(){var t=this;this._buttonLike.addEventListener("click",(function(){t._setLike()})),this._myId===this._ownerID._id&&(this._buttonTrash.classList.toggle("element__button-trash_hidden"),this._buttonTrash.addEventListener("click",this._handleDeleteCardClick)),this._element.addEventListener("click",(function(e){t._zoom(e)}))}},{key:"_setLike",value:function(){var t=this;this.likes.find((function(e){return e._id===t._myId}))||this._buttonLike.classList.contains("element__button-like_color_black")?(this._buttonLike.classList.remove("element__button-like_color_black"),this.likes.pop(this._myId),this._disLikesRequest(this._id),this._counterLike()):(this._buttonLike.classList.add("element__button-like_color_black"),this.likes.push(this._myId),this._handleLikeCardClick(this._id),this._counterLike())}},{key:"_counterLike",value:function(){var t=this;this._counter.title=this.likes.map((function(t){return t.name})),this._counter.textContent=this.likes.length,this.likes.find((function(e){return e._id===t._myId}))&&this._buttonLike.classList.add("element__button-like_color_black")}},{key:"_zoom",value:function(t){t.target.classList.contains("element__pic")&&this._handleCardClick.open(this._text,this._image)}},{key:"remove",value:function(){this._element.remove(),this._element=null}}])&&s(e.prototype,n),t}();function a(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}var l=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._selectorName=e.user,this._selectorJob=e.job,this._selectorAvatar=e.avatar,this._user=document.querySelector(this._selectorName),this._job=document.querySelector(this._selectorJob),this._avatar=document.querySelector(this._selectorAvatar)}var e,n;return e=t,(n=[{key:"getUserInfo",value:function(){return{name:this._user,about:this._job}}},{key:"getID",get:function(){return this.myID}},{key:"setId",set:function(t){this.myID=t}},{key:"setUserInfo",value:function(t){var e=t.name,n=void 0===e?this._user.textContent:e,o=t.about,r=void 0===o?this._job.textContent:o,i=t.avatar,u=void 0===i?this._avatar.style.backgroundImage:i,s=t._id,c=void 0===s?this.getID:s;this._avatar.style.backgroundImage="url(".concat(u,")"),this.setId=c,this._user.textContent=n,this._user.title=n,this._job.textContent=r,this._job.title=r}}])&&a(e.prototype,n),t}();function f(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}var h=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._inputSelector=e.inputSelector,this._submitButtonSelector=e.submitButtonSelector,this._inactiveButtonClass=e.inactiveButtonClass,this._inputErrorClass=e.inputErrorClass,this._errorClass=e.errorClass,this._form=n}var e,n;return e=t,(n=[{key:"enableValidation",value:function(){this._inputList=Array.from(this._form.querySelectorAll(this._inputSelector)),this._setEventListeners()}},{key:"_setEventListeners",value:function(){var t=this;this._buttonElement=this._form.querySelector(this._submitButtonSelector),this._toggleButtonState(),this._inputList.forEach((function(e){e.addEventListener("input",(function(){t._checkInputValidity(e),t._toggleButtonState()})),e.addEventListener("focus",(function(){t._toggleButtonState(),t._clearError()}))}))}},{key:"_toggleButtonState",value:function(){this._hasInvalidInput(this._inputList)?(this._buttonElement.classList.add(this._inactiveButtonClass),this._buttonElement.setAttribute("disabled",!0)):(this._buttonElement.classList.remove(this._inactiveButtonClass),this._buttonElement.removeAttribute("disabled"))}},{key:"_hasInvalidInput",value:function(t){return t.some((function(t){return!t.validity.valid}))}},{key:"_checkInputValidity",value:function(t){t.validity.valid?this._hideInputError(t):this._showInputError(t,t.validationMessage)}},{key:"_showInputError",value:function(t,e){var n=this._form.querySelector("#".concat(t.id,"-error"));t.classList.add(this._inputErrorClass),n.textContent=e,n.classList.add(this._errorClass)}},{key:"_hideInputError",value:function(t){var e=this._form.querySelector("#".concat(t.id,"-error"));t.classList.remove(this._inputErrorClass),e.classList.remove(this._errorClass),this._clearError()}},{key:"_clearError",value:function(){this._error=this._form.querySelectorAll(".popup__input-error"),this._error.forEach((function(t){t.textContent=""}))}}])&&f(e.prototype,n),t}();function p(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}var _=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._popupSelector=e,this._popup=document.querySelector(this._popupSelector),this._buttonClose=this._popup.querySelector(".popup__button-close"),this.close=this.close.bind(this),this._handlePopupClose=this._handlePopupClose.bind(this),this._handleEscClose=this._handleEscClose.bind(this)}var e,n;return e=t,(n=[{key:"open",value:function(){this._popup.classList.add("popup_opened"),this._setEventListeners()}},{key:"close",value:function(){this._popup.classList.remove("popup_opened"),window.removeEventListener("keydown",this._handleEscClose),this._popup.removeEventListener("mousedown",this._handlePopupClose),this._buttonClose.removeEventListener("click",this.close)}},{key:"_handleEscClose",value:function(t){"Escape"===t.key&&this.close()}},{key:"_handlePopupClose",value:function(t){(t.target===t.currentTarget||t.target.classList.contains("popup__button-close"))&&this.close()}},{key:"_setEventListeners",value:function(){this._popup.addEventListener("mousedown",this._handlePopupClose),window.addEventListener("keydown",this._handleEscClose),this._buttonClose.addEventListener("click",this.close)}}])&&p(e.prototype,n),t}();function d(t){return(d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function y(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function m(t,e,n){return(m="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var o=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=k(t)););return t}(t,e);if(o){var r=Object.getOwnPropertyDescriptor(o,e);return r.get?r.get.call(n):r.value}})(t,e,n||t)}function v(t,e){return(v=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function b(t,e){return!e||"object"!==d(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function k(t){return(k=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var g=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&v(t,e)}(u,t);var e,n,o,r,i=(o=u,r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=k(o);if(r){var n=k(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return b(this,t)});function u(t,e){var n;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),(n=i.call(this,e))._form=document.forms.formTrash,n._deleteCard=t,n}return e=u,(n=[{key:"_setEventListeners",value:function(){m(k(u.prototype),"_setEventListeners",this).call(this),this._form.addEventListener("submit",this._deleteCard)}},{key:"close",value:function(){m(k(u.prototype),"close",this).call(this),this._form.removeEventListener("submit",this._deleteCard)}}])&&y(e.prototype,n),u}(_);function C(t){return(C="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function w(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function E(t,e,n){return(E="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var o=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=j(t)););return t}(t,e);if(o){var r=Object.getOwnPropertyDescriptor(o,e);return r.get?r.get.call(n):r.value}})(t,e,n||t)}function S(t,e){return(S=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function L(t,e){return!e||"object"!==C(e)&&"function"!=typeof e?O(t):e}function O(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function j(t){return(j=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var I=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&S(t,e)}(u,t);var e,n,o,r,i=(o=u,r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=j(o);if(r){var n=j(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return L(this,t)});function u(t,e){var n;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),(n=i.call(this,t))._callbackSubmit=e,n.form=n._popup.querySelector(".popup__container"),n._inputList=Array.from(n.form.querySelectorAll(".popup__input")),n._submit=n._submit.bind(O(n)),n.buttonSubmit=n.form.querySelector(".popup__button-submit"),n.close=n.close.bind(O(n)),n}return e=u,(n=[{key:"_setEventListeners",value:function(){E(j(u.prototype),"_setEventListeners",this).call(this),this.form.addEventListener("submit",this._submit)}},{key:"close",value:function(){E(j(u.prototype),"close",this).call(this),this.form.removeEventListener("submit",this._submit),this.form.reset()}},{key:"_submit",value:function(t){t.preventDefault(),this._callbackSubmit(this._getInputValues())}},{key:"_getInputValues",value:function(){var t={};return this._inputList.forEach((function(e){return t[e.name]=e.value})),t}}])&&w(e.prototype,n),u}(_);function P(t){return(P="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function R(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function q(t,e,n){return(q="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var o=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=A(t)););return t}(t,e);if(o){var r=Object.getOwnPropertyDescriptor(o,e);return r.get?r.get.call(n):r.value}})(t,e,n||t)}function T(t,e){return(T=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function x(t,e){return!e||"object"!==P(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function A(t){return(A=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var B=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&T(t,e)}(u,t);var e,n,o,r,i=(o=u,r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=A(o);if(r){var n=A(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return x(this,t)});function u(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),(e=i.call(this,t))._image=e._popup.querySelector(".popup__pic"),e._place=e._popup.querySelector(".popup__place-pic"),e}return e=u,(n=[{key:"open",value:function(t,e){q(A(u.prototype),"open",this).call(this),this._image.src=e,this._image.alt=t,this._place.textContent=t}}])&&R(e.prototype,n),u}(_),D={inputSelector:".popup__input",submitButtonSelector:".popup__button-submit",inactiveButtonClass:"popup__button-submit_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active"},U={user:".profile__title",job:".profile__subtitle",avatar:".profile__avatar"},z=document.forms.formCard,V=z.elements.place,N=(z.elements.card,z.querySelector(".popup__button-submit")),J=document.querySelector(".profile"),F=(document.querySelector(U.user),document.querySelector(U.job),J.querySelector(U.avatar),J.querySelector(".profile__edit-button")),H=J.querySelector(".profile__add-button"),M=document.querySelector(".elements"),$=document.forms.formProfile,G=$.elements.name,K=$.elements.job,Q=$.querySelector(".popup__button-submit"),W=document.forms.formAvatar,X=W.elements.avatar,Y=(formTrash.elements.trash,W.querySelector(".popup__button-submit")),Z=document.querySelector(".loader"),tt=J.querySelector(U.avatar);function et(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=new Array(e);n<e;n++)o[n]=t[n];return o}function nt(t,e,n){return(nt=ot()?Reflect.construct:function(t,e,n){var o=[null];o.push.apply(o,e);var r=new(Function.bind.apply(t,o));return n&&rt(r,n.prototype),r}).apply(null,arguments)}function ot(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}function rt(t,e){return(rt=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var it=new r({url:"https://mesto.nomoreparties.co/v1/cohort-16/",token:"bba27b67-a97d-4fd9-b42d-01c5b1258337"},"users/me","cards"),ut=new B(".popup_type_zoom"),st=new l(U);function ct(t){t?Z.classList.remove("loader_hidden"):Z.classList.add("loader_hidden")}var at,lt=function(){it.addLike.apply(it,arguments).catch((function(t){return console.log("Ошибка нового лайка",t)}))},ft=function(){it.deleteLike.apply(it,arguments).catch((function(t){return console.log("Ошибка удаления лайка",t)}))};at=yt,ct(!0),Promise.all([it.getInfoUser(),it.getInfoCards()]).then((function(t){var e,n,o=(n=2,function(t){if(Array.isArray(t))return t}(e=t)||function(t,e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t)){var n=[],o=!0,r=!1,i=void 0;try{for(var u,s=t[Symbol.iterator]();!(o=(u=s.next()).done)&&(n.push(u.value),!e||n.length!==e);o=!0);}catch(t){r=!0,i=t}finally{try{o||null==s.return||s.return()}finally{if(r)throw i}}return n}}(e,n)||function(t,e){if(t){if("string"==typeof t)return et(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?et(t,e):void 0}}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),r=o[0],i=o[1];(function(){st.setUserInfo.apply(st,arguments)})(r),at(i)})).catch((function(t){return console.log("Данные с ошибкой",t)})).finally((function(){return ct(!1)}));var ht=st.getUserInfo(),pt=new I(".popup_type_profile",(function(t){u(Q),it.updateUserInfo(t).then((function(t){st.setUserInfo(t),pt.close()})).catch((function(t){return console.log("Ошибка в данных профиля",t)})).finally((function(){return u(Q)}))})),_t=new I(".popup_type_card",(function(t){u(N),ct(!0),it.addCard(t).then((function(t){!function(){yt.apply(void 0,arguments)}([t]),_t.close()})).catch((function(t){return console.log("Что то с добавлением карточки",t)})).finally((function(){u(N),ct(!1)}))})),dt=new I(".popup_type_avatar",(function(t){u(Y),it.updateUserAvatar(t).then((function(t){st.setUserInfo(t),dt.close()})).catch((function(t){return console.log("Ошибка в данных профиля",t)})).finally((function(){return u(Y)}))}));function yt(t){var n=st.getID,o=new e({renderer:function(t){var e=function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return nt(c,e)}(t,"#card",ut,(function(){return t=e,void(n=new g((function(e){e.preventDefault(),it.deleteCard(t.cardId).then((function(){t.remove()})).catch((function(t){return console.log("Карточка осталась",t)})).finally((function(){return n.close()}))}),".popup_type_trash")).open();var t,n}),lt,ft,n).generateCard();o.addItem(e,n)}},M);o.renderItems(t)}new h(D,$).enableValidation(),new h(D,W).enableValidation(),new h(D,z).enableValidation(),F.addEventListener("mousedown",(function(){G.value=ht.name.textContent,K.value=ht.about.textContent,setTimeout((function(){return G.focus()}),100),pt.open()})),H.addEventListener("mousedown",(function(){setTimeout((function(){return V.focus()}),100),_t.open()})),tt.addEventListener("click",(function(){setTimeout((function(){return X.focus()}),100),dt.open()}))})()})();