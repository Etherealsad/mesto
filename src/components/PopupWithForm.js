import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmitForm) {
        super(popupSelector)
        //this._inactiveButtonClass = 'popup__save_inactive'
        this._handleSubmitForm = handleSubmitForm
        this._form = this._popup.querySelector('.popup__form')
        this._inputList = this._form.querySelectorAll('.popup__input')
        this._submBtn = this._form.querySelector('.popup__save');
    }
    
     setSubmitButtonText(buttonText) {
        this._submBtn.textContent = buttonText
      }

    setSubmitButtonAttribute() {
        this._submBtn.setAttribute('disabled', true)
        //this._submBtn.classList.add(this._inactiveButtonClass)
      }

    setSubmitCallback(callback) {
        this._handleSubmitForm = callback
      } 

    _inputValues() {
        this._formValues = {}
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value
        })
        return this._formValues
    }
    
    setEventListeners() {
        super.setEventListeners()
        this._form.addEventListener('submit', this._submitHandler)
    }

    _submitHandler = (evt) => {
        evt.preventDefault()
            this._handleSubmitForm(this._inputValues())
    }

    close() {
        super.close()
        this._form.reset()
        this._form.removeEventListener('submit', this._submitHandler)
    }

    loading (popup, isLoaded)  {
        if (isLoaded) {
            if (popup === popupAddCard) {
                popup.setSubmitButtonText('Создать')
            } else {
                popup.setSubmitButtonText('Сохранить')
            } 
        } else {
            popup.setSubmitButtonText('Сохранение...')
            popup.setSubmitButtonAttribute()
        }
    }
}