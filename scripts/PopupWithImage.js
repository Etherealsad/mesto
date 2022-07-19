import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._hugePic = this._popup.querySelector('.popup__huge-picture')
        this._hugePicFigcap = this._popup.querySelector('.popup__figcaption')
    }
    
    open(name, link) {
        this._hugePic.src = link
        this._hugePic.alt = name
        this._hugePicFigcap.textContent = name
        super.open()
    }
}