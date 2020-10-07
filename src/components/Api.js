export class Api {
  constructor(url, token) {
    this.url = url;
    this.token = token;
  }

  getParse(info) {
    return fetch(`${this.url}${info}`, {
      headers: {
        authorization: `${this.token}`,
      },
    })
      .then((responce) => (responce.ok ? responce : Promise.reject(responce)))
      .then((response) => response.json())
      .then((res) => JSON.stringify([res]))
      .then((result) => {
        return JSON.parse(result);
      });
  }

  setParse() {}
}
