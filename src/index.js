import {
    FormValidator
} from "../src/components/FormValidator.js";
import {
    Card
} from "../src/components/Card.js";
import {
    initialCards
} from "../src/components/initial-cards.js";
import '../src/pages/index.css';
import Section from '../src/components/Section.js';
import PopupWithForm from '../src/components/PopupWithForm.js';
import popupWithImage from '../src/components/PopupWithImage.js';
import UserInfo from '../src/components/UserInfo.js';
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

function handleCardClick(cardText, cardImage) {
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

/* function fillInput() {
    userNameInput.value = profileTitle.textContent
    userJobInput.value = profileSubtitle.textContent
}  */

editProfileButton.addEventListener('click', () => {
    /* fillInput()  */
    editFormValidator.initError()
    const userInfoInput = userInfo.getUserInfo();
    userNameInput.value = userInfoInput.userName;
    userInfoInput.value = userInfoInput.userJob;
    popupEditProfile.open()
})

addPictureButton.addEventListener('click', () => {
    formNewPictureElement.reset()
    addPickValidator.initError()
    popupAddCard.open()
})