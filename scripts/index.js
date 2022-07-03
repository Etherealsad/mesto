import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import { initialCards } from "./initial-cards.js";

const cardsContainer = document.querySelector('.elements')
const popupList = document.querySelectorAll('.popup')
const tempalateElement = '.template'
const profileEdit = document.querySelector(".profile__edit") /* Кнопка изменить профиль */
const popupViewPicture = document.querySelector('.popup_view-picture')
const formProfileElement = document.querySelector(".popup__form_edit-profile") /* Попап изменения профиля */
const popupNewPic = document.querySelector(".popup_add-picture") /* Добавление картинки */
const closePopupButton = document.querySelectorAll(".popup__close-button") /* Закрыть попап */
const popupProfile = document.querySelector(".popup_edit-profile") /* Попап изменения профиля */
const formPictureElement = document.querySelector(".popup__form_add-picture") /* Форма для добавления картинки попапа */
const formElementSubmit = document.querySelector(".popup__form") /* форма внутри попапа */
const profileName = document.querySelector(".profile__title") /* Имя профиля */
const profileJob = document.querySelector(".profile__subtitle") /* Род деятельности в профиле */
const nameInput = document.querySelector(".popup__input_type_name") /* Инпут изменения именни */
const jobInput = document.querySelector(".popup__input_type_job") /* Инпут изменения профессии */
const inputNamePic = document.querySelector(".popup__input_type_pic") /* Название места */
const inputLinkPick = document.querySelector(".popup__input_type_link") /* Ссылка на картинку */
const picButtonAdd = document.querySelector(".profile__add-button") /* Кнопка добавить в профиле */
const popupButtonImageClose = document.querySelector(".popup__close-button-image") /* кнопка закрытия большой картинки */
const popupEditProfileClose = document.querySelector('.popup__close-button-profile')
const popupAddNewPicClose = document.querySelector('.popup__close-button-add')

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
const addPickValidator = new FormValidator(object, formPictureElement)

addPickValidator.enableValidation()
editFormValidator.enableValidation() 

/* Функция открытия попапа */
function openPopup(popup) {
    popup.classList.add("popup_open");
    document.addEventListener('keydown', closePopupEsc);
}

//заполнения полей ввода
function fillInput() {
    nameInput.value = profileName.textContent
    jobInput.value = profileJob.textContent
}

profileEdit.addEventListener('click', () => {
    fillInput()
    editFormValidator.initError()
    openPopup(popupProfile)
})

picButtonAdd.addEventListener('click', () => {
    formPictureElement.reset()
    addPickValidator.initError()
    openPopup(popupNewPic)
})

/* Функция закрытия попапа */
function closePopup(popup) {
    document.removeEventListener('keydown', closePopupEsc);
    popup.classList.remove("popup_open");
}

popupList.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_open') || evt.target.classList.contains('popup__close-button-img')) {
            closePopup(popup)
        }
    })
})

/* Сохранение изменений в профиле */
function editProfileFormSubmitHandler(evt) {
    evt.preventDefault()
    profileName.textContent = nameInput.value
    profileJob.textContent = jobInput.value
    closePopup(popupProfile)
}

formProfileElement.addEventListener('submit', editProfileFormSubmitHandler)

//Рендер карточек
initialCards.forEach((data) => {
    const newCard = createCard(data)
    cardsContainer.append(newCard)
})


//Создание карточки
function createCard(data) {
    const card = new Card(data, tempalateElement, openPopup)
    const cardElement = card.createDomNode()
    return cardElement
}

// Добавление карточек
function addCardHandler(evt) {
    evt.preventDefault()
    const newCard = createCard({name: inputNamePic.value, link: inputLinkPick.value})
    cardsContainer.prepend(newCard)
    closePopup(popupNewPic)
}

formPictureElement.addEventListener('submit', addCardHandler)

function closePopupEsc(evt) {
    if(evt.key === 'Escape'){
        const popup = document.querySelector('.popup_open');
        if(popup) {
            closePopup(popup);
        }
    }
}
