export default class DataService {
  static urlPrefix = "http://localhost:5036";

  static async readAll(url) {
    let data = await fetch(this.urlPrefix + url, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    });
    return data;
  }

  static post(url, data) {
    return fetch(this.urlPrefix + url, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify(data)
    });
  }

  static update(url, data, id) {
    console.log(this.urlPrefix + url + "/" + id)
    console.log(data);
    data.id = id;
    return fetch(this.urlPrefix + url + "/" + id, {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify(data)
    });
  }

  static remove(url, id) {
    return fetch(this.urlPrefix + url + "/" + id, {
      method: "DELETE",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    });
  }

  static getRole = async function (token) {
    const requestParams = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const requestUrl = `https://localhost:7117/user/get-role?token=${token}`;
    const response = await fetch(requestUrl, requestParams);
    return await response.text();
  };
}