!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=1)}([function(t,e,n){},function(t,e,n){"use strict";n.r(e);n(0);function r(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var o=function(){function t(e,n,r,o,i,u,c){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._text=e.place||e.name,this._image=e.card||e.link,this.likes=e.likes,this._id=e._id,this._ownerID=e.owner,this._myId=c,this._cardSelector=n,this._handleCardClick=r,this._handleDeleteCardClick=o.bind(this),this._handleLikeCardClick=i,this._disLikesRequest=u,this.remove=this.remove.bind(this)}var e,n,o;return e=t,(n=[{key:"_getTemplate",value:function(){return document.querySelector(this._cardSelector).content.querySelector(".element").cloneNode(!0)}},{key:"generateCard",value:function(){return this._element=this._getTemplate(),this._element.id=this._ownerID._id,this._imageCard=this._element.querySelector(".element__pic"),this._imageCard.src=this._image,this._imageCard.alt=this._text,this._title=this._element.querySelector(".element__title"),this._title.textContent=this._text,this._title.title=this._title.textContent,this._searchElement(this._element),this._setEventListeners(),this._counterLike(),this._element}},{key:"_searchElement",value:function(){this._buttonTrash=this._element.querySelector(".element__button-trash"),this._buttonLike=this._element.querySelector(".element__button-like"),this._buttonLike.title=this._ownerID.name}},{key:"_setEventListeners",value:function(){var t=this;this._buttonLike.addEventListener("click",(function(){t._setLike()})),this._myId===this._ownerID._id&&(this._buttonTrash.classList.toggle("element__button-trash_hidden"),this._buttonTrash.addEventListener("click",(function(){t._handleDeleteCardClick(t._id,t._element)}))),this._element.addEventListener("click",(function(e){t._zoom(e)}))}},{key:"_setLike",value:function(){var t=this;this.likes.find((function(e){return e._id===t._myId}))||this._buttonLike.classList.contains("element__button-like_color_black")?(this._buttonLike.classList.remove("element__button-like_color_black"),this.likes.pop(this._myId),this._disLikesRequest(this._id),this._counterLike()):(this._buttonLike.classList.add("element__button-like_color_black"),this.likes.push(this._myId),this._handleLikeCardClick(this._id),this._counterLike())}},{key:"_counterLike",value:function(){var t=this;this._element.querySelector(".element__counter-like").textContent=this.likes.length,this.likes.find((function(e){return e._id===t._myId}))&&this._buttonLike.classList.add("element__button-like_color_black")}},{key:"_zoom",value:function(t){t.target.classList.contains("element__pic")&&this._handleCardClick.open(this._text,this._image)}},{key:"remove",value:function(){this._element.remove(),this._element=null}}])&&r(e.prototype,n),o&&r(e,o),t}();function i(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var u=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._inputSelector=e.inputSelector,this._submitButtonSelector=e.submitButtonSelector,this._inactiveButtonClass=e.inactiveButtonClass,this._inputErrorClass=e.inputErrorClass,this._errorClass=e.errorClass,this._form=n}var e,n,r;return e=t,(n=[{key:"enableValidation",value:function(){this._form.addEventListener("submit",(function(t){t.preventDefault()})),this._inputList=Array.from(this._form.querySelectorAll(this._inputSelector)),this._setEventListeners()}},{key:"_setEventListeners",value:function(){var t=this;this._buttonElement=this._form.querySelector(this._submitButtonSelector),this._toggleButtonState(),this._inputList.forEach((function(e){e.addEventListener("input",(function(){t._checkInputValidity(e)})),e.addEventListener("input",(function(){t._toggleButtonState()})),e.addEventListener("focus",(function(){t._toggleButtonState()})),e.addEventListener("focus",(function(){t._clearError()}))}))}},{key:"_toggleButtonState",value:function(){this._hasInvalidInput(this._inputList)?(this._buttonElement.classList.add(this._inactiveButtonClass),this._buttonElement.setAttribute("disabled",!0)):(this._buttonElement.classList.remove(this._inactiveButtonClass),this._buttonElement.removeAttribute("disabled"))}},{key:"_hasInvalidInput",value:function(t){return t.some((function(t){return!t.validity.valid}))}},{key:"_checkInputValidity",value:function(t){t.validity.valid?this._hideInputError(t):this._showInputError(t,t.validationMessage)}},{key:"_showInputError",value:function(t,e){var n=this._form.querySelector("#".concat(t.id,"-error"));t.classList.add(this._inputErrorClass),n.textContent=e,n.classList.add(this._errorClass)}},{key:"_hideInputError",value:function(t){var e=this._form.querySelector("#".concat(t.id,"-error"));t.classList.remove(this._inputErrorClass),e.classList.remove(this._errorClass),this._clearError()}},{key:"_clearError",value:function(){this._error=this._form.querySelectorAll(".popup__input-error"),this._error.forEach((function(t){t.textContent=""}))}}])&&i(e.prototype,n),r&&i(e,r),t}(),c={inputSelector:".popup__input",submitButtonSelector:".popup__button-submit",inactiveButtonClass:"popup__button-submit_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active"};function s(t){"Сохранить"===t.textContent?t.textContent="Сохранение...":t.textContent="Сохранить"}var a={user:".profile__title",job:".profile__subtitle",avatar:".profile__avatar"},l=document.forms.formCard,f=l.elements.place,p=(l.elements.card,l.querySelector(".popup__button-submit")),h=document.querySelector(".profile"),_=(document.querySelector(a.user),document.querySelector(a.job),h.querySelector(".profile__edit-button")),y=h.querySelector(".profile__add-button"),d=document.querySelector(".elements"),m=document.forms.formProfile,b=m.elements.name,v=m.elements.job,k=m.querySelector(".popup__button-submit"),g=document.forms.formAvatar,S=g.elements.avatar,C=(formTrash.elements.trash,g.querySelector(".popup__button-submit")),E=".popup_type_profile",w=".popup_type_card",L=".popup_type_avatar",j=".popup_type_trash",O=".popup_type_zoom",P={url:"https://mesto.nomoreparties.co/v1/cohort-16/",token:"bba27b67-a97d-4fd9-b42d-01c5b1258337",myID:"066c34d31720ba2fb9acb601"};function I(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var q=function(){function t(e,n){var r=e.renderer;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._renderer=r,this._container=n}var e,n,r;return e=t,(n=[{key:"addItem",value:function(t,e){t.id===e?this._container.prepend(t):this._container.append(t)}},{key:"renderItems",value:function(t){var e=this;t.forEach((function(t){e._renderer(t)}))}}])&&I(e.prototype,n),r&&I(e,r),t}();function T(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var R=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._popupSelector=e,this._popup=document.querySelector(this._popupSelector),this._buttonClose=this._popup.querySelector(".popup__button-close"),this.close=this.close.bind(this),this._handlePopupClose=this._handlePopupClose.bind(this),this._handleEscClose=this._handleEscClose.bind(this)}var e,n,r;return e=t,(n=[{key:"open",value:function(){this._popup.classList.add("popup_opened"),this._setEventListeners()}},{key:"close",value:function(){this._popup.classList.remove("popup_opened"),window.removeEventListener("keydown",this._handleEscClose),this._popup.removeEventListener("mousedown",this._handlePopupClose),this._buttonClose.removeEventListener("click",this.close)}},{key:"_handleEscClose",value:function(t){"Escape"===t.key&&this.close()}},{key:"_handlePopupClose",value:function(t){(t.target===t.currentTarget||t.target.classList.contains("popup__button-close"))&&this.close()}},{key:"_setEventListeners",value:function(){this._popup.addEventListener("mousedown",this._handlePopupClose),window.addEventListener("keydown",this._handleEscClose),this._buttonClose.addEventListener("click",this.close)}}])&&T(e.prototype,n),r&&T(e,r),t}();function x(t){return(x="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function D(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function A(t,e,n){return(A="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=N(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(n):o.value}})(t,e,n||t)}function U(t,e){return(U=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function B(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=N(t);if(e){var o=N(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return z(this,n)}}function z(t,e){return!e||"object"!==x(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function N(t){return(N=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var J=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&U(t,e)}(i,t);var e,n,r,o=B(i);function i(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,i),(e=o.call(this,t))._popup=document.querySelector(e._popupSelector),e._image=e._popup.querySelector(".popup__pic"),e._place=e._popup.querySelector(".popup__place-pic"),e}return e=i,(n=[{key:"open",value:function(t,e){A(N(i.prototype),"open",this).call(this),this._image.src=e,this._image.alt=t,this._place.textContent=t}}])&&D(e.prototype,n),r&&D(e,r),i}(R);function V(t){return(V="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function M(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function F(t,e,n){return(F="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=W(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(n):o.value}})(t,e,n||t)}function H(t,e){return(H=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function G(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=W(t);if(e){var o=W(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return K(this,n)}}function K(t,e){return!e||"object"!==V(e)&&"function"!=typeof e?Q(t):e}function Q(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function W(t){return(W=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var X=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&H(t,e)}(i,t);var e,n,r,o=G(i);function i(t,e){var n;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,i),(n=o.call(this,t))._callbackSubmit=e,n._popup=document.querySelector(n._popupSelector),n.form=n._popup.querySelector(".popup__container"),n._inputList=Array.from(n.form.querySelectorAll(".popup__input")),n._submit=n._submit.bind(Q(n)),n.buttonSubmit=n.form.querySelector(".popup__button-submit"),n.close=n.close.bind(Q(n)),n}return e=i,(n=[{key:"_setEventListeners",value:function(){F(W(i.prototype),"_setEventListeners",this).call(this),this.form.addEventListener("submit",this._submit)}},{key:"close",value:function(){F(W(i.prototype),"close",this).call(this),this.form.removeEventListener("submit",this._submit),this.form.reset()}},{key:"_submit",value:function(t){t.preventDefault(),this._callbackSubmit(this._getInputValues())}},{key:"_getInputValues",value:function(){var t={};return this._inputList.forEach((function(e){return t[e.name]=e.value})),t}}])&&M(e.prototype,n),r&&M(e,r),i}(R);function Y(t){return(Y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function Z(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function $(t,e,n){return($="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=rt(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(n):o.value}})(t,e,n||t)}function tt(t,e){return(tt=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function et(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=rt(t);if(e){var o=rt(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return nt(this,n)}}function nt(t,e){return!e||"object"!==Y(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function rt(t){return(rt=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var ot=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&tt(t,e)}(i,t);var e,n,r,o=et(i);function i(t,e){var n;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,i),(n=o.call(this,e))._popup=document.querySelector(n._popupSelector),n._form=document.forms.formTrash,n._deleteCard=t,n}return e=i,(n=[{key:"_setEventListeners",value:function(){$(rt(i.prototype),"_setEventListeners",this).call(this),this._form.addEventListener("submit",this._deleteCard)}},{key:"close",value:function(){$(rt(i.prototype),"close",this).call(this),this._form.removeEventListener("submit",this._deleteCard)}}])&&Z(e.prototype,n),r&&Z(e,r),i}(R);function it(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var ut=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._selectorName=e.user,this._selectorJob=e.job,this._selectorAvatar=e.avatar,this._user=document.querySelector(this._selectorName),this._job=document.querySelector(this._selectorJob),this._avatar=document.querySelector(this._selectorAvatar)}var e,n,r;return e=t,(n=[{key:"getUserInfo",value:function(){return{name:this._user,about:this._job}}},{key:"setUserInfo",value:function(t){var e=t.name,n=t.about,r=t.avatar;r?this._avatar.src=r:(this._user.textContent=e,this._user.title=e,this._job.textContent=n,this._job.title=n)}}])&&it(e.prototype,n),r&&it(e,r),t}();function ct(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function st(t,e,n){return(st=at()?Reflect.construct:function(t,e,n){var r=[null];r.push.apply(r,e);var o=new(Function.bind.apply(t,r));return n&&lt(o,n.prototype),o}).apply(null,arguments)}function at(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function lt(t,e){return(lt=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var ft=new(function(){function t(e,n,r){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._url=e.url,this._token=e.token,this._user=n,this._cards=r}var e,n,r;return e=t,(n=[{key:"getInfoUser",value:function(){return fetch("".concat(this._url).concat(this._user),{headers:{authorization:"".concat(this._token)}}).then((function(t){return t.ok?t:Promise.reject(t)})).then((function(t){return t.json()})).then((function(t){return JSON.parse(JSON.stringify(t))}))}},{key:"getInfoCards",value:function(){return fetch("".concat(this._url).concat(this._cards),{headers:{authorization:"".concat(this._token)}}).then((function(t){return t.ok?t:Promise.reject(t)})).then((function(t){return t.json()})).then((function(t){return JSON.parse(JSON.stringify([t]))}))}},{key:"updateUserInfo",value:function(t){return fetch("".concat(this._url).concat(this._user),{method:"PATCH",headers:{authorization:"".concat(this._token),"Content-Type":"application/json"},body:JSON.stringify({name:t.name,about:t.job})}).then((function(t){return t.ok?t:Promise.reject(t)})).then((function(t){return t.json()}))}},{key:"updateUserAvatar",value:function(t){return fetch("".concat(this._url).concat(this._user,"/avatar"),{method:"PATCH",headers:{authorization:"".concat(this._token),"Content-Type":"application/json"},body:JSON.stringify({avatar:t.avatar})}).then((function(t){return t.ok?t:Promise.reject(t)})).then((function(t){return t.json()}))}},{key:"addCard",value:function(t){return fetch("".concat(this._url).concat(this._cards),{method:"POST",headers:{authorization:"".concat(this._token),"Content-Type":"application/json"},body:JSON.stringify({name:t.place,link:t.card})}).then((function(t){return t.ok?t:Promise.reject(t)})).then((function(t){return t.json()}))}},{key:"addLike",value:function(t){return fetch("".concat(this._url).concat(this._cards,"/likes/").concat(t),{method:"PUT",headers:{authorization:"".concat(this._token),"Content-Type":"application/json"}}).then((function(t){return t.ok?t:Promise.reject(t)}))}},{key:"deleteLike",value:function(t){return fetch("".concat(this._url).concat(this._cards,"/likes/").concat(t),{method:"DELETE",headers:{authorization:"".concat(this._token),"Content-Type":"application/json"}}).then((function(t){return t.ok?t:Promise.reject(t)}))}},{key:"deleteCard",value:function(t){return fetch("".concat(this._url).concat(this._cards,"/").concat(t),{method:"DELETE",headers:{authorization:"".concat(this._token),"Content-type":"application/json; charset=UTF-8"}}).then((function(t){return t.ok?t:Promise.reject(t)}))}}])&&ct(e.prototype,n),r&&ct(e,r),t}())(P,"users/me","cards"),pt=new J(O),ht=new ut(a);var _t=function(){ft.addLike.apply(ft,arguments).catch((function(t){return console.log("Ошибка нового лайка",t)}))},yt=function(){ft.deleteLike.apply(ft,arguments).catch((function(t){return console.log("Ошибка удаления лайка",t)}))};var dt,mt;dt=function(){return ht.setUserInfo.apply(ht,arguments)},ft.getInfoUser().then((function(t){dt(t)})).catch((function(t){return console.log("Информация пользователя с ошибкой",t)})),mt=Ct,ft.getInfoCards().then((function(t){mt(t[0])})).catch((function(t){return console.log("Что то с загрузкой карточек",t)}));var bt=ht.getUserInfo(),vt=new X(E,(function(t){s(k),ft.updateUserInfo(t).then((function(t){ht.setUserInfo({name:t.name,about:t.about}),vt.close()})).catch((function(t){return console.log("Ошибка в данных профиля",t)})).finally((function(){return s(k)}))})),kt=new X(w,(function(t){s(p),ft.addCard(t).then((function(t){!function(){Ct.apply(void 0,arguments)}([t]),kt.close()})).catch((function(t){return console.log("Что то с добавлением карточки",t)})).finally((function(){return s(p)}))})),gt=new X(L,(function(t){s(C),ft.updateUserAvatar(t).then((function(t){ht.setUserInfo({avatar:t.avatar}),gt.close()})).catch((function(t){return console.log("Ошибка в данных профиля",t)})).finally((function(){return s(C)}))})),St=function(t,e){var n=new ot((function(r){r.preventDefault(),ft.deleteCard(t).then((function(){e.style.display="none"})).catch((function(t){return console.log("Карточка осталась",t)})).finally((function(){return n.close()}))}),j);n.open()};function Ct(t){var e=new q({renderer:function(t){var n=function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return st(o,e)}(t,"#card",pt,St,_t,yt,P.myID).generateCard();e.addItem(n,P.myID)}},d);e.renderItems(t)}new u(c,m).enableValidation(),new u(c,g).enableValidation(),new u(c,l).enableValidation(),_.addEventListener("mousedown",(function(){vt.open(),b.value=bt.name.textContent,v.value=bt.about.textContent,setTimeout((function(){return b.focus()}),100)})),y.addEventListener("mousedown",(function(){kt.open(),setTimeout((function(){return f.focus()}),100)})),h.querySelector(a.avatar).addEventListener("click",(function(){gt.open(),setTimeout((function(){return S.focus()}),100)}))}]);