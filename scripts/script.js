const profileEdit = document.querySelector(".profile__edit"); /* Кнопка изменить профиль */
const popup = document.querySelector(".popup"); /* попап */
const formProfileElement = document.querySelector (".popup__form_edit-profile"); /* Попап изменения профиля */
const popupNewPic = document.querySelector(".popup_add-picture"); /* Добавление картинки */ 
const popupViewPicture = document.querySelector('.popup_view-picture');
const closePopup = document.querySelectorAll(".popup__close-button"); /* Закрыть попап */
const popupProfile = document.querySelector(".popup_edit-profile") /* Попап изменения профиля */
const formPictureElement = document.querySelector(".popup__form_add-picture") /* Форма для добавления картинки попапа */
const formElement = document.querySelector(".popup__form"); /* форма внутри попапа */
const profileName = document.querySelector(".profile__title"); /* Имя профиля */
const profileJob = document.querySelector(".profile__subtitle"); /* Род деятельности в профиле */
const nameInput = document.querySelector(".popup__input_type_name"); /* Инпут изменения именни */
const jobInput = document.querySelector(".popup__input_type_job"); /* Инпут изменения профессии */
const inputNamePic = document.querySelector(".popup__input_type_pic"); /* Название места */
const inputLinkPick = document.querySelector(".popup__input_type_link"); /* Ссылка на картинку */
const addPic = document.querySelector(".profile__add-button") /* Кнопка добавить в профиле */
const like = document.querySelectorAll(".element__like"); /* кнопка лайка */


/* Функция открытия попапа */
function poupOpen(popup) {
    popup.classList.add("popup_open");
}

/* Изменение профиля */
profileEdit.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    poupOpen(popupProfile);
})

/* Добавление картинки */
addPic.addEventListener ('click', () => {
    inputNamePic.value = '';
    inputLinkPick.value = '';
    poupOpen(popupNewPic);
})

/* Функция закрытия попапа */
function popupClose() {
    const poupOpened = document.querySelector ('.popup_open'); /* Состояние попапа */
    poupOpened.classList.remove("popup_open");
}
closePopup.forEach((button) => button.addEventListener('click', popupClose));


/* Сохранение изменений в профиле */
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent =  nameInput.value;
    profileJob.textContent = jobInput.value;
    popupClose(); 
}

formElement.addEventListener("submit", formSubmitHandler);


/* карточки «из коробки» */
const initialCards = [
    {
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
    cardsLike.addEventListener('click', cardLike);
    
    openPic(picture);

	return newCard;
}

const formAddCard = (card) => {cardsContainer.prepend(card) /* Добавления карточки на страницу стоит вынести в отдельный метод */
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
function addCard (evt) {
    evt.preventDefault();
    const card = createElementDomNode({name: inputNamePic.value, link: inputLinkPick.value});
    cardsContainer.prepend(card);

    popupClose();
  }

  formPictureElement.addEventListener('submit', addCard);

  /* Лайки */
  function cardLike(evt) {
	const target = evt.target;
	target.classList.toggle('element__like-active');
}

  const hugePicture = document.querySelector('.popup__huge-picture'); /* ссылка на картинку */
  const figCaptionPopup = document.querySelector('.popup__figcaption'); /* Подпись к картинке */

/* Открытие карточки */
  function openPic(picture) {
    picture.addEventListener('click', () => {
    hugePicture.alt = picture.alt;
    figCaptionPopup.textContent = picture.alt;
    hugePicture.src = picture.src;

    poupOpen(popupViewPicture);
  });
  }

