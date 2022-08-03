export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector)
    }
    
    open() {
        this.setEventListeners()
        this._popup.classList.add('popup_open')
    }

    close() {
        this._removeEventListeners()
        this._popup.classList.remove('popup_open')
    }

    _closePopupEsc = (evt) => {
        if(evt.key === 'Escape') {
            this.close()
        }
    }

    _clickCloser = (evt) => {
        if (evt.target.classList.contains('popup_open') || evt.target.classList.contains('popup__close-button-img')) {
            this.close()
        }
    }

    setEventListeners() {
        this._popup.addEventListener('click', this._clickCloser)
        document.addEventListener('keydown', this._closePopupEsc)
    }

    _removeEventListeners() {
        this._popup.removeEventListener('click', this._clickCloser)
        document.removeEventListener('keydown', this._closePopupEsc)
  }
}