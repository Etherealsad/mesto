import {
    FormValidator
} from "../src/scripts/FormValidator.js";
import {
    Card
} from "../src/scripts/Card.js";
import {
    initialCards
} from "../src/scripts/initial-cards.js";
import '../src/pages/index.css';
import Section from '../src/scripts/Section.js';
import PopupWithForm from '../src/scripts/PopupWithForm.js';
import popupWithImage from '../src/scripts/PopupWithImage.js';
import UserInfo from '../src/scripts/UserInfo.js';
import { cardsContainer, tempalateElement, nameselector, subtitleSelector,
    popupProfileSelector, popupPictureSelector, popupImageSelector, 
    editProfileButton, formProfileElement, formNewPictureElement,
    profileTitle, profileSubtitle, userNameInput, userJobInput, addPictureButton, object } from "./utils/constants.js";


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
        name: data['title'],
        link: data['picture']
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