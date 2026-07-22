import { enableValidation, settings } from "../scripts/validation.js";
import "./index.css";
import { Api } from "../../utils/Api.js";
import { setButtonText } from "../../utils/buttonState.js";

const initialCards = [
  {
    name: "Mountain",
    link: "https://images.unsplash.com/photo-1604644325176-2b8eb8a3ac8c?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Hamster",
    link: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?q=80&w=1752&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Pizza",
    link: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=962&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Cathedral",
    link: "https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?q=80&w=930&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Cabin",
    link: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Movies",
    link: "https://plus.unsplash.com/premium_photo-1710522706751-c2f0c76cc5fd?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
];

enableValidation(settings);

const cardTemplate = document.querySelector("#card-template");
const previewModal = document.querySelector("#modal__preview");
const previewModalImg = previewModal.querySelector(".modal__preview-img");
const previewModalExit = previewModal.querySelector(
  ".modal__preview-exit-button",
);
const previewModalCaption = previewModal.querySelector(
  ".modal__preview-caption",
);

const editProfile = document.querySelector(".profile__edit-button-layout");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editExitButton = editProfileModal.querySelector(".modal__exit-icon");
const newPost = document.querySelector(".profile__new-post-button");
const newPostModal = document.querySelector("#new-post-modal");
const postExitButton = newPostModal.querySelector(".modal__exit-icon");
const profileName = document.querySelector(".profile__name");
const profileBio = document.querySelector(".profile__bio");
const nameInput = editProfileModal.querySelector("#full__name");
const bioInput = editProfileModal.querySelector("#form__description");
const editProfileForm = editProfileModal.querySelector("#form-profile");
const newPostLinkInput = newPostModal.querySelector("#image__link");
const newPostCaptionInput = newPostModal.querySelector("#caption");
const newPostForm = newPostModal.querySelector("#form-post");
const cardList = document.querySelector(".cards__list");
const confirmationModal = document.querySelector("#delete-modal");
const delModalExitIcon = confirmationModal.querySelector(".modal__exit-icon");
const cancelBtn = confirmationModal.querySelector(".modal__cancel-button");
const avatarEditModal = document.querySelector("#edit-avatar-modal");
const avatarEditBtn = document.querySelector(".profile__edit-avatar-btn");
const avatarExitIcon = avatarEditModal.querySelector(".modal__exit-icon");
const avatarLinkInput = avatarEditModal.querySelector("#avatar__link");
const avatarEditForm = avatarEditModal.querySelector("#form-avatar");
const profileAvatar = document.querySelector(".profile__avatar");
let selectedCard;
let selectedCardId;

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "572c72ab-b681-4bc1-90fa-adceb44a003b",
    "Content-Type": "application/json",
  },
});

api
  .pageData()
  .then((result) => {
    profileName.textContent = result[0].name;
    profileBio.textContent = result[0].about;
    profileAvatar.src = result[0].avatar;
    result[1].forEach((card) => {
      cardList.prepend(getCardElement(card));
    });
    console.log(result[1]);
  })
  .catch((err) => {
    console.err(`Error: ${err}`);
  });

previewModalExit.addEventListener("click", function () {
  closeModal(previewModal);
});

function getCardElement(data) {
  const cardElement = cardTemplate.content.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__description");
  const cardImg = cardElement.querySelector(".card__image");
  const card = cardElement.querySelector(".card");
  const cardLikeButton = cardElement.querySelector(".card__button");
  if (data.isLiked) {
    cardLikeButton.classList.toggle("card__button-liked");
  }

  cardTitle.textContent = data.name;
  cardImg.src = data.link;
  cardImg.alt = data.name;

  cardLikeButton.addEventListener("click", (evt) => handleLike(evt, data._id));

  function handleLike(evt, id) {
    const isLiked = evt.target.classList.contains("card__button-liked");
    evt.target.classList.toggle("card__button-liked");
    api.handleLikeButton(id, isLiked).catch((err) => {
      console.error(`Error: ${err}`);
      evt.target.classList.toggle("card__button-liked");
    });
  }

  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", (evt) =>
    handleDeleteCard(card, data._id),
  );

  const cardImgButton = cardElement.querySelector(".card__img-button");

  cardImgButton.addEventListener("click", function () {
    previewModalCaption.textContent = cardTitle.textContent;
    previewModalImg.src = cardImg.src;
    previewModalImg.alt = cardImg.alt;
    openModal(previewModal);
  });

  return cardElement;
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscapeKey);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscapeKey);
}

function handleDeleteCard(card, cardId) {
  selectedCard = card;
  selectedCardId = cardId;
  openModal(confirmationModal);
}

function handleDeleteSubmit(evt) {
  const delBtn = evt.submitter;
  setButtonText(delBtn, true, "Delete", "Deleting...");
  api.removeCard(selectedCardId).then((card) => {
    selectedCard.remove();
    closeModal(confirmationModal);
  });
  setButtonText(delBtn, false, "Delete");
}

delModalExitIcon.addEventListener("click", () => {
  closeModal(confirmationModal);
});

cancelBtn.addEventListener("click", () => {
  closeModal(confirmationModal);
});

confirmationModal.addEventListener("submit", handleDeleteSubmit);

avatarEditBtn.addEventListener("click", () => {
  openModal(avatarEditModal);
});

avatarExitIcon.addEventListener("click", () => {
  closeModal(avatarEditModal);
});

editProfile.addEventListener("click", function () {
  openModal(editProfileModal);
  nameInput.value = profileName.textContent;
  bioInput.value = profileBio.textContent;
});

editExitButton.addEventListener("click", function () {
  closeModal(editProfileModal);
});

newPost.addEventListener("click", function () {
  openModal(newPostModal);
});

postExitButton.addEventListener("click", function () {
  closeModal(newPostModal);
});

function editProfileSubmitHandler(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);
  api
    .editUserInfo({ name: nameInput.value, about: bioInput.value })
    .then((data) => {
      profileName.textContent = data.name;
      profileBio.textContent = data.about;
      closeModal(editProfileModal);
      editProfileForm.reset();
    })
    .catch((err) => {
      console.error(`Error: ${err}`);
    });
  setButtonText(submitBtn, false);
}

editProfileForm.addEventListener("submit", editProfileSubmitHandler);

function editAvatarSubmitHandler(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);
  api
    .editAvatar({ avatar: avatarLinkInput.value })
    .then((data) => {
      console.log(data);
      profileAvatar.src = data.avatar;
      closeModal(avatarEditModal);
    })
    .catch((err) => {
      console.error(`Error: ${err}`);
    });
  setButtonText(submitBtn, false);
}

avatarEditForm.addEventListener("submit", editAvatarSubmitHandler);

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);
  debugger;
  api
    .newCard(newPostCaptionInput, newPostLinkInput)
    .then((data) => {
      const newCard = getCardElement(data);
      cardList.prepend(newCard);
      console.log(newCard);

      closeModal(newPostModal);

      newPostForm.reset();
    })
    .catch((err) => {
      console.error(`Error: ${err}`);
    });
  setButtonText(submitBtn, false);
}

newPostForm.addEventListener("submit", handleAddCardSubmit);

const modalList = document.querySelectorAll(".modal");

modalList.forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    if (evt.target === modal) {
      closeModal(modal);
    }
  });
});

function handleEscapeKey(evt) {
  modalList.forEach((modal) => {
    if (modal.classList.contains("modal_is-opened")) {
      if (evt.key === "Escape") {
        closeModal(modal);
      }
    }
  });
}
