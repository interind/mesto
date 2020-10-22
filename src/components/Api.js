export class Api {
  constructor(options, user, cards) {
    this._url = options.url;
    this._token = options.token;
    this._user = user;
    this._cards = cards;
  }

  getInfoUser() {
    return fetch(`${this._url}${this._user}`, {
      headers: {
        authorization: `${this._token}`,
      },
    })
    .then((response) => (response.ok ? response : Promise.reject(response)))
    .then((response) => response.json());
  }

  getInfoCards() {
    return fetch(`${this._url}${this._cards}`, {
      headers: {
        authorization: `${this._token}`,
      },
    })
      .then((response) => (response.ok ? response : Promise.reject(response)))
      .then((response) => response.json())
      .then((res) => JSON.parse(JSON.stringify([res])));
  }

  updateUserInfo(userInfo) {
    return fetch(`${this._url}${this._user}`, {
      method: 'PATCH',
      headers: {
        authorization: `${this._token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: userInfo.name,
        about: userInfo.job,
      }),
    })
      .then((response) => (response.ok ? response : Promise.reject(response)))
      .then((response) => response.json());
  }

  updateUserAvatar(userInfo) {
    return fetch(`${this._url}${this._user}/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `${this._token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: userInfo.avatar,
      }),
    })
      .then((response) => (response.ok ? response : Promise.reject(response)))
      .then((response) => response.json());
  }

  addCard(cardInfo) {
    return fetch(`${this._url}${this._cards}`, {
      method: 'POST',
      headers: {
        authorization: `${this._token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: cardInfo.place,
        link: cardInfo.card,
      }),
    })
      .then((response) => (response.ok ? response : Promise.reject(response)))
      .then((response) => response.json());
  }

  addLike(infoId) {
    return fetch(`${this._url}${this._cards}/likes/${infoId}`, {
      method: 'PUT',
      headers: {
        authorization: `${this._token}`,
        'Content-Type': 'application/json',
      },
    }).then((response) => (response.ok ? response : Promise.reject(response)));
  }

  deleteLike(infoId) {
    return fetch(`${this._url}${this._cards}/likes/${infoId}`, {
      method: 'DELETE',
      headers: {
        authorization: `${this._token}`,
        'Content-Type': 'application/json',
      },
    }).then((response) => (response.ok ? response : Promise.reject(response)));
  }

  deleteCard(id) {
    return fetch(`${this._url}${this._cards}/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `${this._token}`,
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((response) => (response.ok ? response : Promise.reject(response)));
  }
}
