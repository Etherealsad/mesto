import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, handleConfirm) {
        super(popupSelector);
        this._handleConfirm = handleConfirm
        this._btnСonfirm = this._popup.querySelector('.popup__save_agreement')
    }

    open(removeCard, delCardID) {
        super.open();
        this._delCardID = delCardID;
        this._removeCard = removeCard;
    }

    setEventListeners() {
        super.setEventListeners();
        this._btnСonfirm.addEventListener('click', (evt) => {
            evt.preventDefault();
            
        })
    }
}