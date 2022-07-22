import {
    FormValidator
} from "../components/FormValidator.js";
import {
    Card
} from "../components/Card.js";
import {
    initialCards
} from "../components/initial-cards.js";
import './index.css';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import popupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import { cardsContainer, tempalateElement, nameselector, subtitleSelector,
    popupProfileSelector, popupPictureSelector, popupImageSelector, 
    editProfileButton, formProfileElement, formNewPictureElement,
    profileTitle, profileSubtitle, userNameInput, userJobInput, addPictureButton, object } from "../utils/constants.js";


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

editProfileButton.addEventListener('click', () => {
    const userInfoInput = userInfo.getUserInfo();
    userNameInput.value = userInfoInput.userName;
    userJobInput.value = userInfoInput.userJob;
    editFormValidator.initError()
    popupEditProfile.open()
})

addPictureButton.addEventListener('click', () => {
    formNewPictureElement.reset()
    addPickValidator.initError()
    popupAddCard.open()
})