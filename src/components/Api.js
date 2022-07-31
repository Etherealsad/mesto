export default class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl
        this._headers = headers
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
        .then(this._checkResponse)
    }

    getInitCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET', 
            headers: this._headers
        })
        .then(this._checkResponse)
    }

    editProfile(userData) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: userData['profile-title'],
                about: userData ['profile-subtitle']
            })
        })
        .then(this._checkResponse)
    }

    editAvatar(userAvatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH', 
            headers: this._headers,
            body: JSON.stringify({
                avatar: userAvatar['avatar-url']
            })
        })
        .then(this._checkResponse);
    }

    addCard(cardData) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: cardData['picture-title'],
                link: cardData['picture-url']
            })
        })
        .then(this._checkResponse)
    }

    removeCard(cardID) {
        return fetch(`${this._baseUrl}/cards/${cardID}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._checkResponse);
    }

    addLike(cardID) {
        return fetch(`${this._baseUrl}/cards/${cardID}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
        .then(this._checkResponse)
    }

    removeLike(cardID) {
        return fetch(`${this._baseUrl}/cards/${cardID}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._checkResponse)
    }
}