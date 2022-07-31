import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._hugePic = this._popup.querySelector('.popup__huge-picture')
        this._hugePicFigcap = this._popup.querySelector('.popup__figcaption')
    }
    
    open(evt) {
        const target = evt.target
        this._hugePic.src = target.src
        this._hugePic.alt = target.alt
        this._hugePicFigcap.textContent = target.alt
        super.open()
    }
}