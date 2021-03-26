export class Api {
  constructor(options, user, cards) {
    this._url = options.url;
    this._token = options.token;
    this._user = user;
    this._cards = cards;
  }

  getResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getInfoUser() {
    return fetch(`${this._url}${this._user}`, {
      headers: {
        authorization: `${this._token}`,
      },
    })
      .then(this.getResponse)
  }

  getInfoCards() {
    return fetch(`${this._url}${this._cards}`, {
      headers: {
        authorization: `${this._token}`,
      },
    })
      .then(this.getResponse)
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
      .then(this.getResponse)
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
      .then(this.getResponse)
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
      .then(this.getResponse)
  }

  addLike(infoId) {
    return fetch(`${this._url}${this._cards}/likes/${infoId}`, {
      method: 'PUT',
      headers: {
        authorization: `${this._token}`,
        'Content-Type': 'application/json',
      },
    }).then(this.getResponse);
  }

  deleteLike(infoId) {
    return fetch(`${this._url}${this._cards}/likes/${infoId}`, {
      method: 'DELETE',
      headers: {
        authorization: `${this._token}`,
        'Content-Type': 'application/json',
      },
    }).then(this.getResponse);
  }

  deleteCard(id) {
    return fetch(`${this._url}${this._cards}/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `${this._token}`,
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then(this.getResponse);
  }
}
