export default class Card {
    constructor(placeData, cardSelector, openFullViewPopup, userID, deleteCardCallback, likeCardCallback) {
        this._placeData = placeData
        this._cardSelector = cardSelector
        this._openFullViewPopup = openFullViewPopup
        this._likeCounterSelector = '.element__like-counter'
        this._cardDescriptionSelector = '.element__title'
        this._cardPhotoSelector = '.element__img'
        this._userID = userID
        this._deleteCardCallback = deleteCardCallback
        this._isLiked = false
        this._likeCardCallback = likeCardCallback
    }
    
    createDomNode() {
        this._element = this._cardSelector.content.cloneNode(true)
        this._cardDescription = this._element.querySelector(this._cardDescriptionSelector)
        this._cardPhoto = this._element.querySelector(this._cardPhotoSelector)
        this._likeCounter = this._element.querySelector(this._likeCounterSelector)
        this._cardDescription.textContent = this._placeData.name
        this._cardPhoto.src = this._placeData.link
        this._cardPhoto.alt = this._placeData.name
        this._likeCounter.textContent = this._placeData.likes.length
        this._setEventListeners()
    
        if (this._userID !== this._placeData.owner._id) {
          this._deleteButton.classList.add('element__trash-button_type_none');
        }
    
        this._placeData.likes.forEach(person => {
          if (person._id === this._userID) {
            this._toggleLikeButton()
            this._isLiked = true
          }
        })
        
        return this._element
      }

      _toggleLikeButton = () => {
        this._likeButton.classList.toggle('element__like-active')
      }

      setLikeCounter (number) {
        this._likeCounter.textContent = number
      }

      _likeButtonHandler = () => {
        this._toggleLikeButton()
        this._isLiked = !this._isLiked
        this._likeCardCallback(this._isLiked, this._placeData, this)
      }
    
      deleteCard = (evt) => {
        const target = evt.target;
        const card = target.closest('.element');
        card.remove();
      }

      _deleteCardHandler = (evt) => {
        evt.preventDefault();
        this._deleteCardCallback(this._placeData, this, evt);
      }

      _setEventListeners() {
        this._likeButton = this._element.querySelector('.element__like');
        this._likeButton.addEventListener('click', this._likeButtonHandler);
        this._deleteButton = this._element.querySelector('.element__trash-button');
        this._deleteButton.addEventListener('click', this._deleteCardHandler);
        this._cardPhoto.addEventListener('click', this._openFullViewPopup);
      }
    }