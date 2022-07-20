/* const popupViewPicture = document.querySelector('.popup_view-picture');
const hugePicture = document.querySelector('.popup__huge-picture'); /* ссылка на картинку */ 
/* const figCaptionPopup = document.querySelector('.popup__figcaption'); /* Подпись к картинке */ 

export class Card {
    constructor(data, cardSelector, openPopup) {
        this._name = data.name
        this._link = data.link
        this._cardSelector = cardSelector
        this._openPopup = openPopup
    }
    
    _getTemplate() {
      const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.element')
        .cloneNode(true)

      return cardElement
    }
    
    createDomNode() {
        this._element = this._getTemplate()
        this._setEventListeners()
        this._elementPic = this._element.querySelector('.element__img')
        this._elementPic.src = this._link
        this._elementPic.alt = this._name
        this._element.querySelector('.element__title').textContent = this._name

        return this._element
    }
    
    _setEventListeners() {
        this._likeBtn = this._element.querySelector('.element__like')
        this._deleteBtn = this._element.querySelector('.element__trash-button')

        this._likeBtn.addEventListener('click', () => {
            this._likeBtn.classList.toggle('element__like-active')
        })

        this._deleteBtn.addEventListener('click', () => {
            this._deleteBtn.closest('.element').remove()
        })

        this._element.querySelector('.element__img').addEventListener('click', () => this._openPopup(this._name, this._link))
    }
}