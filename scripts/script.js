const profileEdit = document.querySelector(".profile__edit"); /* Кнопка изменить профиль */
const popup = document.querySelector(".popup"); /* попап */
const formProfileElement = document.querySelector(".popup__form_edit-profile"); /* Попап изменения профиля */
const popupNewPic = document.querySelector(".popup_add-picture"); /* Добавление картинки */
const popupViewPicture = document.querySelector('.popup_view-picture');
const closePopupButton = document.querySelectorAll(".popup__close-button"); /* Закрыть попап */
const popupProfile = document.querySelector(".popup_edit-profile") /* Попап изменения профиля */
const formPictureElement = document.querySelector(".popup__form_add-picture") /* Форма для добавления картинки попапа */
const formElement = document.querySelector(".popup__form"); /* форма внутри попапа */
const profileName = document.querySelector(".profile__title"); /* Имя профиля */
const profileJob = document.querySelector(".profile__subtitle"); /* Род деятельности в профиле */
const nameInput = document.querySelector(".popup__input_type_name"); /* Инпут изменения именни */
const jobInput = document.querySelector(".popup__input_type_job"); /* Инпут изменения профессии */
const inputNamePic = document.querySelector(".popup__input_type_pic"); /* Название места */
const inputLinkPick = document.querySelector(".popup__input_type_link"); /* Ссылка на картинку */
const addPicButton = document.querySelector(".profile__add-button"); /* Кнопка добавить в профиле */
const closePopupButtonImage = document.querySelector(".popup__close-button-image"); /* кнопка закрытия большой картинки */
const closePopupEditProfile = document.querySelector('.popup__close-button-profile');
const closePopupAddNewPic = document.querySelector('.popup__close-button-add');


/* Функция открытия попапа */
function openPopup(popup) {
    popup.classList.add("popup_open");
    document.addEventListener('keydown', keyHandler);
    clickCloserEnable();
}

/* Изменение профиля */
profileEdit.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openPopup(popupProfile);
})

/* Добавление картинки */
addPicButton.addEventListener('click', () => {
    inputNamePic.value = '';
    inputLinkPick.value = '';
    openPopup(popupNewPic);
})

/* Функция закрытия попапа */
function closePopup(popup) {
    clickCloserDisable();
    popup.classList.remove("popup_open");
    document.removeEventListener('keydown', keyHandler);
}

const handleCloseButton = (evt) => {
    closePopup(evt.target.closest('.popup'));
}

// Функция закрытия на ESC
const keyHandler = (event) => {
    const openedPopup = document.querySelector('.popup_open');
    if (event.key === 'Escape') {
      closePopup(openedPopup);
    }
  }

  // Функция закрытия попапа при клике вне формы + listener
  function clickCloserEnable() {
    const openedPopup = document.querySelector('.popup_open');
    openedPopup.addEventListener('click', () => closePopup(openedPopup));
    openedPopup.querySelector('.stop-propagation').addEventListener('click', function(event) {
      event.stopPropagation();
    });
  }

  // Функция отключения listener clickCloser
  function clickCloserDisable() {
    const openedPopup = document.querySelector('.popup_open');
    document.removeEventListener('click', () => closePopup(openedPopup));
  }

/* Сохранение изменений в профиле */
function editProfileFormSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupProfile);
}

formElement.addEventListener("submit", editProfileFormSubmitHandler);


/* карточки «из коробки» */
const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const cardsContainer = document.querySelector('.elements'); /* Контейнер для добавления новых карточек */
const tempalateElement = document.querySelector('.template').content;

function createElementDomNode(item) {
    const newCard = tempalateElement.querySelector('.element').cloneNode(true);
    const title = newCard.querySelector('.element__title');
    const picture = newCard.querySelector('.element__img');

    title.textContent = item.name;
    picture.alt = item.name;
    picture.src = item.link;

    const deleteButton = newCard.querySelector('.element__trash-button');
    deleteButton.addEventListener('click', deleteCard);

    const cardsLike = newCard.querySelector('.element__like');
    cardsLike.addEventListener('click', cardLikeHandler);

    configureCardPictureForOpen(picture);

    return newCard;
}

const formAddCard = (card) => {
    cardsContainer.prepend(card) /* Добавления карточки на страницу стоит вынести в отдельный метод */
}

function renderList() {
    initialCards.reverse().forEach((item) => formAddCard(createElementDomNode(item)));
}

renderList()

/* удалить карточку */
function deleteCard(evt) {
    const theTarget = evt.target;
    const currentCard = theTarget.closest('.element');

    currentCard.remove();
}



// Добавление карточек
function addCardHandler(evt) {
    evt.preventDefault();
    const card = createElementDomNode({
        name: inputNamePic.value,
        link: inputLinkPick.value
    });
    cardsContainer.prepend(card);

    closePopup(popupNewPic);
}

formPictureElement.addEventListener('submit', addCardHandler);

/* Лайки */
function cardLikeHandler(evt) {
    const target = evt.target;
    target.classList.toggle('element__like-active');
}

const hugePicture = document.querySelector('.popup__huge-picture'); /* ссылка на картинку */
const figCaptionPopup = document.querySelector('.popup__figcaption'); /* Подпись к картинке */

/* Открытие карточки */
function configureCardPictureForOpen(picture) {
    picture.addEventListener('click', () => {
        hugePicture.alt = picture.alt;
        figCaptionPopup.textContent = picture.alt;
        hugePicture.src = picture.src;

        openPopup(popupViewPicture);
    });
}


closePopupButtonImage.addEventListener('click', handleCloseButton);
closePopupEditProfile.addEventListener('click', handleCloseButton);
closePopupAddNewPic.addEventListener('click', handleCloseButton);