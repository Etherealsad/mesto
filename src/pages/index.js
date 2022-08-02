import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import './index.css';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import popupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import { tempalateElement, nameselector, subtitleSelector,
    popupProfileSelector, popupPictureSelector, popupImageSelector, 
    editProfileButton, formProfileElement, formNewPictureElement,
    avatarSelector, popupAvatarSelector, popupDeleteAgreementSelector, containerSelector,
    editAvatar, formAvatarElement, userNameInput, 
    userJobInput, addPictureButton, object } from "../utils/constants.js";
import Api from "../components/Api.js";


const editFormValidator = new FormValidator(object, formProfileElement)
const addPickValidator = new FormValidator(object, formNewPictureElement)
const avatarFormValidator = new FormValidator(object, formAvatarElement)

addPickValidator.enableValidation()
editFormValidator.enableValidation()
avatarFormValidator.enableValidation()

const popupEditProfile = new PopupWithForm(popupProfileSelector, editProfileHandler)
const popupAddCard = new PopupWithForm(popupPictureSelector, addCardHandler)
const popupImageAdd = new popupWithImage(popupImageSelector)
const userInfo = new UserInfo(nameselector, subtitleSelector, avatarSelector)
const popupEditAvatar = new PopupWithForm(popupAvatarSelector, editAvatarFormSubmitHandler)
 const confirmPopup = new PopupWithForm(popupDeleteAgreementSelector, editAvatarFormSubmitHandler)
 
editProfileButton.addEventListener('click', () => {
    const profileData = userInfo.getUserInfo();
    userNameInput.value = profileData.userName;
    userJobInput.value = profileData.userJob;
    editFormValidator.initError()
    popupEditProfile.open()
})

addPictureButton.addEventListener('click', () => {
    formNewPictureElement.reset()
    addPickValidator.initError()
    popupAddCard.open()
})

editAvatar.addEventListener('click', () => {
    formAvatarElement.reset()
    avatarFormValidator.initError()
    popupEditAvatar.open()
})

const loading = (popup, isLoaded) => {
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

const likeCardCallback = (isLiked, cardData, card) => {
    if (isLiked) {
        api.addLike(cardData._id)
        .then(answer => {
            card.setLikeCounter(answer.likes.length)
        })
        .catch((err) => {
            console.log(err)
        });
    } else {
        api.removeLike(cardData._id)
            .then(answer => {
                card.setLikeCounter(answer.likes.lenght);
            }) .catch((err) => {
                console.log(err)
            })
    }
}

const deleteCardCallback = (cardData, card, evt) => {
    confirmPopup.setSubmitCallback(() => {
        api.removeCard(cardData._id)
          .then(() => {
            card.deleteCard(evt)
            confirmPopup.close()
          })
          .catch((err) => {
            console.log(err)
          })
    })
    confirmPopup.open()
} 

function createCardItem(placeData, templateCard, openFullViewPopup, userID, deleteCardCallback, likeCardCallback) {
    return new Card(placeData, templateCard, openFullViewPopup, userID, deleteCardCallback, likeCardCallback)
}

function editProfileHandler (userData) {
    loading(popupEditProfile, false)
    api.editProfile(userData)
      .then(answer => {
        userInfo.setUserInfo(answer.name, answer.about)
        popupEditProfile.close()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        loading(popupEditProfile, true)
      })
}

function addCardHandler (cardData) {
    loading(popupAddCard, false)
    api.addCard(cardData)
        .then(newPlace => {
            section.addItem(newPlace)
            popupAddCard.close()
        })
        .catch((err) => {
         console.log(err)
        })
        .finally(() => {
            loading(popupAddCard, true)
        })
}

function editAvatarFormSubmitHandler (editLikeAvatar){
    loading(popupEditAvatar, false)
    const editAvatarPromise = api.editAvatar(editLikeAvatar)
    editAvatarPromise
      .then(data => {
        userInfo.setUserAvatar(data.avatar)
        popupEditAvatar.close()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        loading(popupEditAvatar, true)
      })
}

const renderer = (item, container) => {
    const card = createCardItem(item, tempalateElement, popupImageAdd.open.bind(popupImageAdd), userInfo.getUserId(), deleteCardCallback, likeCardCallback)
    const cardDomeNode = card.createDomNode()
    container.prepend(cardDomeNode)
}
popupAvatarSelector
function updateUserInformation (userName, userJob, userAvatar, userID) {
    userInfo.setUserInfo(userName, userJob)
    userInfo.setUserId(userID)
    if (userAvatar) {
        userInfo.setUserAvatar(userAvatar)
    }
}

const section = new Section(renderer, containerSelector)

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-46',
    headers: {
        authorization: 'e4024608-cf2f-4054-b99f-7c6eb94e767a',
        'Content-Type': 'application/json'
    }
})

Promise.all ([
    api.getUserInfo(),
    api.getInitCards()
])
    .then(([userData, cards]) => {
        updateUserInformation(userData.name, userData.about, userData.avatar, userData._id)
        section.renderItems(cards.reverse())
    })
    .catch((err) => {
        console.log(err)
    })