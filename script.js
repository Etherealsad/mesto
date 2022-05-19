let popup = document.querySelector(".popup");
let closePopup = document.querySelector(".popup__close-button");
let formElement = document.querySelector(".popup__form");
let nameInput = document.querySelector(".popup__input_type_name");
let jobInput = document.querySelector(".popup__input_type_job");
let profileName = document.querySelector(".profile__title");
let profileJob = document.querySelector(".profile__subtitle");
let profileEdit = document.querySelector(".profile__edit");
/* let like = document.querySelectorAll(".element__like"); */

function poupOpen() {
    popup.classList.toggle("popup_open");
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function popupClose() {
    popup.classList.remove("popup_open");
}

profileEdit.addEventListener("click", poupOpen);
closePopup.addEventListener("click", popupClose);

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent =  nameInput.value;
    profileJob.textContent = jobInput.value;
    poupOpen(); 
}

formElement.addEventListener("submit", formSubmitHandler);

/* for (let i= 0; i < like.length; i++ ) {
    like[i].addEventListener ("click", function() {
        like[i].classList.toggle("element__like-active");
    });
} */