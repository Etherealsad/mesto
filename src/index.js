import {
    FormValidator
} from "../scripts/FormValidator.js";
import {
    Card
} from "../scripts/Card.js";
import {
    initialCards
} from "../scripts/initial-cards.js";
import '../pages/index.css';
import Section from '../scripts/Section.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import popupWithImage from '../scripts/PopupWithImage.js';
import UserInfo from '../scripts/UserInfo.js';
import { cardsContainer, tempalateElement, nameselector, subtitleSelector,
    popupProfileSelector, popupPictureSelector, popupImageSelector, 
    editProfileButton, formProfileElement, formNewPictureElement,
    profileTitle, profileSubtitle, userNameInput, userJobInput, addPictureButton } from "./utils/constants.js";



const object = {
    fieldsetSelector: '.popup__fieldset',
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

const editFormValidator = new FormValidator(object, formProfileElement)
const addPickValidator = new FormValidator(object, formNewPictureElement)

addPickValidator.enableValidation()
editFormValidator.enableValidation()

const popupEditProfile = new PopupWithForm(popupProfileSelector, editProfileHandler)
const popupAddCard = new PopupWithForm(popupPictureSelector, addCardHandler)
const popupImageAdd = new popupWithImage(popupImageSelector)
const userInfo = new UserInfo(nameselector, subtitleSelector)

function editProfileHandler(data) {
    userInfo.setUserInfo(data)
    popupEditProfile.close()
}

function addCardHandler(data) {
    const cardElement = createCard({
        name: data('popup__input_type_pic'),
        link: data('popup__input_type_link')
    })
    cardsContainer.prepend(cardElement)
    popupAddCard.close()
}

export function handleCardClick(cardText, cardImage) {
    popupImageAdd.open(cardText, cardImage)
}

function createCard(data) {
    const card = new Card(data, tempalateElement, handleCardClick)
    return card.createDomNode()
}

const cardList = new Section({
        items: initialCards,
        renderer: (item) => {
            const cardElement = createCard(item)
            cardList.addItem(cardElement)
        },
    },
    cardsContainer
)
cardList.renderItems()

function fillInput() {
    userNameInput.value = profileTitle.textContent
    userJobInput.value = profileSubtitle.textContent
}

editProfileButton.addEventListener('click', () => {
    fillInput()
    editFormValidator.initError()
    popupEditProfile.open()
})

addPictureButton.addEventListener('click', () => {
    formNewPictureElement.reset()
    addPickValidator.initError()
    popupAddCard.open()
})