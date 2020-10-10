export class Api {
  constructor(url, token, info) {
    this._url = url;
    this._token = token;
    this._info = info;
  }

  getInfoServer() {
    return fetch(`${this._url}${this._info}`, {
      headers: {
        authorization: `${this._token}`,
      },
    })
      .then((responce) => (responce.ok ? responce : Promise.reject(responce)))
      .then((response) => response.json())
      .then((res) => JSON.stringify([res]))
      .then((result) => {
        return JSON.parse(result);
      })
      .catch((err) => console.log('GET', err));
  }

  pathProfileServer(userInfo) {
    return fetch(`${this._url}${this._info}`, {
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
      .then((responce) => (responce.ok ? responce : Promise.reject(responce)))
      .then((response) => response.json())
      .then((res) => JSON.stringify([res]))
      .then((result) => {
        return JSON.parse(result);
      })
      .catch((err) => console.log('PATCH USER', err));
  }

  pathAvatarServer(userInfo) {
    return fetch(`${this._url}${this._info}/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `${this._token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: userInfo.avatar,
      }),
    })
      .then((responce) => (responce.ok ? responce : Promise.reject(responce)))
      .then((response) => response.json())
      .then((res) => JSON.stringify([res]))
      .then((result) => {
        return JSON.parse(result);
      })
      .catch((err) => console.log('PATCH AVATAR', err));
  }

  postNewCardServer(cardInfo) {
    return fetch(`${this._url}${this._info}`, {
      method: 'POST',
      headers: {
        authorization: `${this._token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: cardInfo[0].place,
        link: cardInfo[0].card
      }),
    })
      .then((responce) => (responce.ok ? responce : Promise.reject(responce)))
      .then((response) => response.json())
      .then((res) => JSON.stringify([res]))
      .then((result) => {
        return JSON.parse(result);
      })
      .catch((err) => console.log('POST', err));
  }

  putLikeServer(infoId) {
    return fetch(`${this._url}${this._info}/likes/${infoId}`, {
      method: 'PUT',
      headers: {
        authorization: `${this._token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((responce) => (responce.ok ? responce : Promise.reject(responce)))
      .then((response) => response.json())
      .then((res) => JSON.stringify([res]))
      .then((result) => {
        return JSON.parse(result);
      })
      .catch((err) => console.log('PUT', err));
  }

  deleteLikeServer(infoId) {
    return fetch(`${this._url}${this._info}/likes/${infoId}`, {
      method: 'DELETE',
      headers: {
        authorization: `${this._token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((responce) => (responce.ok ? responce : Promise.reject(responce)))
      .then((response) => response.json())
      .then((res) => JSON.stringify([res]))
      .then((result) => {
        return JSON.parse(result);
      })
      .catch((err) => console.log('PUT', err));
  }

  deleteCardServer(id) {
    return fetch(`${this._url}${this._info}/${id.trash}`, {
      method: 'DELETE',
      headers: {
        authorization: `${this._token}`,
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((responce) => (responce.ok ? responce : Promise.reject(responce)))
      .then((response) => response.json())
      .then((res) => JSON.stringify([res]))
      .then((result) => {
        return console.log(JSON.parse(result));
      })
      .catch((err) => console.log('DELETE', err));
  }
}